---
name: halliday
description: Start a Halliday Payments integration — fiat-to-crypto onramps, cross-chain swaps, and crypto deposits
disable-model-invocation: true
---

# Halliday Payments

Halliday Payments enables developers to add crypto deposits, fiat-to-crypto onramps, and cross-chain swaps to their apps.

## Initialization

Ask the user what they would like to do using the AskUserQuestion tool:

**Question:** "How would you like to get started with Halliday?"

**Options:**
1. **Ask questions and learn about Halliday** — Learn about features, integration approaches, and get implementation help
2. **Clone and run a sample application** — Get started quickly with an open source example app

---

## Option 1: Ask Questions and Learn

If the user selects "Ask questions and learn about Halliday":

1. Tell the user: "Go ahead and ask your question — I have Halliday's integration reference loaded and ready."

2. Answer their questions using the reference files in this plugin:
   - SDK widget questions → Read [reference/sdk-widget-integration.md](../skills/halliday-payments/reference/sdk-widget-integration.md)
   - API/custom UI questions → Read [reference/api-integration.md](../skills/halliday-payments/reference/api-integration.md)
   - Compliance questions → Read [reference/compliance-and-requirements.md](../skills/halliday-payments/reference/compliance-and-requirements.md)
   - "Which example should I use?" → Read [reference/example-repositories.md](../skills/halliday-payments/reference/example-repositories.md)
   - General questions → Read [reference/common-questions.md](../skills/halliday-payments/reference/common-questions.md)

3. Let the user drive the conversation. Do not ask a series of guided questions — answer what they ask.

4. **Only fetch external docs as a fallback.** If the reference files don't contain enough detail for their specific question, fetch https://docs.halliday.xyz/llms-full.txt. For API schema details, fetch https://docs.halliday.xyz/pages/llms-info.

**CRITICAL: When providing code examples, use ONLY code from official documentation or example repositories. Never fabricate code. Never guess parameter names or values.** If the docs don't contain a code example for what the user needs, say so and point them to the closest example repository.

---

## Option 2: Clone a Sample Application

If the user selects "Clone and run a sample application":

Copy this checklist and track progress as you complete each step:

```
Setup Progress:
- [ ] Step 1: Choose integration approach (SDK Widget or Custom UI via API)
- [ ] Step 2: Choose example application
- [ ] Step 3: Clone repository
- [ ] Step 4: Configure API keys
- [ ] Step 5: Install dependencies
- [ ] Step 6: Start development server
- [ ] Step 7: Verify application runs
```

### Step 1: Choose Integration Approach

Ask the user using AskUserQuestion:

**Question:** "Which type of integration would you like to try?"

**Options:**
1. **SDK Widget (Recommended)** — Drop-in UI component that handles the entire payment flow
2. **Custom UI via API** — Build your own interface with full control over the design

### Step 2: Choose Example Application

**If SDK Widget**, ask using AskUserQuestion:

**Question:** "Which SDK Widget example would you like to clone?"

**Options:**
1. **Vanilla HTML/CSS/JS** — No framework (Repository: `HallidayPaymentsSdkExamples`)
2. **React + Dynamic + Ethers** — React with Dynamic wallet and Ethers.js (Repository: `HallidaySdkDynamicEthers`)
3. **React + Dynamic + Wagmi** — React with Dynamic wallet and Wagmi (Repository: `HallidaySdkDynamicWagmi`)
4. **React + Privy + Vite** — React with Privy wallet (Repository: `HallidaySdkPrivyReactExample`)

**If Custom UI via API**, ask using AskUserQuestion:

**Question:** "Which API example would you like to clone?"

**Options:**
1. **Vanilla HTML/CSS/JS + API** — Custom UI in vanilla JS (Repository: `HallidayPaymentsApiExamples`)
2. **React + API** — Custom UI in React (Repository: `HallidayPaymentsApiExamplesReact`)
3. **React + Dynamic + Wagmi + API** — React + Dynamic with custom UI (Repository: `HallidayApiDynamicExamplesWagmi`)
4. **React + Privy + Vite + API** — React + Privy with custom UI (Repository: `HallidayApiPrivyReactExamples`)

### Step 3: Clone the Repository

```bash
git clone https://github.com/HallidayInc/{REPOSITORY_NAME}.git
```

**Verify:** Confirm the directory was created and contains a README.md.

### Step 4: Configure API Keys

1. Read the `README.md` in the cloned repository for setup requirements
2. Identify all locations where API keys need to be set:
   - Look for `.env.example` files (copy to `.env`)
   - Search for placeholders: `YOUR_API_KEY`, `HALLIDAY_API_KEY`, `NEXT_PUBLIC_HALLIDAY_API_KEY`, etc.
   - Check config files and source files for any other key placeholders
3. Ask the user for their API keys:
   - Halliday API key (required) — get one at partnerships@halliday.xyz
   - Wallet provider API keys (Dynamic, Privy, etc.) if applicable to the chosen example
4. Insert the API keys into all required locations

### Step 5: Install Dependencies

```bash
cd {CLONED_DIRECTORY} && npm install
```

**Verify:** Check for errors in the install output. If there are peer dependency warnings, note them but they are usually non-blocking.

### Step 6: Start Development Server

```bash
cd {CLONED_DIRECTORY} && npm run dev
```

Or `npm start` or `yarn dev` — check the README for the correct command.

### Step 7: Verify Application Runs

- Confirm the dev server started without errors
- Note the local URL (usually http://localhost:3000 or similar)
- Tell the user to open the URL in their browser
- Help the user test the payment flow
