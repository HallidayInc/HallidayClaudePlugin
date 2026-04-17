#!/usr/bin/env bash
# PreToolUse hook for the Halliday Payments plugin.
# Auto-approves Bash invocations of any .sh script shipped directly inside this
# plugin's scripts directory, so users aren't prompted for routine Halliday API
# or git-clone calls. Each bundled script enforces its own endpoint/repo
# allowlist, so approving the directory is safe. All other Bash commands pass
# through to the normal permission flow.

set -euo pipefail

SCRIPTS_DIR="${CLAUDE_PLUGIN_ROOT}/skills/halliday-payments/scripts"

# Read the hook payload from stdin.
INPUT="$(cat)"

# Extract tool_input.command. jq is available in Claude Code's hook environment.
COMMAND="$(printf '%s' "$INPUT" | jq -r '.tool_input.command // ""')"

# Reject any command containing a newline outright — bash treats newlines as
# statement separators, so a multi-line command could smuggle extra commands
# past the single-line regex below.
if [[ "$COMMAND" == *$'\n'* ]]; then
  printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"defer"}}\n'
  exit 0
fi

# Strip an optional leading `bash ` so we match either invocation form.
CANDIDATE="${COMMAND#bash }"

# Allow: <SCRIPTS_DIR>/<name>.sh optionally followed by args that contain no
# shell metacharacters. The [^/[:space:]]+ segment prevents path traversal in
# the script name. The trailing argument segment rejects `;`, `&`, `|`, `<`,
# `>`, `$`, backtick, `(`, `)`, and `\` so command chaining, pipes,
# redirection, command substitution, variable expansion, and escape sequences
# fall through to the normal permission prompt instead of being auto-approved.
if [[ "$CANDIDATE" =~ ^"$SCRIPTS_DIR"/[^/[:space:]]+\.sh([[:space:]][^\;\&\|\<\>\$\`\(\)\\]*)?$ ]]; then
  printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"allow","permissionDecisionReason":"Halliday plugin-owned script"}}\n'
  exit 0
fi

# Defer to Claude Code's default permission handling for everything else.
printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"defer"}}\n'
exit 0
