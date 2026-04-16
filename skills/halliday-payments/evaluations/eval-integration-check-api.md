# Evaluation: API Integration Check

## Input Query

"Review my custom API integration for completeness."

## Expected Behavior

1. The `halliday` skill activates based on keyword match or direct invocation
2. Claude identifies this as an integration check request
3. Claude reads `reference/integration-checklist.md`
4. Claude determines the integration type is API (custom UI)
5. Claude scans the codebase:
   - Grep for `v2.prod.halliday.xyz`, `/payments/quotes`, `/payments/confirm`, `halliday` combined with fetch/axios
   - If no results found, asks the developer to specify files
6. Claude reads the matching source files
7. Claude evaluates each API Integration checklist item against the code, including:
   - Authentication headers
   - Route validation
   - Quote lifecycle (request, selection, confirmation)
   - USER_VERIFY handling (checked unconditionally, not gated on dollar amount)
   - Funding flow (onramp URL display or swap deposit instructions)
   - Status polling with all statuses handled
   - Error recovery (balance check, retry flow, withdrawal flow)
   - Payment expiry handling (funded vs unfunded distinction)
   - API error handling
8. Claude reports findings with PASS / MISSING / WARNING and severity levels
9. For MISSING items, Claude explains the edge case and provides implementation guidance
10. Claude specifically flags if the error recovery flow is incomplete — this is the most impactful missing feature

## Expected Files Loaded

- `SKILL.md` (via skill activation)
- `reference/integration-checklist.md` (for the checklist)
- Developer's source files containing Halliday API integration code

## What Should NOT Happen

- Should NOT load `reference/payment-lookup-guide.md` — this is not a payment lookup
- Should NOT call `api-fetch.sh` or make any Halliday API calls
- Should NOT load `reference/sdk-widget-integration.md` — the developer uses the API approach
- Should NOT recommend switching to the SDK widget unless the developer asks
- Should NOT gate the USER_VERIFY check on payment dollar amount — it must be unconditional
- Should NOT fabricate API endpoints or parameters that aren't in the OpenAPI spec
- Should NOT read the entire OpenAPI spec — use Grep for specific lookups if needed
- Should NOT WebFetch external documentation
