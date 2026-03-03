# Evaluation: Custom UI via API

## Input Query

"I'm building a native iOS app in Swift. I need to let users buy crypto and deposit it into our app. How do I integrate Halliday with a custom UI?"

## Expected Behavior

1. The `halliday-payments` skill activates based on keyword match ("buy crypto", "deposit")
2. Claude reads `reference/api-integration.md` (not SDK widget reference)
3. Claude correctly identifies that native iOS (Swift) requires the API approach — the SDK widget is web/React Native only
4. Claude identifies `HallidayPaymentsApiExamples` or a React-based API example as reference, while noting the developer will need to adapt for Swift
5. For API endpoint details, Claude fetches `https://docs.halliday.xyz/pages/llms-info` (the OpenAPI spec)
6. Claude mentions that payment provider screens require a secure mobile browser, not a plain WebView

## Expected Files Loaded

- `SKILL.md` (via skill activation)
- `reference/api-integration.md` (for API integration details)
- `reference/example-repositories.md` (to suggest closest example)

## What Should NOT Happen

- Should NOT fetch `https://docs.halliday.xyz/llms-full.txt` immediately
- Should NOT recommend the SDK widget for a native Swift iOS app
- Should NOT load `reference/sdk-widget-integration.md` (developer needs API, not widget)
- Should NOT fabricate Swift code examples — Halliday doesn't provide Swift examples
- Should NOT claim there's a native iOS SDK
- Should NOT load compliance reference unless the developer asks about KYC/restrictions
