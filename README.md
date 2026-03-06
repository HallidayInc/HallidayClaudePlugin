# Halliday Payments — Claude Code Plugin

A Claude Code plugin that gives Claude the context it needs to help developers integrate [Halliday Payments](https://halliday.xyz) (fiat-to-crypto onramps, cross-chain swaps, and crypto deposits).

## What it does

- Activates automatically when you ask Claude about crypto payments, onramps, swaps, or deposits
- Provides the `/halliday` skill to walk through setup or clone an example app
- Checks whether you have an API key and guides you to get one if needed
- Includes reference files covering SDK widget integration, API integration, compliance, and example repositories

## Install

After installing Claude Code on the command line, add the Halliday marketplace and install the plugin:

```bash
claude plugin marketplace add HallidayInc/HallidayClaudePlugin && claude plugin install halliday-payments@halliday
```

## Usage

**Ask questions directly** — the skill activates on its own when your conversation involves Halliday or crypto payment integration.

**Run the skill** — type `/halliday` in Claude Code to start the guided getting-started flow.

## Source freshness

A CI check on every PR to main fetches the latest Halliday API spec, SDK types, and docs, then compares them to the committed copies in `sources/`. If they've drifted, the PR fails. The CI also validates that all URLs referenced in skill files are reachable.

If CI fails due to stale sources, run `bash scripts/update-sources.sh`, commit the updated `sources/` and `BUILD_META.json`, and push.

## API Key

You'll need a Halliday API key to run any integration. Contact partnerships@halliday.xyz to get one.
