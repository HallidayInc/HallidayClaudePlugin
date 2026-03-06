#!/usr/bin/env bash
set -euo pipefail

# Fetches live Halliday sources into sources/ and generates BUILD_META.json.
# Called by CI (.github/workflows/check-sources.yml) to verify committed
# sources match the live upstream. Can also be run locally when needed.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SOURCES_DIR="$REPO_ROOT/sources"

mkdir -p "$SOURCES_DIR"

echo "Fetching openapi.json..."
curl -sf --retry 3 --retry-delay 5 \
  "https://v2.prod.halliday.xyz/api" \
  | python3 -m json.tool --sort-keys \
  > "$SOURCES_DIR/openapi.json"

echo "Fetching sdk-types.d.ts..."
curl -sf --retry 3 --retry-delay 5 \
  "https://cdn.jsdelivr.net/npm/@halliday-sdk/payments/dist/paymentsWidget/index.d.ts" \
  > "$SOURCES_DIR/sdk-types.d.ts"

echo "Fetching docs-full.txt..."
curl -sf --retry 3 --retry-delay 5 \
  "https://docs.halliday.xyz/llms-full.txt" \
  > "$SOURCES_DIR/docs-full.txt"

echo "Generating BUILD_META.json..."
COMMIT=$(git -C "$REPO_ROOT" rev-parse HEAD 2>/dev/null || echo "unknown")
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
OPENAPI_HASH=$(shasum -a 256 "$SOURCES_DIR/openapi.json" | awk '{print $1}')
SDK_TYPES_HASH=$(shasum -a 256 "$SOURCES_DIR/sdk-types.d.ts" | awk '{print $1}')
DOCS_HASH=$(shasum -a 256 "$SOURCES_DIR/docs-full.txt" | awk '{print $1}')

cat > "$REPO_ROOT/BUILD_META.json" <<EOF
{
  "commit": "$COMMIT",
  "timestamp": "$TIMESTAMP",
  "sources": {
    "openapi.json": {
      "url": "https://v2.prod.halliday.xyz/api",
      "sha256": "$OPENAPI_HASH"
    },
    "sdk-types.d.ts": {
      "url": "https://cdn.jsdelivr.net/npm/@halliday-sdk/payments/dist/paymentsWidget/index.d.ts",
      "sha256": "$SDK_TYPES_HASH"
    },
    "docs-full.txt": {
      "url": "https://docs.halliday.xyz/llms-full.txt",
      "sha256": "$DOCS_HASH"
    }
  }
}
EOF

echo "All sources updated. BUILD_META.json written."
