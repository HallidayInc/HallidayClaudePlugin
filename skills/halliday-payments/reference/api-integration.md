# Custom UI via API Integration

The Halliday API enables developers to build fully custom payment interfaces. Use this approach when the SDK widget doesn't meet design or platform requirements.

## When to Use

- Native mobile apps (Swift/Kotlin) that can't use the widget
- Highly customized payment UIs that need full design control
- Backend-to-backend integrations
- When the developer explicitly wants to build their own UI

## API Overview

The Halliday API uses REST endpoints to quote, confirm, fund, and track payments. The core flow is:

1. Confirm a route exists for the input/output pair (`GET /assets/available-outputs`)
2. Request quotes (`POST /payments/quotes`) and present them in your custom UI
3. Confirm the selected quote (`POST /payments/confirm`), handling a `USER_VERIFY` `next_instruction` if returned
4. Fund the payment — send the user to `next_instruction.funding_page_url` for onramps, or transfer input tokens to the deposit address for swaps
5. Poll `GET /payments` for status, or receive a webhook

## API Specification

For endpoint details, request/response schemas, and authentication:
Use `Grep` on `${CLAUDE_PLUGIN_ROOT}/sources/api/openapi.yaml` to find the relevant endpoint or schema, then `Read` only the matching lines (±50 lines of context). **Do not load the file whole.**

## Key Concepts

- **`payment_id`**: Identifies a payment across every endpoint. Returned with each quote.
- **`state_token`**: Opaque, cryptographically signed state returned with a quote. Pass it back to `POST /payments/confirm` unmodified.
- **One-time wallet (OTW) / deposit address**: A fresh onchain address created per payment, controlled only by the `owner_address`. Funding it starts the payment; the owner can recover or withdraw from it if the payment fails or expires.
- **Workflow Protocol**: Halliday's underlying system that orchestrates multi-step crypto transactions (onramp → swap → deposit).
- **Webhooks**: Register an HTTPS endpoint via `POST /orgs/webhooks` to receive `WORKFLOW_COMPLETED` / `WORKFLOW_FAILED` deliveries instead of polling. Webhook management requires a secret API key (`sk_...`), not a public key.

## Authentication

All API requests require a Halliday public API key. Create a free account at https://dashboard.halliday.xyz/ to get one, or email partnerships@halliday.xyz as a backup option.

## Supported Chains and Assets

These change frequently. Query the API for live data:
- Supported chains: `${CLAUDE_PLUGIN_ROOT}/skills/halliday-payments/scripts/api-fetch.sh <KEY> GET /chains`
- Supported assets: `${CLAUDE_PLUGIN_ROOT}/skills/halliday-payments/scripts/api-fetch.sh <KEY> GET /assets`
- Check a specific route: `${CLAUDE_PLUGIN_ROOT}/skills/halliday-payments/scripts/api-fetch.sh <KEY> GET /assets/available-outputs "inputs[]=<INPUT>&outputs[]=<OUTPUT>"`

## Example Repositories

| Repository | Stack |
|------------|-------|
| [HallidayPaymentsApiExamples](https://github.com/HallidayInc/HallidayPaymentsApiExamples) | Vanilla HTML/CSS/JS + Ethers.js |
| [HallidayPaymentsApiExamplesReact](https://github.com/HallidayInc/HallidayPaymentsApiExamplesReact) | React |
| [HallidayApiDynamicExamplesWagmi](https://github.com/HallidayInc/HallidayApiDynamicExamplesWagmi) | React + Dynamic + Wagmi |
| [HallidayApiPrivyReactExamples](https://github.com/HallidayInc/HallidayApiPrivyReactExamples) | React + Privy + Vite |

To fetch an example's README for setup instructions:
```
web_fetch https://raw.githubusercontent.com/HallidayInc/{REPO_NAME}/main/README.md
```

## When to Use the OpenAPI Spec

Grep `${CLAUDE_PLUGIN_ROOT}/sources/api/openapi.yaml` when:
- The developer needs exact endpoint paths, parameters, or response shapes
- You need to construct an API request and must verify the schema
- The developer asks about specific API capabilities not covered here

**Do not load the OpenAPI spec whole. Do not WebFetch external docs.**
