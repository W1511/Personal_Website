#!/bin/zsh
# Restart helper: puts the local Node 22 binary on PATH, then starts Next.js.
set -euo pipefail
export PATH="/Users/wardahbasil/.local/node-v22.17.0-darwin-arm64/bin:$PATH"
cd "$(dirname "$0")/.."
exec node ./node_modules/next/dist/bin/next dev
