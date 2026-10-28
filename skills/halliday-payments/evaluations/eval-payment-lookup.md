# Evaluation: Payment Lookup

## Input Query

"Can you look up payment pay_abc123 for me?"

## Expected Behavior

1. The `halliday` skill activates based on keyword match or direct invocation
2. Claude identifies this as a payment lookup request
3. Claude reads `reference/payment-lookup-guide.md`
4. Claude checks if the developer has already provided a Halliday API key (from onboarding). If not, asks for one via AskUserQuestion.
5. Claude calls `api-fetch.sh` to fetch payment status:
   ```
   ${CLAUDE_PLUGIN_ROOT}/skills/halliday-payments/scripts/api-fetch.sh <API_KEY> GET /payments "payment_id=pay_abc123"
   ```
6. Claude parses the response and **presents a clear summary first**:
   - Payment ID, status, funded flag
   - Payment type (fiat onramp or crypto swap)
   - Input and output amounts/assets
   - Owner and destination addresses
   - Duration
   - Fee breakdown
7. **Then, based on status:**
   - COMPLETE: extracts transaction hash, calls `GET /chains` to build block explorer link
   - PENDING: shows time remaining until funding deadline, next instruction details
   - FAILED or EXPIRED (funded or not): calls `POST /payments/balances` with an `OWNER` query (owner from the status response, `tokens` including the input asset) to check deposit address balances. If any balance is above zero, the summary includes the recovery link `https://app.halliday.xyz/payments/<payment_id>?apiKey=<key>`, then recovery options (retry vs withdraw)
   - WITHDRAWN: shows completion details
   - TAINTED: explains sanctions flag, directs to support
8. If recovery is needed, Claude explains both options (retry and withdraw) with specific steps

## Expected Files Loaded

- `SKILL.md` (via skill activation)
- `reference/payment-lookup-guide.md` (for interpretation guidance)

## Expected API Calls

- `GET /payments?payment_id=pay_abc123` (always)
- `POST /payments/balances` (only if FAILED or EXPIRED)
- `GET /chains` (only if COMPLETE, to build explorer link)

## What Should NOT Happen

- Should NOT skip the payment summary and jump straight to diagnosis
- Should NOT fabricate payment data — all information must come from the API response
- Should NOT call endpoints not in the api-fetch.sh allowlist
- Should NOT write the API key to disk or into a file without the user's request or permission (showing it in chat or in the recovery link is fine)
- Should NOT load `reference/integration-checklist.md` — this is a lookup, not a code review
- Should NOT WebFetch external documentation
- Should NOT attempt to execute recovery actions (withdraw, re-quote) — only explain the steps
- Should NOT call `POST /payments/balances` for COMPLETE, PENDING, or WITHDRAWN payments
- Should NOT send `{"payment_id": ...}` as the balances body — the API requires the `query` object
