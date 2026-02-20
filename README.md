# Halliday Payments — Claude Code Plugin

A Claude Code plugin that gives Claude the context it needs to help developers integrate [Halliday Payments](https://halliday.xyz) (fiat-to-crypto onramps, cross-chain swaps, and crypto deposits).

## What it does

- Activates automatically when you ask Claude about crypto payments, onramps, swaps, or deposits
- Provides the `/halliday` command to walk through setup or clone an example app
- Includes reference files covering SDK widget integration, API integration, compliance, and example repositories

## Install

Add the Halliday marketplace and install the plugin:

```bash
claude plugin marketplace add HallidayInc/HallidayClaudePlugin
claude plugin install halliday-payments@halliday
```

## Usage

**Ask questions directly** — the skill activates on its own when your conversation involves Halliday or crypto payment integration.

**Run the command** — type `/halliday` in Claude Code to start the guided getting-started flow.

## API Key

You'll need a Halliday API key to run any integration. Contact partnerships@halliday.xyz to get one.
