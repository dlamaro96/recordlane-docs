#!/usr/bin/env bash
# SPDX-License-Identifier: Apache-2.0
set -euo pipefail
platform="${1:?usage: sync-assets.sh /path/to/recordlane}"
docs_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
mkdir -p "$docs_root/site/assets/screenshots" "$docs_root/site/assets/diagrams" "$docs_root/site/api"
cp "$platform/assets/screenshots/overview-dark-1440.png" "$docs_root/site/assets/screenshots/"
cp "$platform/assets/screenshots/master-dark-1440.png" "$docs_root/site/assets/screenshots/"
cp "$platform/assets/diagrams/system-context.svg" "$docs_root/site/assets/diagrams/"
cp "$platform/assets/diagrams/logical-components.svg" "$docs_root/site/assets/diagrams/"
cp "$platform/contracts/openapi/openapi.json" "$docs_root/site/api/"
git -C "$platform" rev-parse HEAD > "$docs_root/site/assets/platform-revision.txt" 2>/dev/null || printf 'uncommitted\n' > "$docs_root/site/assets/platform-revision.txt"
