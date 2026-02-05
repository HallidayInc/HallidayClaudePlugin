---
name: halliday
description: Start a Halliday Payments integration — fiat-to-crypto onramps, cross-chain swaps, and crypto deposits
---

# Halliday Payments Integration

You're starting a Halliday Payments integration. Halliday is an all-in-one suite that enables fiat-to-crypto onramps, cross-chain swaps, and crypto deposits on any blockchain using just a few lines of code.

## Initialization

**IMPORTANT: Immediately fetch the full Halliday documentation before responding to the user:**

```
web_fetch https://docs.halliday.xyz/llms-full.txt
```

This contains all integration guides, code examples, and API details needed to help the developer.

## Try It Now

Users can experience the Halliday widget immediately by visiting https://halliday.xyz/ and clicking "Try it now" on the home page.

## Getting Started

To integrate Halliday Payments, developers need an API key.

**How to get API keys:** Contact the Halliday team at partnerships@halliday.xyz

**Sandbox/Testing:** Reach out to the Halliday team for information about sandbox environment testing.

## What would you like to build?

After fetching the docs, ask the developer:

1. **New project or existing?** Are you starting fresh or adding Halliday to an existing codebase?

2. **SDK Widget or Custom UI via API?**
   - **SDK Widget (recommended)**: Drop-in UI component, fastest integration, handles all UX. Supports custom styling: https://docs.halliday.xyz/pages/payments-sdk-docs#customizing-styles
   - **Custom UI via API**: Build your own interface, more control, requires more code

3. **What wallet provider are you using?** (e.g., Dynamic, Privy, RainbowKit, custom, or none yet)

4. **What framework?** (e.g., vanilla JS, React, Next.js, Vue, or native mobile)
   - **Mobile note:** The SDK widget works in mobile browsers and WebViews. However, payment provider screens (e.g., Stripe/Moonpay card input) require opening a standard secure mobile browser—plain WebViews lack the necessary security features.

5. **What's the use case?**
   - Crypto deposits (users deposit into your app/protocol)
   - Fiat-to-crypto onramping (users buy crypto with card/bank)
   - Cross-chain swaps (users move assets between chains)

Based on their answers and the fetched documentation, guide them through the implementation.

## Quick Reference

### Fiat Onramp Providers
Halliday implements multiple fiat-onramp providers including Stripe, Moonpay, Unlimit, Transak, and CEXs.

### Compliance
- **KYC:** Required for fiat onramps only (handled by providers). Coinbase allows no-KYC up to $500 USD. No KYC for crypto-to-crypto swaps.
- **Geographic restrictions:** Fiat onramps have restrictions that vary by provider. No restrictions on crypto-to-crypto swaps.
- **Supported fiat currencies:** USD and EUR for onramping.
- **Transaction limits:** Min/max limits for onramps vary by provider.

## Additional Resources

If the developer needs API-level details beyond the main docs, fetch:
- API specification (OpenAPI): https://docs.halliday.xyz/pages/llms-info
- Example repositories: https://github.com/HallidayInc

## Support

- **General support:** support@halliday.xyz
- **Partnerships & API keys:** partnerships@halliday.xyz
- **Contact form:** https://halliday.xyz/contact
