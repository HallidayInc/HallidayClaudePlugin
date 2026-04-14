# Evaluation: Onboarding Flow — No API Key

## Input Query

User invokes `/halliday`, selects "Clone and run a sample application", and does not have an API key.

## Expected Behavior

1. The `halliday` skill activates via `/halliday` invocation
2. Claude checks whether the developer has an API key
3. Since no API key is mentioned, Claude tells the developer to create a free account at **https://dashboard.halliday.xyz/**
4. Claude notes the developer can still explore docs, ask questions, and clone sample apps while waiting
5. Claude shows the initialization menu (AskUserQuestion: "Ask questions and learn" or "Clone a sample app")
6. When the developer selects "Clone and run a sample application", Claude proceeds through the clone checklist
7. At Step 4 (Configure API Keys), Claude reminds the developer they need the Halliday API key and references https://dashboard.halliday.xyz/ again

## Expected Files Loaded

- `SKILL.md` (via `/halliday` invocation)

## What Should NOT Happen

- Should NOT block the developer from exploring or cloning without an API key
- Should NOT skip the onboarding check and go straight to the menu
- Should NOT fabricate an API key or suggest a placeholder key will work
- Should NOT WebFetch any external docs — all source data is local in `${CLAUDE_SKILL_DIR}/sources/`
- Should NOT use raw `git clone` — must use `bash scripts/git-fetch.sh {REPO}` for cloning
- Should NOT load all reference files at once
