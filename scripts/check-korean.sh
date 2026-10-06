#!/usr/bin/env bash
# 화면에 보이는 한국어 문구를 한꺼번에 잰다. 비율을 세므로 파일을 나눠 재지 않는다.
set -euo pipefail
cd "$(dirname "$0")/.."
scripts/korean-copy-check/check.sh index.html privacy/index.html src/content.ts src/pages/*.tsx src/chrome/*.tsx
