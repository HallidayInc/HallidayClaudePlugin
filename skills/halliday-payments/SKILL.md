---
name: halliday-payments
description: |
  Halliday Payments SDK and API integration for crypto applications. 
  Use this skill when the developer mentions: crypto deposits, crypto payments, 
  fiat-to-crypto, onramp, onramping, cross-chain swaps, crypto swaps, buying crypto, 
  depositing crypto, payment widget, crypto widget, blockchain deposits,
  perp dex deposits, CEX to L2, centralized exchange deposits, centralized exchange payments,
  web3 deposits, onchain payments, onchain deposits.
---

# Halliday Payments Integration

**IMPORTANT: When this skill is activated, immediately fetch the full documentation:**

```
web_fetch https://docs.halliday.xyz/llms-full.txt
```

Halliday Payments is an all-in-one suite, built on the workflow protocol, that enables developers to implement simplified fiat-to-crypto onramps, cross-chain swaps, and crypto deposits on any blockchain using just a few lines of code.

## When to Use This Skill

Activate this knowledge when the developer is working on:
- Fiat-to-crypto onramping (users purchasing crypto with fiat)
- Cross-chain token swaps
- Crypto deposits into applications (e.g., perp DEXs, app-chains)
- Deposits from centralized exchanges to L1s, L2s, or app-chains
- Any payment or deposit widget for web3 applications

## Integration Approaches

### 1. SDK Widget (Recommended)
A drop-in UI component that handles the entire user experience. Best for most web applications and React Native mobile apps.

### 2. Custom UI via API
For developers who need full control over the interface, or for native mobile apps (Swift/Kotlin).

## Primary Documentation Sources

When helping with Halliday integration, fetch these resources as needed:

### Full Documentation (Markdown)
**URL:** https://docs.halliday.xyz/llms-full.txt
**Use for:** Complete documentation including guides, concepts, and integration instructions.

### API Specification (OpenAPI)
**URL:** https://docs.halliday.xyz/pages/llms-info
**Use for:** REST API endpoints, request/response schemas, authentication details. The OpenAPI YAML spec is embedded in this page.

### SDK (Latest Build)
**URL:** https://cdn.jsdelivr.net/npm/@halliday-sdk/payments@latest/dist/paymentsWidget/index.umd.min.js
**Source Map:** https://cdn.jsdelivr.net/npm/@halliday-sdk/payments@latest/dist/paymentsWidget/index.umd.min.js.map
**Use for:** Understanding SDK implementation details if needed.

## Example Repositories

Fetch README files and source code from these repositories based on what the developer is building:

### SDK Widget Examples

| Repository | Description | Best For |
|------------|-------------|----------|
| https://github.com/HallidayInc/HallidayPaymentsSdkExamples | Original SDK implementation | Vanilla HTML/CSS/JS projects |
| https://github.com/HallidayInc/HallidaySdkDynamicEthers | SDK + Dynamic wallet + Ethers.js | React apps using Dynamic with Ethers |
| https://github.com/HallidayInc/HallidaySdkDynamicWagmi | SDK + Dynamic wallet + Wagmi | React apps using Dynamic with Wagmi |
| https://github.com/HallidayInc/HallidaySdkPrivyReactExample | SDK + Privy wallet + Vite | React apps using Privy |

### Custom UI via API Examples

| Repository | Description | Best For |
|------------|-------------|----------|
| https://github.com/HallidayInc/HallidayPaymentsApiExamples | API implementation + Ethers.js | Vanilla HTML/CSS/JS with custom UI |
| https://github.com/HallidayInc/HallidayPaymentsApiExamplesReact | API implementation + React | React apps needing custom UI |
| https://github.com/HallidayInc/HallidayApiDynamicExamplesWagmi | API + Dynamic + Wagmi | React + Dynamic with custom UI |
| https://github.com/HallidayInc/HallidayApiPrivyReactExamples | API + Privy + Vite | React + Privy with custom UI |

## Integration Workflow

When a developer asks to integrate Halliday:

1. **Determine the approach**: SDK Widget (recommended) or Custom UI via API
2. **Identify their stack**: Framework, wallet provider, web3 library (Ethers/Wagmi/Viem)
3. **Fetch the matching example**: Use the repository table above to find the closest match
4. **Fetch documentation**: Get https://docs.halliday.xyz/llms-full.txt for implementation details
5. **For API integrations**: Also fetch the OpenAPI spec from https://docs.halliday.xyz/pages/llms-info

## How to Fetch Resources

Use Claude Code's web_fetch capability to retrieve:

```
# Fetch full documentation
web_fetch https://docs.halliday.xyz/llms-full.txt

# Fetch API spec page (contains OpenAPI YAML)
web_fetch https://docs.halliday.xyz/pages/llms-info

# Fetch example repo README (replace with appropriate repo)
web_fetch https://raw.githubusercontent.com/HallidayInc/HallidayPaymentsSdkExamples/main/README.md
```

## Key Concepts

- **Workflow Protocol**: Halliday's underlying system that orchestrates complex multi-step crypto transactions
- **Widget**: Pre-built UI component that handles onramp/swap/deposit flows
- **Sessions**: API-level concept for managing transaction state
- **Supported Chains**: Multiple L1s, L2s, and app-chains (refer to docs for current list)

## Common Developer Questions

When developers ask about:
- **"How do I add crypto payments?"** → Recommend SDK Widget, fetch HallidayPaymentsSdkExamples
- **"How do I build a custom deposit UI?"** → Recommend using the SDK widget and detail that the API approach enables custom UI creation, fetch relevant API example repo
- **"What wallets are supported?"** → Fetch docs, works with any EVM wallet (Dynamic, Privy, RainbowKit, etc.). Additional wallet support is added frequently.
- **"How do I handle webhooks?"** → Fetch API spec from llms-info page
- **"Mobile app integration?"** → Recommend using React Native with the SDK widget but for native mobile app builds, the API approach is best, fetch OpenAPI spec
- **"Which chains are supported?"** → Use the API for the latest chain support using an API key in the tool in the documentation at https://docs.halliday.xyz/api-reference/chains/get-supported-chains
- **"Which assets are supported?"** → Use the API for the latest asset support using an API key in the tool in the documentation at https://docs.halliday.xyz/api-reference/assets/get-asset-details
```
