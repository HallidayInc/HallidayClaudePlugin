#!/usr/bin/env bash
set -euo pipefail

# Validates that URLs referenced in skill and reference files are reachable (non-404).
# Also checks that API endpoints mentioned in reference files exist in the OpenAPI spec.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

ERRORS=0

echo "=== Checking URLs in skill and reference files ==="

# Extract unique URLs from skill and reference markdown files, excluding template URLs with {placeholders}
URLS=$(grep -rhoE 'https?://[^\s\)\"'"'"'`>]+' \
  "$REPO_ROOT/skills/" \
  | grep -v '{' \
  | grep -v 'localhost' \
  | sort -u)

for url in $URLS; do
  # Strip trailing punctuation that may have been captured
  url="${url%,}"
  url="${url%.}"

  STATUS=$(curl -sf -o /dev/null -w "%{http_code}" --retry 2 --retry-delay 3 --max-time 10 "$url" 2>/dev/null || echo "000")
  if [[ "$STATUS" == "404" ]]; then
    echo "  FAIL (404): $url"
    ERRORS=$((ERRORS + 1))
  elif [[ "$STATUS" == "000" ]]; then
    echo "  WARN (unreachable): $url"
  else
    echo "  OK ($STATUS): $url"
  fi
done

echo ""
echo "=== Checking API endpoints exist in OpenAPI spec ==="

OPENAPI="$REPO_ROOT/sources/openapi.json"
if [[ ! -f "$OPENAPI" ]]; then
  echo "  SKIP: sources/openapi.json not found"
else
  # Extract API endpoint paths referenced in reference files (e.g. /v2/payments, /quotes)
  ENDPOINTS=$(grep -rhoE '(GET|POST|PUT|DELETE|PATCH)\s+/[a-zA-Z0-9/_-]+' \
    "$REPO_ROOT/skills/" 2>/dev/null \
    | awk '{print $2}' \
    | sort -u)

  if [[ -z "$ENDPOINTS" ]]; then
    echo "  No explicit endpoint references found in skill files (OK)"
  else
    for endpoint in $ENDPOINTS; do
      if grep -q "\"$endpoint\"" "$OPENAPI"; then
        echo "  OK: $endpoint"
      else
        echo "  FAIL: $endpoint not found in openapi.json"
        ERRORS=$((ERRORS + 1))
      fi
    done
  fi
fi

echo ""
if [[ "$ERRORS" -gt 0 ]]; then
  echo "=== $ERRORS validation error(s) found ==="
  exit 1
else
  echo "=== All validations passed ==="
fi
