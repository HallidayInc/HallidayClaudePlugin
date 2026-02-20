# Custom UI via API Integration

The Halliday API enables developers to build fully custom payment interfaces. Use this approach when the SDK widget doesn't meet design or platform requirements.

## When to Use

- Native mobile apps (Swift/Kotlin) that can't use the widget
- Highly customized payment UIs that need full design control
- Backend-to-backend integrations
- When the developer explicitly wants to build their own UI

## API Overview

The Halliday API uses REST endpoints to manage payment sessions. The core flow is:

1. Create a payment session
2. Present options to the user (your custom UI)
3. Execute the transaction
4. Poll for status or receive webhook (webhooks coming soon)

## API Specification

For endpoint details, request/response schemas, and authentication:
Fetch https://docs.halliday.xyz/pages/llms-info — this page contains the embedded OpenAPI YAML specification.

## Key Concepts

- **Sessions**: API-level concept for managing transaction state. Each payment flow creates a session.
- **Workflow Protocol**: Halliday's underlying system that orchestrates multi-step crypto transactions (onramp → swap → deposit).

## Authentication

All API requests require a Halliday API key. Contact partnerships@halliday.xyz to obtain one.

## Supported Chains and Assets

These change frequently. Use the live API endpoints to get current data:
- Chains: https://docs.halliday.xyz/api-reference/chains/get-supported-chains
- Assets: https://docs.halliday.xyz/api-reference/assets/get-asset-details

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

## When to Fetch API Specification

Fetch https://docs.halliday.xyz/pages/llms-info when:
- The developer needs exact endpoint paths, parameters, or response shapes
- You need to construct an API request and must verify the schema
- The developer asks about specific API capabilities not covered here
