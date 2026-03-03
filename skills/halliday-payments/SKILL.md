---
name: halliday-payments
description: |
  Integrates Halliday Payments for crypto deposits, fiat-to-crypto onramps, and cross-chain swaps.
  Activated when users mention crypto payments, onramps, cross-chain swaps, deposit widgets,
  crypto deposits, buying crypto, payment widgets, CEX to L2, perp dex deposits,
  web3 payments, or onchain deposits.
user-invocable: false
allowed-tools: WebFetch(domain:docs.halliday.xyz), WebFetch(domain:raw.githubusercontent.com)
---

# Halliday Payments Integration

## Contents

- [Integration approaches](#integration-approaches)
- [Routing: what to load](#routing-what-to-load)
- [Getting started](#getting-started)
- [Code accuracy rules](#code-accuracy-rules)
- [Documentation sources](#documentation-sources)
- [Support](#support)

## Integration Approaches

Halliday offers two integration paths:

1. **SDK Widget** (recommended) — Drop-in UI handling the full payment flow. Works with any EVM wallet. Best for web apps and React Native.
2. **Custom UI via API** — Full interface control using REST endpoints. Best for native mobile (Swift/Kotlin) or highly custom designs.

For details on each, see the reference files below.

## Routing: What to Load

Load only the reference file relevant to the developer's question:

| Developer needs... | Load this file |
|--------------------|----------------|
| SDK widget setup, config, or code | [reference/sdk-widget-integration.md](reference/sdk-widget-integration.md) |
| API endpoints, custom UI, or backend integration | [reference/api-integration.md](reference/api-integration.md) |
| KYC, geographic restrictions, currencies, limits | [reference/compliance-and-requirements.md](reference/compliance-and-requirements.md) |
| Help choosing an example repo, or cloning one | [reference/example-repositories.md](reference/example-repositories.md) |
| General questions about Halliday capabilities | [reference/common-questions.md](reference/common-questions.md) |

**Do not fetch external documentation unless the reference files lack sufficient detail.** The reference files contain the information needed for most questions. Only fetch https://docs.halliday.xyz/llms-full.txt as a fallback for specific implementation details not covered in the reference files.

## Getting Started

Developers need a Halliday API key to integrate. Contact partnerships@halliday.xyz to obtain one.

To try the widget without integrating: visit https://halliday.xyz/ and click "Try it now."

## Code Accuracy Rules

1. **Never fabricate parameters.** Every parameter in an `openHallidayPayments()` call or API request must be verified against official documentation.
2. **Never invent code examples.** Use only code from official docs or example repositories. If no example exists for what the developer needs, say so and point them to the closest example repo.
3. **Verify before responding.** If unsure whether a feature or parameter exists, read the relevant reference file or fetch the docs — do not guess.

## Documentation Sources

Fetch these only when reference files are insufficient:

- **Full docs**: https://docs.halliday.xyz/llms-full.txt — for SDK configuration details, guides, and implementation specifics
- **API spec (OpenAPI)**: https://docs.halliday.xyz/pages/llms-info — for REST endpoint schemas, parameters, and response formats
- **Example repo README**: `https://raw.githubusercontent.com/HallidayInc/{REPO}/main/README.md` — for specific setup instructions

## Support

- General: support@halliday.xyz
- Partnerships & API keys: partnerships@halliday.xyz
- Contact form: https://halliday.xyz/contact
