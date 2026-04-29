# Halliday Payments — Claude Code Plugin

A Claude Code plugin that gives Claude the context it needs to help developers integrate [Halliday Payments](https://halliday.xyz) (crypto deposits, fiat-to-crypto onramps, cross-chain swaps).

## What it does

- Activates automatically when you ask Claude about crypto payments, onramps, cross-chain swaps, deposits, payment status, or Halliday integration reviews
- Provides the `/halliday` command with a guided menu of four flows:
  1. **Ask questions and learn** — routed answers backed by a bundled reference library and live Halliday API lookups for supported chains, assets, and routes
  2. **Clone a sample application** — pick from 11 example repos (SDK widget and custom-UI/API variants across Vanilla JS, React, React Native, Dynamic, Privy, Wagmi, Rainbowkit, and more) and walk through setup end-to-end
  3. **Check my integration** — scan your codebase against an integration checklist and flag only the items that will actually break payments
  4. **Look up a payment** — fetch a payment by ID, show a clear status summary, and give status-specific next steps (block-explorer links for `COMPLETE`, recovery options for `FAILED`/`EXPIRED`, etc.)
- Ships bundled reference files covering SDK widget integration, API integration, example repositories, common questions, an integration checklist, and a payment lookup guide
- Queries the live Halliday API for supported chains, assets, routes, payment status, payment history, and OTW wallet balances via an allowlisted wrapper script

## Install

After installing Claude Code on the command line, add the Halliday marketplace and install the plugin:

```bash
claude plugin marketplace add HallidayInc/HallidayClaudePlugin && claude plugin install halliday-payments@halliday
```

## Usage

**Ask questions directly** — the skill activates on its own when your conversation involves Halliday or crypto payment integration.

**Run the command** — type `/halliday` in Claude Code to start the guided menu, or `/halliday <your question>` to skip the menu and go straight to an answer.

### Example prompts

- "How do I add the Halliday SDK widget to my Next.js app?"
- "Which chains and assets does Halliday support?"
- "Can I swap USDC on Base to ETH on Arbitrum?"
- "Check my Halliday integration"
- "Look up payment `abc-123-def` — what's its status?"

## Public API Key

You'll need a Halliday public API key to run any integration. Go to https://dashboard.halliday.xyz/ to get a free public API key.

## Partnerships

Contact us at partnerships@halliday.xyz.
