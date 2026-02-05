---
name: halliday
description: Start a Halliday Payments integration — fiat-to-crypto onramps, cross-chain swaps, and crypto deposits
---

# Halliday Payments

**Halliday Payments enables developers to integrate streamlined crypto deposits, fiat-to-crypto onramps, and cross-chain swaps into their apps.**

## Initialization

**IMPORTANT: Do NOT fetch documentation yet.** First, ask the user what they would like to do using the AskUserQuestion tool with these exact options:

**Question:** "How would you like to get started with Halliday?"

**Options:**
1. **Ask questions and learn about Halliday** - Learn about Halliday's features, integration approaches, and get help with implementation
2. **Clone and run a sample application** - Get started quickly by cloning one of our open source example apps

---

## Option 1: Ask Questions and Learn

If the user selects "Ask questions and learn about Halliday":

1. **Immediately tell the user:** "I'm loading the Halliday documentation. Go ahead and type your question - I'll answer it as soon as the docs are ready."

2. **Fetch the full documentation in the background while waiting for user input:**
   ```
   web_fetch https://docs.halliday.xyz/llms-full.txt
   ```

3. **Answer their questions** using the fetched documentation. Do NOT ask them a series of guided questions - let them drive the conversation and ask whatever they want to know about Halliday.

**CRITICAL: When providing code examples, you MUST use the EXACT code snippets from the fetched documentation. Do NOT generate, modify, or hallucinate code examples. Copy the code verbatim from the docs.** If the documentation doesn't contain a code example for what the user is asking, say so and point them to the relevant documentation section or example repository instead of making up code.

---

## Option 2: Clone a Sample Application

If the user selects "Clone and run a sample application":

### Step 1: Ask SDK Widget vs Custom UI via API

**First, ask the user** using the AskUserQuestion tool:

**Question:** "Which type of integration would you like to try?"

**Options:**
1. **SDK Widget (Recommended)** - Drop-in UI component that handles the entire payment flow. Fastest to integrate.
2. **Custom UI via API** - Build your own interface with full control. Requires more code but offers complete customization.

### Step 2: Show Specific Sample Apps

**If they chose SDK Widget**, ask using AskUserQuestion:

**Question:** "Which SDK Widget example would you like to clone?"

**Options:**
1. **Vanilla HTML/CSS/JS** - Simple project without frameworks (Repository: `HallidayPaymentsSdkExamples`)
2. **React + Dynamic + Ethers** - React with Dynamic wallet and Ethers.js (Repository: `HallidaySdkDynamicEthers`)
3. **React + Dynamic + Wagmi** - React with Dynamic wallet and Wagmi (Repository: `HallidaySdkDynamicWagmi`)
4. **React + Privy + Vite** - React with Privy wallet (Repository: `HallidaySdkPrivyReactExample`)

**If they chose Custom UI via API**, ask using AskUserQuestion:

**Question:** "Which API example would you like to clone?"

**Options:**
1. **Vanilla HTML/CSS/JS + API** - Custom UI in vanilla JS (Repository: `HallidayPaymentsApiExamples`)
2. **React + API** - Custom UI in React (Repository: `HallidayPaymentsApiExamplesReact`)
3. **React + Dynamic + Wagmi + API** - React + Dynamic with custom UI (Repository: `HallidayApiDynamicExamplesWagmi`)
4. **React + Privy + Vite + API** - React + Privy with custom UI (Repository: `HallidayApiPrivyReactExamples`)

### Step 3: Clone the Repository

Once the user selects a sample application, clone it to the current directory:

```bash
git clone https://github.com/HallidayInc/{REPOSITORY_NAME}.git
```

### Step 4: Configure API Keys (REQUIRED BEFORE RUNNING)

**IMPORTANT: Before running the application, you MUST help the user set up their API keys.**

1. **Read the README.md** file in the cloned repository to understand the setup requirements
2. **Identify ALL locations** where API keys need to be inserted (look for placeholders like `YOUR_API_KEY`, `HALLIDAY_API_KEY`, environment variables in `.env.example`, etc.)
3. **Ask the user for their API keys:**
   - Halliday API key (required) - Get one at partnerships@halliday.xyz
   - Any wallet provider API keys (Dynamic, Privy, etc.) if applicable
4. **Insert the API keys** into all required locations in the code (config files, .env files, source files)
5. **Verify all keys are set** before proceeding to run the app

### Step 5: Run the Application

Only after all API keys are configured:
1. Install dependencies (`npm install` or `yarn`)
2. Start the development server
3. Open the app in the browser and help the user test it

---

## Quick Reference

### Fiat Onramp Providers
Halliday implements multiple fiat-onramp providers including Stripe, Moonpay, Unlimit, Transak, and CEXs.

### Getting an API Key
Contact the Halliday team at partnerships@halliday.xyz

### Compliance
- **KYC:** Required for fiat onramps only (handled by providers). Coinbase allows no-KYC up to $500 USD. No KYC for crypto-to-crypto swaps.
- **Geographic restrictions:** Fiat onramps have restrictions that vary by provider. No restrictions on crypto-to-crypto swaps.
- **Supported fiat currencies:** USD and EUR for onramping.
- **Transaction limits:** Min/max limits for onramps vary by provider.

### Try It Now
Users can experience the Halliday widget immediately by visiting https://halliday.xyz/ and clicking "Try it now" on the home page.

## Additional Resources

If the developer needs API-level details beyond the main docs, fetch:
- API specification (OpenAPI): https://docs.halliday.xyz/pages/llms-info
- Example repositories: https://github.com/HallidayInc

## Support

- **General support:** support@halliday.xyz
- **Partnerships & API keys:** partnerships@halliday.xyz
- **Contact form:** https://halliday.xyz/contact
