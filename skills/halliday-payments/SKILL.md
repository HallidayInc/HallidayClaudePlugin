---
name: halliday
description: |
  Integrates Halliday Payments for crypto deposits, fiat-to-crypto onramps, and cross-chain swaps.
  Activated when users mention crypto payments, onramps, cross-chain swaps, deposit widgets,
  crypto deposits, buying crypto, payment widgets, CEX to L2, perp dex deposits,
  web3 payments, or onchain deposits.
user-invocable: true
allowed-tools: Read, Grep, Bash(scripts/git-fetch.sh), WebFetch(domain:raw.githubusercontent.com)
---

# Halliday Payments Integration

## Contents

- [Activation modes](#activation-modes)
- [Onboarding](#onboarding)
- [Initialization menu](#initialization-menu)
- [Option 1: Ask questions and learn](#option-1-ask-questions-and-learn)
- [Option 2: Clone a sample application](#option-2-clone-a-sample-application)
- [Code accuracy rules](#code-accuracy-rules)
- [Using raw source files](#using-raw-source-files-context-safe)
- [Support](#support)

## Activation Modes

This skill has two activation modes:

- **`/halliday` invocation:** Show the [onboarding](#onboarding) check, then the [initialization menu](#initialization-menu).
- **Auto-activated** (keyword match): Skip the menu. Go directly to the [routing table](#option-1-ask-questions-and-learn) and answer the developer's question.

## Onboarding

Before starting any integration work, check whether the developer has a Halliday API key.

If the developer **does not have an API key** (or hasn't mentioned one):
- Tell them: "You'll need a Halliday API key to run any integration. Email **partnerships@halliday.xyz** to request one."
- They can still explore documentation, ask questions, and clone sample apps while waiting for their key.

<!-- TODO: Replace email flow with self-serve dashboard once available -->

If the developer **already has an API key**: proceed directly.

## Initialization Menu

When invoked via `/halliday`, ask the user what they would like to do using the AskUserQuestion tool:

**Question:** "How would you like to get started with Halliday?"

**Options:**
1. **Ask questions and learn about Halliday** — Learn about features, integration approaches, and get implementation help
2. **Clone and run a sample application** — Get started quickly with an open source example app

---

## Option 1: Ask Questions and Learn

If the user selects "Ask questions and learn about Halliday" (or if auto-activated):

1. Tell the user: "Go ahead and ask your question — I have Halliday's integration reference loaded and ready."

2. Load only the reference file relevant to the developer's question:

| Developer needs... | Load this file |
|--------------------|----------------|
| SDK widget setup, config, or code | [reference/sdk-widget-integration.md](reference/sdk-widget-integration.md) |
| API endpoints, custom UI, or backend integration | [reference/api-integration.md](reference/api-integration.md) |
| KYC, geographic restrictions, currencies, limits | [reference/compliance-and-requirements.md](reference/compliance-and-requirements.md) |
| Help choosing an example repo, or cloning one | [reference/example-repositories.md](reference/example-repositories.md) |
| General questions about Halliday capabilities | [reference/common-questions.md](reference/common-questions.md) |

3. Let the user drive the conversation. Do not ask a series of guided questions — answer what they ask.

4. **Use raw source files for additional detail** — see [Using raw source files](#using-raw-source-files-context-safe) below.

**All source data is local. Do not WebFetch external documentation.**

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
5. **React + Viem + Wagmi + Rainbowkit** — React with Rainbowkit (Repository: `HallidaySdkViemWagmiRainbowkitExample`)
6. **React Native + Reown + Expo + Ethers** — React Native with SDK widget in WebView (Repository: `HallidaySdkReactNative`)

**If Custom UI via API**, ask using AskUserQuestion:

**Question:** "Which API example would you like to clone?"

**Options:**
1. **Vanilla HTML/CSS/JS + API** — Custom UI in vanilla JS (Repository: `HallidayPaymentsApiExamples`)
2. **React + API** — Custom UI in React (Repository: `HallidayPaymentsApiExamplesReact`)
3. **React + Dynamic + Wagmi + API** — React + Dynamic with custom UI (Repository: `HallidayApiDynamicExamplesWagmi`)
4. **React + Privy + Vite + API** — React + Privy with custom UI (Repository: `HallidayApiPrivyReactExamples`)
5. **React Native + Reown + Expo + Wagmi + API** — React Native with custom UI and optional Dynamic embedded wallet (Repository: `HallidayApiReactNative`)

### Step 3: Clone the Repository

**Do not use `git clone` directly.** Use the allowlisted wrapper script:

```bash
bash scripts/git-fetch.sh {REPOSITORY_NAME}
```

This script validates the repo name against an allowlist of HallidayInc repositories before cloning. Run it without arguments to see the full list of allowed repos.

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

## Code Accuracy Rules

1. **Never fabricate parameters.** Every parameter in an `openHallidayPayments()` call or API request must be verified against official documentation.
2. **Never invent code examples.** Use only code from official docs or example repositories. If no example exists for what the developer needs, say so and point them to the closest example repo.
3. **Verify before responding.** If unsure whether a feature or parameter exists, read the relevant reference file or fetch the docs — do not guess.

## Using Raw Source Files (context-safe)

Local copies of Halliday's live sources are stored in `sources/` and kept fresh via CI.

**CRITICAL: Never Read these files whole (except sdk/index.d.ts). They are too large and will pollute your context. Use Grep to find relevant sections, then Read only those lines.**

| Source file | ~Tokens | How to use |
|-------------|---------|------------|
| `sources/sdk/index.d.ts` | ~6K | **Safe to Read whole.** Contains all TypeScript types, `openHallidayPayments()` params, widget config options, wallet interface. Load this when verifying parameter names or types. |
| `sources/api/openapi.yaml` | ~47K | **Grep only.** Use `Grep` to search for endpoint paths (e.g. `/payments`), schema names (e.g. `QuoteRequest`), or field names. Then `Read` only the matching lines ±50 lines of context. |
| `sources/docs/*.mdx` | ~49K total | **Grep only.** Individual documentation pages. Use `Grep` to search for topic keywords (e.g. "onramp", "cross-chain", "EIP-712"). Then `Read` only the matching file/section. |

**Lookup order:**
1. Check the curated reference file first (routing table above)
2. If it lacks detail → Grep the relevant raw source file for the specific item

**All source data is local. Do not WebFetch docs.halliday.xyz — the raw source files in `sources/` replace that pattern.**

**Never load all source files at once. Never load openapi.yaml or all docs pages whole.**

## Support

- General: support@halliday.xyz
- Partnerships & API keys: partnerships@halliday.xyz
- Contact form: https://halliday.xyz/contact
