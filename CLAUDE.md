# Halliday Payments — Claude Code Plugin

Halliday Payments enables developers to add fiat-to-crypto onramps, cross-chain swaps, and crypto deposits to any application. This plugin gives Claude the context needed to help developers integrate Halliday correctly.

## Plugin Structure

```
.claude-plugin/plugin.json          → Plugin metadata and registration
commands/halliday.md                → /halliday command: interactive getting-started workflow
skills/halliday-payments/SKILL.md   → Auto-activated skill for Halliday integration questions
skills/halliday-payments/reference/ → Domain-specific reference files (loaded on demand)
```

## How This Plugin Works

- The **skill** (`halliday-payments`) activates automatically when a developer mentions crypto payments, onramps, swaps, or deposits. It provides a concise overview and routes to specific reference files.
- The **command** (`/halliday`) is invoked explicitly to start an interactive getting-started flow: learning about Halliday or cloning a sample app.
- **Reference files** contain detailed domain knowledge. Claude should load only the reference files relevant to the current question — not all of them at once.

## Key Constraints

- **Never hallucinate code.** Only use code snippets from official Halliday documentation or example repositories. If a code example isn't available, say so and point to the relevant repo or doc page.
- **Never fetch all docs upfront.** Use the reference files in this plugin first. Only fetch external documentation URLs when the reference files lack sufficient detail for the specific question.
- **Verify parameters.** When writing `openHallidayPayments()` calls or API requests, confirm every parameter and option exists in the official docs before including it.

## Documentation Sources (fetch only when needed)

| Source | URL | When to fetch |
|--------|-----|---------------|
| Full docs (markdown) | https://docs.halliday.xyz/llms-full.txt | Only when reference files lack detail for a specific question |
| API spec (OpenAPI) | https://docs.halliday.xyz/pages/llms-info | Only for API endpoint details, request/response schemas |
| Example repo README | `https://raw.githubusercontent.com/HallidayInc/{REPO}/main/README.md` | When helping set up a specific example |

## Integration Approaches

There are two ways to integrate Halliday:

1. **SDK Widget** (recommended) — Drop-in UI component. Best for most web apps and React Native.
2. **Custom UI via API** — Full control over the interface. Best for native mobile or highly custom UIs.

See [reference/sdk-widget-integration.md](skills/halliday-payments/reference/sdk-widget-integration.md) and [reference/api-integration.md](skills/halliday-payments/reference/api-integration.md) for details on each.

## Getting an API Key

Contact partnerships@halliday.xyz

## Support

- General: support@halliday.xyz
- Partnerships & API keys: partnerships@halliday.xyz
- Contact form: https://halliday.xyz/contact
