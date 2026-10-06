#!/usr/bin/env bash
# Galmuri11을 사이트에 나오는 글자만 남겨 src/fonts/Galmuri11.woff2 로 줄인다.
# 문구를 고치면 다시 돌린다. 빠진 글자가 있으면 npm run check-fonts 가 실패한다.
set -euo pipefail
root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${root}"
upstream=".build/fonts-upstream"
archive="${upstream}/Galmuri-v2.40.4.zip"
mkdir -p "${upstream}" src/fonts
if [[ ! -f "${archive}" ]]; then
  curl --fail --silent --show-error --location --output "${archive}" \
    "https://github.com/quiple/galmuri/releases/download/v2.40.4/Galmuri-v2.40.4.zip"
fi
[[ "$(shasum -a 256 "${archive}" | cut -d' ' -f1)" == "c8b3d9861a62ae73c8b1178091401cd79994812437ef386413f6dd54856e60e7" ]] \
  || { echo "글꼴 압축 파일의 체크섬이 다릅니다: ${archive}" >&2; exit 1; }
unzip -oq "${archive}" Galmuri11.ttf LICENSE.txt -d "${upstream}"
cp "${upstream}/LICENSE.txt" public/licenses/Galmuri-OFL.txt
node scripts/site-text.mjs > "${upstream}/text.txt"
uv run --no-project --with 'fonttools[woff]==4.63.0' pyftsubset "${upstream}/Galmuri11.ttf" \
  --text-file="${upstream}/text.txt" --flavor=woff2 --layout-features='*' --no-hinting \
  --output-file=src/fonts/Galmuri11.woff2
echo "src/fonts/Galmuri11.woff2 $(wc -c < src/fonts/Galmuri11.woff2) 바이트"
