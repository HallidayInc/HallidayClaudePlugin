#!/usr/bin/env bash
set -euo pipefail

# Safe git clone wrapper with org allowlist.
# Usage: bash scripts/git-fetch.sh <repo-name> [target-dir]
#
# Only allows cloning from the HallidayInc GitHub org.
# This prevents the agent from cloning arbitrary repositories.

ALLOWED_ORG="HallidayInc"
ALLOWED_REPOS=(
  "HallidayPaymentsSdkExamples"
  "HallidaySdkDynamicEthers"
  "HallidaySdkDynamicWagmi"
  "HallidaySdkPrivyReactExample"
  "HallidaySdkViemWagmiRainbowkitExample"
  "HallidayPaymentsApiExamples"
  "HallidayPaymentsApiExamplesReact"
  "HallidayApiDynamicExamplesWagmi"
  "HallidayApiPrivyReactExamples"
)

if [[ $# -lt 1 ]]; then
  echo "Usage: bash scripts/git-fetch.sh <repo-name> [target-dir]"
  echo ""
  echo "Allowed repositories:"
  for repo in "${ALLOWED_REPOS[@]}"; do
    echo "  - $repo"
  done
  exit 1
fi

REPO_NAME="$1"
TARGET_DIR="${2:-$REPO_NAME}"

# Validate against allowlist
ALLOWED=false
for repo in "${ALLOWED_REPOS[@]}"; do
  if [[ "$REPO_NAME" == "$repo" ]]; then
    ALLOWED=true
    break
  fi
done

if [[ "$ALLOWED" != "true" ]]; then
  echo "Error: '$REPO_NAME' is not in the allowed repository list."
  echo ""
  echo "Allowed repositories:"
  for repo in "${ALLOWED_REPOS[@]}"; do
    echo "  - $repo"
  done
  exit 1
fi

CLONE_URL="https://github.com/${ALLOWED_ORG}/${REPO_NAME}.git"

echo "Cloning ${ALLOWED_ORG}/${REPO_NAME}..."
git clone "$CLONE_URL" "$TARGET_DIR"
echo "Done. Repository cloned to ${TARGET_DIR}/"
