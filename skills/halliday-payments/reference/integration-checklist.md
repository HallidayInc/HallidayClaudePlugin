# Integration Checklist

Evaluate a developer's Halliday Payments integration for issues that **will cause the integration to break**. Only flag items that produce errors, crashes, blank screens, or payments that cannot proceed.

Do NOT flag best practices, security recommendations, UX suggestions, or optimizations. If the integration works on the happy path, it passes.

## How to Use This Checklist

1. Determine whether the integration uses the **SDK Widget** or **API** approach
2. Scan the codebase: Grep for Halliday-related imports, function calls, and API endpoints
3. If no results found, ask the developer to specify which files contain their Halliday integration
4. Read the matching source files
5. Evaluate **only** the items below — do not invent additional checks
6. Report each item as **PASS** or **ISSUE** with a brief explanation of what breaks

---

## SDK Widget Checklist

Use when the developer integrates via `@halliday-sdk/payments` — either the `HallidayPayments` class (JavaScript) or `HallidayPaymentsProvider` + `useHallidayPayments()` (React).

### Search patterns

Grep for: `@halliday-sdk/payments`, `new HallidayPayments(`, `HallidayPaymentsProvider`, `useHallidayPayments`, `openDeposit`, `openWithdrawal`, `halliday-sdk`, `cdn.jsdelivr.net/npm/@halliday-sdk`

### 1. SDK available at runtime

**Check:** `@halliday-sdk/payments` is in `package.json` dependencies, OR loaded via CDN `<script>` tag.

**What breaks:** Import fails at runtime, app crashes or widget is undefined.

### 2. Required parameter: `apiKey`

**Check:** The config passed to `new HallidayPayments(...)` (or to `HallidayPaymentsProvider`) includes `apiKey` (string).

**What breaks:** Widget fails to load — `apiKey` is required for authentication.

Note: `deposit.outputs` is **optional** and only filters which assets are offered. Do not flag an integration for omitting it.

### 3. EMBED mode: `targetElementId` must resolve to a real element

**Check:** Only applies if the developer intends to embed the widget inline. In JavaScript, `targetElementId` must name a DOM element that exists when the widget opens. In React, use the `<HallidayEmbed>` component instead.

**What breaks:** The widget has no container to render into and nothing appears on screen. When `targetElementId` is absent the widget renders as a full-screen MODAL, which is valid — do not flag it.

### 4. React Native: secure browser for payment providers

**Check:** Only applies if the app is React Native. Payment provider screens (Stripe, Moonpay card input, KYC) must open in a secure mobile browser, not a plain WebView.

**What breaks:** Payment providers reject sessions from plain WebViews. The user cannot complete checkout — the payment screen fails to load or gets blocked.

---

## API Integration Checklist

Use when the developer builds a custom UI using the Halliday REST API (`v2.prod.halliday.xyz`).

### Search patterns

Grep for: `v2.prod.halliday.xyz`, `/payments/quotes`, `/payments/confirm`, `halliday` with `fetch`/`axios`

### 1. Authentication header

**Check:** All API requests include an `Authorization: Bearer <api_key>` header.

**What breaks:** Every endpoint returns 401 Unauthorized. Nothing works without it.

### 2. Quote request body

**Check:** `POST /payments/quotes` is called with a properly structured body:
- `request.kind` set to `"FIXED_INPUT"`
- `request.fixed_input_amount` with `asset` (string) and `amount` (string)
- `request.output_asset` (string)
- `price_currency` (string)

**What breaks:** Malformed body returns 400 Bad Request. Missing `kind`, `fixed_input_amount`, or `output_asset` causes the endpoint to reject the request.

### 3. Quote confirmation with required fields

**Check:** `POST /payments/confirm` is called with all four required fields:
- `payment_id` (from the selected quote)
- `state_token` (from the quote response — must be passed unmodified)
- `owner_address`
- `destination_address`

**What breaks:** Missing any field returns 400. A modified `state_token` returns 400 (it's cryptographically signed). An expired quote (past `accept_by`) returns 400.

### 4. USER_VERIFY handling after confirm

**Check:** After calling `POST /payments/confirm`, the code checks if `next_instruction.type === "USER_VERIFY"`. If so, it collects signatures for each entry in the `verifications` array and submits a `ContinueConfirmPaymentRequest` with `verification_token` + `signatures`.

**This check must be unconditional** — do not gate it on the payment dollar amount.

**What breaks:** Without this, any payment that requires owner verification stays stuck in `UNCONFIRMED` status. The payment cannot be funded and will never proceed. The user is blocked with no way forward.

Each entry's `signature_type` is either `EIP712` or `EIP191` and determines the signing method — `EIP712` payloads are JSON strings that must be parsed and signed with `signTypedData`, `EIP191` payloads are signed directly with `signMessage`. Using one method for both fails.

```js
// After confirm call — loop, since there can be more than one round-trip
while (result.next_instruction?.type === "USER_VERIFY") {
  const { verification_token, verifications } = result.next_instruction;
  const signatures = await Promise.all(
    verifications.map(async (v) => {
      let signature;
      if (v.signature_type === "EIP712") {
        const typedData = JSON.parse(v.payload);
        const { EIP712Domain, ...types } = typedData.types;
        signature = await signer.signTypedData(typedData.domain, types, typedData.message);
      } else {
        signature = await signer.signMessage(v.payload);
      }
      return { reason: v.reason, signature_type: v.signature_type, signature };
    })
  );
  result = await confirmPayment({ verification_token, signatures });
}
```

### 5. Funding flow: extracting and using `next_instruction`

**Check for onramps:** The code reads `next_instruction.funding_page_url` and navigates the user to it (redirect, new window, or iframe).

**Check for swaps:** The code reads `next_instruction.deposit_info` and uses `deposit_address`, `deposit_amount`, `deposit_token`, and `deposit_chain` to prompt the user to fund the payment.

**What breaks:** Without extracting the funding instructions, the user has no way to fund the payment. For onramps, they never see the Stripe/Moonpay checkout. For swaps, they don't know where to send tokens. The payment sits unfunded until it expires.
