# Payment Lookup Guide

Use this guide to look up a Halliday payment by ID, interpret its state, and provide diagnosis when applicable.

## Prerequisites

To look up a payment, you need:
- **Public API key** — the developer's Halliday public API key (`pk_...`). They may have already provided this during onboarding.
- **Payment ID** — UUID string (e.g. `41b16a6f-704e-44ba-9964-2b66df8a73e8`)
- **Owner address** — needed for `/payments/history` lookups and for `POST /payments/balances`. For a balance check, take it from the `owner_address` field of the `GET /payments` response — do not ask the developer for it.

## API Calls

Use `api-fetch.sh` for all API calls:

```bash
# Get payment status
${CLAUDE_PLUGIN_ROOT}/skills/halliday-payments/scripts/api-fetch.sh <API_KEY> GET /payments "payment_id=<PAYMENT_ID>"

# Check deposit address balances (for recovery diagnosis).
# <OWNER_ADDRESS> comes from the GET /payments response. Omit "tokens" to check only the payment's own route;
# pass it to look for a specific token (e.g. one sent on the wrong chain).
${CLAUDE_PLUGIN_ROOT}/skills/halliday-payments/scripts/api-fetch.sh <API_KEY> POST /payments/balances "" '{"query":{"source":"OWNER","owner":"<OWNER_ADDRESS>","scope":{"kind":"PAYMENT","payment_id":"<PAYMENT_ID>"},"tokens":["<CHAIN>:<TOKEN_ADDRESS>"]}}'

# Find parked funds across all of an owner's payments (owner-wide, not per payment)
${CLAUDE_PLUGIN_ROOT}/skills/halliday-payments/scripts/api-fetch.sh <API_KEY> POST /payments/issues "" '{"owner_address":"<OWNER_ADDRESS>"}'

# Get chain info (for block explorer links)
${CLAUDE_PLUGIN_ROOT}/skills/halliday-payments/scripts/api-fetch.sh <API_KEY> GET /chains

# Get payment history for an owner
${CLAUDE_PLUGIN_ROOT}/skills/halliday-payments/scripts/api-fetch.sh <API_KEY> GET /payments/history "owner_address=<OWNER_ADDRESS>&limit=10"
```

The response includes the JSON body followed by the HTTP status code on the last line. Parse accordingly.

## Payment Summary

**Always present a clear summary first**, before any diagnosis. Extract these fields from the `GET /payments` response:

| Field | Source |
|-------|--------|
| Payment ID | `payment_id` |
| Status | `status` (PENDING, UNCONFIRMED, COMPLETE, FAILED, EXPIRED, WITHDRAW_PENDING, WITHDRAWN, TAINTED) |
| Funded | `funded` (boolean) |
| Payment type | Fiat onramp if `quote_request.request.fixed_input_amount.asset` is a fiat code like `usd` or `eur`. Crypto swap if it's a token like `avalanche:0x`. |
| Input | `quote_request.request.fixed_input_amount.asset` + `quote_request.request.fixed_input_amount.amount` |
| Output asset | `quote_request.request.output_asset` |
| Quoted output amount | `quoted.output_amount.asset` + `quoted.output_amount.amount` |
| Fulfilled output amount | `fulfilled.output_amount.asset` + `fulfilled.output_amount.amount` (if available) |
| Onramp provider | `quoted.onramp` (if applicable, e.g. "stripe", "moonpay", "coinbase") |
| Payment method | `quoted.onramp_method` (if applicable, e.g. "CREDIT_CARD", "ACH") |
| Owner address | `owner_address` |
| Destination address | `destination_address` |
| Created | `created_at` |
| Completed | `completed_at` (if COMPLETE) |
| Duration | `completed_at - created_at` (or current time - `created_at` if not complete) |
| Onramp checkout deadline | `initiate_fund_by` (onramps only — the provider checkout must start before this). Swap deposits are accepted until the payment becomes `EXPIRED`, roughly 8 to 10 hours after `created_at`. |
| Fees | `quoted.fees.total_fees` (`quoted.fees.conversion_fees` conversion + `quoted.fees.network_fees` network + `quoted.fees.business_fees` business) in `quoted.fees.currency_symbol` |
| Recovery link | `https://app.halliday.xyz/payments/<payment_id>?apiKey=<public_api_key>` — **required whenever the balance check finds stuck assets** in the payment's processing addresses (see Recovery Diagnosis). Omit it otherwise. |

**Recovery link rule:** if `POST /payments/balances` returns any entry with `value.kind === "amount"` and `value.amount > 0`, the summary must include the recovery link line. The developer or end user opens it, connects the payment's **owner** wallet, and recovers the funds through the Halliday widget. `<public_api_key>` is the developer's public API key used for the lookup; including it in this URL is expected and allowed.

**Example summary output:**

```
Payment: 41b16a6f-704e-44ba-9964-2b66df8a73e8
Status: COMPLETE
Type: Fiat onramp (Stripe, credit card)
Input: 100 USD → Output: 96.11 USDC on Base
Owner: 0xowner...
Destination: 0xdest...
Duration: 2m 12s (created 2025-10-28T19:30:12Z → completed 2025-10-28T19:32:24Z)
Fees: $3.91 total ($3.91 conversion, $0.00 network, $0.00 business)
Transaction: 0xabc123... (https://basescan.org/tx/0xabc123...)
```

**Example summary output with stuck assets:**

```
Payment: 5bd51295-8590-4f64-bcf8-1f79691debb9
Status: FAILED (funded)
Type: Crypto swap
Input: 50 USDC on Polygon → Output: USDC on Base
Owner: 0xowner...
Destination: 0xdest...
Duration: 3h 10m so far (created 2025-10-28T16:20:01Z)
Fees: $0.42 total ($0.30 conversion, $0.12 network, $0.00 business)
Stuck assets: 50 USDC on Polygon at 0x4f2e... (est. 49.5 recoverable after fee)
Recover with your wallet: https://app.halliday.xyz/payments/5bd51295-8590-4f64-bcf8-1f79691debb9?apiKey=pk_...
```

## Status Interpretation

### COMPLETE
The payment succeeded. All workflow steps executed onchain.

**What to show:**
- Fulfilled output amount (may differ slightly from quoted due to real-time pricing)
- Final transaction hash — extract from `fulfilled.route`:
  ```
  fulfilled.route → filter type === "ONCHAIN_STEP" → flatMap net_effect.produce → find account === "DEST" and tx_id exists
  ```
- Block explorer link: call `GET /chains` to get the explorer URL for the output chain, then format as `${explorer}tx/${tx_hash}`

### PENDING
The payment is confirmed but not yet funded, or is funded and executing.

**What to show:**
- `funded` flag: if `false`, the deposit address is waiting for funding
- Expiry: an unfunded payment becomes `EXPIRED` roughly 8 to 10 hours after `created_at`. Onramps on slower bank rails have longer windows (wire 1 to 2 days, ACH 2 to 3 days, SWIFT 3 to 4 days). Funding after the quote's `accept_by` time is accepted but may not execute properly due to price movement.
- For onramps, `initiate_fund_by` is the deadline to start the provider checkout
- Time elapsed since `created_at` and a rough estimate of time remaining
- `next_instruction` details:
  - `type: "ONRAMP"` — waiting for user to complete fiat checkout via `funding_page_url`
  - `type: "TRANSFER_IN"` — waiting for token transfer to `deposit_address` on `deposit_chain`
- If `funded: true`, the payment is actively executing its workflow steps

### UNCONFIRMED
The payment requires owner verification before it can proceed to PENDING.

**What to show:**
- The `next_instruction` will have `type: "USER_VERIFY"` with payloads to sign
- The user must sign verification payloads and submit them back to `POST /payments/confirm`
- If the user abandons before completing verification, the payment remains `UNCONFIRMED`. A new quote is only needed once the quote expires.

### FAILED
A workflow step failed during execution.

**What to show:**
- Which route step failed (check `fulfilled.route` for steps with non-COMPLETE status)
- **Trigger balance check and recovery diagnosis** (see Recovery Diagnosis below)

### EXPIRED
The payment was not funded within its funding window: roughly 8 to 10 hours after creation for most payments, longer for onramps on slower bank rails (wire 1 to 2 days, ACH 2 to 3 days, SWIFT 3 to 4 days).

**What to show:**
- Whether the payment was funded (`funded` flag):
  - `funded: false` — usually safe to abandon; the user can start a new payment.
  - `funded: true` — funds are stuck in the deposit address.
- **Run the balance check either way** (see Recovery Diagnosis). `funded: false` does not prove the deposit address is empty — a user can send tokens after expiry, and such a deposit only shows up when the input token is listed in `query.tokens`. If any balance is above zero, add the recovery link to the summary.
- How long ago it was created, and for onramps the `initiate_fund_by` checkout deadline

### WITHDRAW_PENDING
A withdrawal of the payment's funds is in progress while the payment has not reached completion.

**What to show:**
- The withdrawal transfer out of the OTW deposit address is not yet confirmed onchain.
- This is an in-progress status — keep polling `GET /payments`. It transitions to `WITHDRAWN` once the transfer confirms.

### WITHDRAWN
Funds were successfully withdrawn from the OTW.

**What to show:**
- The withdrawal completed. No further action needed.
- If there's a `parent_payment_id`, this payment was retried from a previous failed payment.

### TAINTED
An onchain address associated with the payment was flagged by sanctions screening.

**What to show:**
- This payment cannot be completed, retried, or withdrawn.
- The user should contact support@halliday.xyz for assistance.

## Recovery Diagnosis

When a payment is FAILED or EXPIRED (funded or not), check deposit address balances to determine recovery options.

### Step 1: Check balances

Call `POST /payments/balances` with an `OWNER` query scoped to the payment:

```json
{
  "query": {
    "source": "OWNER",
    "owner": "<owner_address from GET /payments>",
    "scope": { "kind": "PAYMENT", "payment_id": "<PAYMENT_ID>" },
    "tokens": ["<chain>:<token_address>"]
  }
}
```

- `query.owner` is required — use `owner_address` from the status response.
- `query.tokens` is optional. When omitted, only the tokens and chains on the payment's own route are checked. A deposit sent with a different token or on a different chain will not be found unless it is listed, so pass the specific token when the developer knows what was sent. Start with the route's input token (`quote_request.request.fixed_input_amount.asset`).

The response contains:
- `balance_results` — one entry per address/token checked. Each has:
  - `address` — the deposit address
  - `token` — the token held (format: `chain:address`)
  - `value` — either `{ kind: "amount", amount: "50.0", withdrawal_fee: "0.5", min_withdrawal_amount: "1.0" }` or `{ kind: "error" }`. `withdrawal_fee` and `min_withdrawal_amount` are nullable.
  - `withdraw_from` — an object (`{ withdraw_type: "PAYMENT", payment_id, withdraw_account: "INTENT" | "SPW" | "RDW" }`) to pass through **unchanged** to `POST /payments/withdraw`. `null` means the funds cannot be withdrawn through the API.
  - `payment_gist` — summary of the intended payment; only set for reusable deposit wallets, otherwise `null`
- `future_withdrawable_balances` — same shape plus a `deadline`. These are funds in a cross-chain bridge deposit that did not complete; they become withdrawable after `deadline`. Always present, may be empty.

### Step 2: Interpret balances

- **Skip entries with `value.kind === "error"`** — these indicate a balance lookup failure
- **Check `value.amount`** — if greater than zero, the deposit address has stuck funds
- **Net amount** = `amount - withdrawal_fee` (display this to the user as the estimated recovery). A `withdrawal_fee` of `null` means no fee, so net equals `amount`.
- **If `min_withdrawal_amount` is set and `amount` is below it**, the balance cannot be withdrawn yet. `null` means no minimum.
- **If `withdraw_from` is `null`**, the funds cannot be withdrawn through the API yet — say so and point to the recovery link.
- **Use the full `amount`** (not net) when calling the withdraw endpoint
- **Any stuck funds found → add the recovery link to the summary** (see Payment Summary)

### Step 3: Present recovery options

If stuck funds exist, always give the recovery link first, then the two API options:

**Recovery link (simplest):** `https://app.halliday.xyz/payments/<payment_id>?apiKey=<public_api_key>` — the user connects the payment's owner wallet and recovers the funds through the Halliday widget.

**Option A: Retry the payment via the API**
1. Get new quotes: `POST /payments/quotes` with `parent_payment_id` set to the failed payment's ID
2. User selects a quote and it's confirmed via `POST /payments/confirm` (new `payment_id`, `state_token`, `owner_address`, `destination_address`)
3. Move funds from the old deposit address to the new one: `POST /payments/withdraw` with
   - `withdraw_from` — the object from the balance result, passed through exactly as returned
   - `token_amounts` — `[{ "token": <token>, "amount": <full amount> }]` from the balance result
   - `recipient_address` — the new payment's deposit address (`next_instruction.deposit_info[].deposit_address`)
4. Sign the returned `withdraw_authorization` based on `signature_type` (`EIP712` — parse as JSON and sign with `signTypedData`; `EIP191` — sign the string directly with `signMessage`)
5. Confirm: `POST /payments/withdraw/confirm` with `signature` and the `state_token` returned by the withdraw call (pass it back unmodified)

**Option B: Withdraw to the owner wallet via the API**
1. `POST /payments/withdraw` with `withdraw_from` (unchanged from the balance result), `token_amounts` (full amount), and `recipient_address` set to the owner's wallet address
2. Sign the `withdraw_authorization` per `signature_type`
3. `POST /payments/withdraw/confirm` with `signature` and `state_token`

Note: `payment_id` and `withdraw_account` on `POST /payments/withdraw` are deprecated. Do not suggest them.

### Owner-wide check: `POST /payments/issues`

If the developer asks whether an owner has stuck funds anywhere (not just in this payment), call `POST /payments/issues` with `owner_address`. It scans all of the owner's payments under the org plus their reusable deposit wallets. An empty `issues` array means nothing to address. Each `parked_fund` issue includes `token`, `balance`, a `classification`, `severity`, and a `withdraw_from` object that goes unchanged to `POST /payments/withdraw`. A `null` `withdraw_from` means the funds cannot be withdrawn yet. For each issue, give the recovery link for its `withdraw_from.payment_id`.

## Route Analysis

The `fulfilled.route` array shows the actual execution path:

- **USER_FUND** — the initial deposit step (user sends tokens to the deposit address)
- **ONRAMP** — a fiat onramp provider step (provider delivers tokens to the deposit address)
- **ONCHAIN_STEP** — an onchain action (swap, bridge, transfer)

Each ONCHAIN_STEP has:
- `status` — COMPLETE, FAILED, or in-progress
- `net_effect.consume` — tokens consumed (with `account`, `resource.asset`, `amount`, optional `tx_id`)
- `net_effect.produce` — tokens produced (with `account`, `resource.asset`, `amount`, optional `tx_id`)
- `step_index` — position in the workflow

Account types in route effects:
- `USER` — the user's wallet
- `PROCESSING_ADDRESS` / `SPW` — the OTW
- `DEST` — the destination address

The final `ONCHAIN_STEP` with `net_effect.produce` where `account === "DEST"` is the delivery transaction.
