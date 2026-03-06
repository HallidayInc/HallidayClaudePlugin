#!/usr/bin/env bash
set -euo pipefail

# Validates that URLs referenced in skill and reference files are reachable (non-404).
# Also checks that API endpoints mentioned in reference files exist in the OpenAPI spec.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

ERRORS=0

echo "=== Checking URLs in skill and reference files ==="

# Extract unique URLs from skill and reference markdown files.
# Use POSIX [:space:] instead of \s for portability across grep versions.
# Exclude template URLs with {placeholders} and localhost.
URLS=$(grep -rhoP 'https?://[^\s\)\"'"'"'`>]+' \
  "$REPO_ROOT/skills/" \
  2>/dev/null \
  | grep -v '{' \
  | grep -v 'localhost' \
  | sed 's/[,.)]*$//' \
  | sort -u)

while IFS= read -r url; do
  [[ -z "$url" ]] && continue

  STATUS=$(curl -s -o /dev/null -w "%{http_code}" --retry 2 --retry-delay 3 --max-time 10 "$url" 2>/dev/null || echo "000")
  if [[ "$STATUS" == "404" ]]; then
    echo "  FAIL (404): $url"
    ERRORS=$((ERRORS + 1))
  elif [[ "$STATUS" == "000" ]]; then
    echo "  WARN (unreachable): $url"
  else
    echo "  OK ($STATUS): $url"
  fi
done <<< "$URLS"

echo ""
echo "=== Checking API endpoints exist in OpenAPI spec ==="

OPENAPI="$REPO_ROOT/sources/openapi.json"
if [[ ! -f "$OPENAPI" ]]; then
  echo "  SKIP: sources/openapi.json not found"
else
  # Extract API endpoint paths referenced in reference files (e.g. /v2/payments, /quotes)
  ENDPOINTS=$(grep -rhoP '(GET|POST|PUT|DELETE|PATCH)\s+/[a-zA-Z0-9/_-]+' \
    "$REPO_ROOT/skills/" 2>/dev/null \
    | awk '{print $2}' \
    | sort -u)

  if [[ -z "$ENDPOINTS" ]]; then
    echo "  No explicit endpoint references found in skill files (OK)"
  else
    while IFS= read -r endpoint; do
      [[ -z "$endpoint" ]] && continue
      if grep -q "\"$endpoint\"" "$OPENAPI"; then
        echo "  OK: $endpoint"
      else
        echo "  FAIL: $endpoint not found in openapi.json"
        ERRORS=$((ERRORS + 1))
      fi
    done <<< "$ENDPOINTS"
  fi
fi

echo ""
if [[ "$ERRORS" -gt 0 ]]; then
  echo "=== $ERRORS validation error(s) found ==="
  exit 1
else
  echo "=== All validations passed ==="
fi
