# Evaluation: SDK Widget Integration in React

## Input Query

"I want to add crypto deposits to my React app. I'm using Dynamic for wallet connection with Wagmi."

## Expected Behavior

1. The `halliday` skill activates based on keyword match ("crypto deposits")
2. Claude reads `reference/sdk-widget-integration.md` (not all reference files)
3. Claude recommends the SDK widget as the integration approach
4. Claude identifies `HallidaySdkDynamicWagmi` as the matching example repo
5. Claude provides guidance based on the reference file content
6. If the developer asks for specific `HallidayPayments` configuration parameters, Claude reads `${CLAUDE_PLUGIN_ROOT}/sources/sdk/index.d.ts` (small enough to load whole) to verify them
7. Claude does NOT fabricate configuration parameters

## Expected Files Loaded

- `SKILL.md` (via skill activation)
- `reference/sdk-widget-integration.md` (for SDK widget details)
- `reference/example-repositories.md` (to confirm the right repo)

## What Should NOT Happen

- Should NOT WebFetch any external docs — all source data is local in `${CLAUDE_PLUGIN_ROOT}/sources/`
- Should NOT Read `${CLAUDE_PLUGIN_ROOT}/sources/api/openapi.json` or docs files whole — use Grep for targeted lookups
- Should NOT load all five reference files at once
- Should NOT load `reference/api-integration.md` (developer asked for widget, not API)
- Should NOT load `reference/compliance-and-requirements.md` (not relevant to this question)
- Should NOT invent `HallidayPayments` configuration parameters without verifying against docs
- Should NOT recommend the API approach unless the developer specifically asks about it
