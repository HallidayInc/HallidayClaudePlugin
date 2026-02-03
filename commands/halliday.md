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

## What would you like to build?

After fetching the docs, ask the developer:

1. **New project or existing?** Are you starting fresh or adding Halliday to an existing codebase?

2. **SDK Widget or Custom UI via API?**
   - **SDK Widget (recommended)**: Drop-in UI component, fastest integration, handles all UX
   - **Custom UI via API**: Build your own interface, more control, requires more code

3. **What wallet provider are you using?** (e.g., Dynamic, Privy, RainbowKit, custom, or none yet)

4. **What framework?** (e.g., vanilla JS, React, Next.js, Vue, or native mobile)

5. **What's the use case?**
- Crypto deposits (users deposit into your app/protocol)
   - Fiat-to-crypto onramping (users buy crypto with card/bank)
   - Cross-chain swaps (users move assets between chains)

Based on their answers and the fetched documentation, guide them through the implementation.

## Additional Resources

If the developer needs API-level details beyond the main docs, fetch:
- API specification (OpenAPI): https://docs.halliday.xyz/pages/llms-info
- Example repositories: https://github.com/HallidayInc
