---
name: halliday
description: |
  Integrates Halliday Payments for crypto deposits, fiat-to-crypto onramps, and cross-chain swaps.
  Provides SDK widget setup, API integration guides, example repository cloning, and
  troubleshooting for Halliday integrations.
when_to_use: |
  When users mention crypto payments, onramps, cross-chain swaps, deposit widgets,
  crypto deposits, buying crypto, payment widgets, CEX to L2, perp dex deposits,
  web3 payments, onchain deposits, halliday payment status, halliday payment lookup,
  halliday integration check, or halliday payment debug.
user-invocable: true
argument-hint: "[question]"
allowed-tools: Read, Grep, Glob, AskUserQuestion, WebFetch(domain:raw.githubusercontent.com), Bash(*/skills/halliday-payments/scripts/api-fetch.sh:*), Bash(*/skills/halliday-payments/scripts/git-fetch.sh:*)
paths:
  - "**/*halliday*"
  - "**/package.json"
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.js"
  - "**/*.jsx"
  - "**/*.html"
---

# Halliday Payments Integration

## Contents

- [Activation modes](#activation-modes)
- [Onboarding](#onboarding)
- [Initialization menu](#initialization-menu)
- [Option 1: Ask questions and learn](#option-1-ask-questions-and-learn)
- [Option 2: Clone a sample application](#option-2-clone-a-sample-application)
- [Option 3: Check my integration](#option-3-check-my-integration)
- [Option 4: Look up a payment](#option-4-look-up-a-payment)
- [Code accuracy rules](#code-accuracy-rules)
- [Using raw source files](#using-raw-source-files-context-safe)
- [Using the Halliday API](#using-the-halliday-api)
- [Support](#support)

## Quick Start

```bash
npm install @halliday-sdk/payments
```

```js
import { openHallidayPayments } from "@halliday-sdk/payments";

openHallidayPayments({
  apiKey: "YOUR_API_KEY", // Free at https://dashboard.halliday.xyz/
});
```

For full configuration options, read `${CLAUDE_PLUGIN_ROOT}/sources/sdk/index.d.ts`.

---

## Activation Modes

This skill has three activation modes:

- **`/halliday` with no arguments:** Show the [onboarding](#onboarding) check, then the [initialization menu](#initialization-menu).
- **`/halliday <question>`:** Skip the menu. Treat `$ARGUMENTS` as the developer's question and go directly to the [routing table](#option-1-ask-questions-and-learn).
- **Auto-activated** (keyword match): Skip the menu. Go directly to the [routing table](#option-1-ask-questions-and-learn) and answer the developer's question.

## Onboarding

Before starting any integration work, check whether the developer has a Halliday API key.

If the developer **does not have an API key** (or hasn't mentioned one):
- Tell them: "You'll need a Halliday API key to run any integration. Create a free account at **https://dashboard.halliday.xyz/** to get one."
- They can still explore documentation, ask questions, and clone sample apps while waiting.

If the developer **already has an API key**: proceed directly.

## Initialization Menu

When invoked via `/halliday`, ask the user what they would like to do using the AskUserQuestion tool:

**Question:** "How would you like to get started with Halliday?"

**Options:**
1. **Ask questions and learn about Halliday** — Learn about features, integration approaches, and get implementation help
2. **Clone and run a sample application** — Get started quickly with an open source example app
3. **Check my integration** — Review your Halliday integration for correctness and completeness
4. **Look up a payment** — Get the status, details, and diagnosis of a payment by ID

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
| Review integration for correctness and completeness | [reference/integration-checklist.md](reference/integration-checklist.md) |
| Look up, check status, or debug a payment by ID | [reference/payment-lookup-guide.md](reference/payment-lookup-guide.md) |

3. Let the user drive the conversation. Do not ask a series of guided questions — answer what they ask.

4. **Use raw source files for additional detail** — see [Using raw source files](#using-raw-source-files-context-safe) below.

5. **Use the Halliday API for live chain, asset, and route data.** When the developer asks about supported chains, supported tokens/assets, or whether a specific input-to-output route is available, query the API instead of pointing them to the OpenAPI spec. This requires their API key — check if they provided one during onboarding, otherwise ask for it.

   | Question type | API call |
   |---------------|----------|
   | Which chains are supported? | `${CLAUDE_PLUGIN_ROOT}/skills/halliday-payments/scripts/api-fetch.sh <KEY> GET /chains` |
   | Which tokens/assets are supported? | `${CLAUDE_PLUGIN_ROOT}/skills/halliday-payments/scripts/api-fetch.sh <KEY> GET /assets` |
   | Can I convert X to Y? / Is this route supported? | `${CLAUDE_PLUGIN_ROOT}/skills/halliday-payments/scripts/api-fetch.sh <KEY> GET /assets/available-outputs "inputs[]=<INPUT>&outputs[]=<OUTPUT>"` |
   | What can I get from input X? | `${CLAUDE_PLUGIN_ROOT}/skills/halliday-payments/scripts/api-fetch.sh <KEY> GET /assets/available-outputs "inputs[]=<INPUT>"` |
   | What inputs produce output Y? | `${CLAUDE_PLUGIN_ROOT}/skills/halliday-payments/scripts/api-fetch.sh <KEY> GET /assets/available-inputs "outputs[]=<OUTPUT>"` |

   Present the results in a readable format — don't dump raw JSON. For `/assets`, summarize the token list grouped by chain. For `/chains`, list chain names with chain IDs. For route checks, give a clear yes/no with the supported paths.

**All other source data is local. Do not WebFetch external documentation.**

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

**AskUserQuestion supports up to 4 options per call.** When the full list is longer, present the 3 most common options plus a **"More options"** final choice. Only call AskUserQuestion a second time with the remaining options if the user picks "More options".

**If SDK Widget**, ask using AskUserQuestion:

**Question:** "Which SDK Widget example would you like to clone?"

**Options:**
1. **Vanilla HTML/CSS/JS** — No framework (Repository: `HallidayPaymentsSdkExamples`)
2. **React + Privy + Vite** — React with Privy wallet (Repository: `HallidaySdkPrivyReactExample`)
3. **React + Dynamic + Wagmi** — React with Dynamic wallet and Wagmi (Repository: `HallidaySdkDynamicWagmi`)
4. **More options**

**If the user picks "More options"**, ask again:

**Question:** "Which of these additional SDK Widget examples would you like to clone?"

**Options:**
1. **React + Dynamic + Ethers** — React with Dynamic wallet and Ethers.js (Repository: `HallidaySdkDynamicEthers`)
2. **React + Viem + Wagmi + Rainbowkit** — React with Rainbowkit (Repository: `HallidaySdkViemWagmiRainbowkitExample`)
3. **React Native + Reown + Expo + Ethers** — React Native with SDK widget in WebView (Repository: `HallidaySdkReactNative`)

**If Custom UI via API**, ask using AskUserQuestion:

**Question:** "Which API example would you like to clone?"

**Options:**
1. **Vanilla HTML/CSS/JS + API** — Custom UI in vanilla JS (Repository: `HallidayPaymentsApiExamples`)
2. **React + API** — Custom UI in React (Repository: `HallidayPaymentsApiExamplesReact`)
3. **React + Privy + Vite + API** — React + Privy with custom UI (Repository: `HallidayApiPrivyReactExamples`)
4. **More options**

**If the user picks "More options"**, ask again:

**Question:** "Which of these additional API examples would you like to clone?"

**Options:**
1. **React + Dynamic + Wagmi + API** — React + Dynamic with custom UI (Repository: `HallidayApiDynamicExamplesWagmi`)
2. **React Native + Reown + Expo + Wagmi + API** — React Native with custom UI and optional Dynamic embedded wallet (Repository: `HallidayApiReactNative`)

### Step 3: Clone the Repository

**Do not use `git clone` directly.** Use the allowlisted wrapper script:

```bash
${CLAUDE_PLUGIN_ROOT}/skills/halliday-payments/scripts/git-fetch.sh {REPOSITORY_NAME}
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
   - Halliday API key (required) — free at https://dashboard.halliday.xyz/
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

## Option 3: Check My Integration

If the user selects "Check my integration" (or if auto-activated with an integration review request):

1. Read [reference/integration-checklist.md](reference/integration-checklist.md).

2. Determine the integration type. Ask using AskUserQuestion:

   **Question:** "Which type of Halliday integration are you using?"

   **Options:**
   1. **SDK Widget** — Using `@halliday-sdk/payments` and `openHallidayPayments()`
   2. **Custom UI via API** — Using the REST API at `v2.prod.halliday.xyz`

3. Scan the codebase to find Halliday integration code:

   **For SDK Widget**, Grep for:
   - `@halliday-sdk/payments`
   - `openHallidayPayments`
   - `initializeClient`

   **For API**, Grep for:
   - `v2.prod.halliday.xyz`
   - `/payments/quotes`
   - `/payments/confirm`
   - `halliday` combined with `fetch`, `axios`, or HTTP client usage

4. If no results found, ask the developer to specify which files contain their Halliday integration.

5. Read the matching source files. Also read `package.json` for dependency checks.

6. Evaluate each checklist item from the reference file against the code found.

7. Report each item as **PASS** or **ISSUE** with a brief explanation of what breaks.

8. **Only flag items that will literally break the integration** — errors, crashes, blank screens, or payments that cannot proceed. Do not flag best practices, security recommendations, UX suggestions, or optimizations.

9. At the end, provide a summary (e.g. "4 PASS, 1 ISSUE") and for each ISSUE explain what specifically will fail and how to fix it.

**Do not be pedantic. Do not fabricate checklist items. Only evaluate items from the reference file.**

---

## Option 4: Look Up a Payment

If the user selects "Look up a payment" (or if auto-activated with a payment lookup/debug request):

1. Read [reference/payment-lookup-guide.md](reference/payment-lookup-guide.md).

2. Collect required information via AskUserQuestion:
   - **Payment ID** (required) — the UUID string
   - **API key** — check if the developer already provided one during onboarding. If not, ask for it. Be prepared to accept a different API key than the one used for integration.
   - **Owner address** — only needed for `/payments/history` lookups

3. Call the Halliday API using `api-fetch.sh`:
   ```bash
   ${CLAUDE_PLUGIN_ROOT}/skills/halliday-payments/scripts/api-fetch.sh <API_KEY> GET /payments "payment_id=<PAYMENT_ID>"
   ```

4. **Always present a clear payment summary first** — status, type, amounts, addresses, duration, fees. Follow the summary template in the reference guide.

5. **Then provide status-specific details:**
   - **COMPLETE:** Extract transaction hash from `fulfilled.route`, call `GET /chains` to build block explorer link
   - **PENDING/UNCONFIRMED:** Show next instruction details and time remaining
   - **FAILED or funded EXPIRED:** Call `POST /payments/balances` to check OTW balances, present recovery options (retry vs withdraw) with step-by-step instructions
   - **WITHDRAWN:** Show completion details
   - **TAINTED:** Explain sanctions screening, direct to support

6. **Do not execute recovery actions** (withdraw, re-quote). Only explain the steps the developer needs to take.

**Do not fabricate payment data. All information must come from the API response.**

---

## Code Accuracy Rules

1. **Never fabricate parameters.** Every parameter in an `openHallidayPayments()` call or API request must be verified against official documentation.
2. **Never invent code examples.** Use only code from official docs or example repositories. If no example exists for what the developer needs, say so and point them to the closest example repo.
3. **Verify before responding.** If unsure whether a feature or parameter exists, read the relevant reference file or fetch the docs — do not guess.

## Using Raw Source Files (context-safe)

Local copies of Halliday's live sources are stored in `${CLAUDE_PLUGIN_ROOT}/sources/` and kept fresh via CI.

**CRITICAL: Never Read these files whole (except sdk/index.d.ts). They are too large and will pollute your context. Use Grep to find relevant sections, then Read only those lines.**

| Source file | ~Tokens | How to use |
|-------------|---------|------------|
| `${CLAUDE_PLUGIN_ROOT}/sources/sdk/index.d.ts` | ~6K | **Safe to Read whole.** Contains all TypeScript types, `openHallidayPayments()` params, widget config options, wallet interface. Load this when verifying parameter names or types. |
| `${CLAUDE_PLUGIN_ROOT}/sources/api/openapi.json` | ~47K | **Grep only.** Use `Grep` to search for endpoint paths (e.g. `/payments`), schema names (e.g. `QuoteRequest`), or field names. Then `Read` only the matching lines ±50 lines of context. |
| `${CLAUDE_PLUGIN_ROOT}/sources/docs/*.mdx` | ~49K total | **Grep only.** Individual documentation pages. Use `Grep` to search for topic keywords (e.g. "onramp", "cross-chain", "EIP-712"). Then `Read` only the matching file/section. |

**Lookup order:**
1. Check the curated reference file first (routing table above)
2. If it lacks detail → Grep the relevant raw source file for the specific item

**All source data is local. Do not WebFetch docs.halliday.xyz — the raw source files in `${CLAUDE_PLUGIN_ROOT}/sources/` replace that pattern.**

**Never load all source files at once. Never load openapi.json or all docs pages whole.**

## Using the Halliday API

The `api-fetch.sh` script makes authenticated calls to the Halliday REST API. It validates requests against an allowlist of read-only endpoints.

**Usage:**
```bash
${CLAUDE_PLUGIN_ROOT}/skills/halliday-payments/scripts/api-fetch.sh <API_KEY> <METHOD> <ENDPOINT> [QUERY_STRING] [JSON_BODY]
```

**Allowed endpoints:**
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /payments | Get payment status by payment_id |
| GET | /payments/history | Get payment history by owner_address |
| POST | /payments/balances | Check OTW wallet balances for a payment |
| GET | /chains | Get supported chains with explorer URLs |
| GET | /assets | Get supported asset details |
| GET | /assets/available-outputs | Verify input-to-output routes |
| GET | /assets/available-inputs | Verify output-to-input routes |

**Examples:**
```bash
# Get payment status
${CLAUDE_PLUGIN_ROOT}/skills/halliday-payments/scripts/api-fetch.sh pk_key GET /payments "payment_id=abc123"

# Check OTW balances
${CLAUDE_PLUGIN_ROOT}/skills/halliday-payments/scripts/api-fetch.sh pk_key POST /payments/balances "" '{"payment_id":"abc123"}'

# Get chain info for explorer links
${CLAUDE_PLUGIN_ROOT}/skills/halliday-payments/scripts/api-fetch.sh pk_key GET /chains
```

The response includes the JSON body followed by the HTTP status code on the last line.

**The developer's API key may already be available from the onboarding step.** If not, ask for it. Be prepared to accept a different key than the one used for integration.

**Do not use api-fetch.sh for write operations (confirm, withdraw). It only supports read-only lookups.**

## Support

- General: support@halliday.xyz
- API keys: https://dashboard.halliday.xyz/ (free)
- Partnerships: partnerships@halliday.xyz
- Contact form: https://halliday.xyz/contact
