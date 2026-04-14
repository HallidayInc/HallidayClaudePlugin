# Evaluation: Compliance Question

## Input Query

"Does Halliday require KYC? We have users in Europe — will they be able to use fiat onramps?"

## Expected Behavior

1. The `halliday` skill activates based on context (Halliday-related question)
2. Claude reads `reference/compliance-and-requirements.md` — this file contains all the information needed to answer
3. Claude explains:
   - KYC is required for fiat onramps but handled by the provider (not Halliday)
   - Coinbase onramp allows no-KYC up to $500 USD
   - No KYC for crypto-to-crypto swaps
   - EUR is supported for fiat onramping
   - Geographic restrictions vary by provider for fiat onramps
4. Claude answers fully from the reference file without fetching external docs

## Expected Files Loaded

- `SKILL.md` (via skill activation)
- `reference/compliance-and-requirements.md` (contains all needed information)

## What Should NOT Happen

- Should NOT WebFetch any external docs — all source data is local in `${CLAUDE_SKILL_DIR}/sources/`
- Should NOT Grep `${CLAUDE_SKILL_DIR}/sources/api/openapi.json` — not an API endpoint question
- Should NOT load `reference/sdk-widget-integration.md` or `reference/api-integration.md` — not an integration question
- Should NOT load `reference/example-repositories.md` — not asking about examples
- Should NOT make up specific country lists — the reference file correctly states restrictions vary by provider
- Should NOT provide definitive geographic answers — should note that restrictions change frequently
