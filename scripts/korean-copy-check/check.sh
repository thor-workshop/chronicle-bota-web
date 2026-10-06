#!/usr/bin/env bash
# 한국어 문구의 알려진 번역투 버릇을 센다.
# 사용법: check.sh <파일...>
# 임계값 조정: KCC_MAX_DOT=30 KCC_MAX_NEG_RATIO=40 check.sh <파일...>
#
# 사람이 읽는 문구를 한 번에 다 걸어야 한다. 비율을 세므로
# 파일 하나만 따로 재면 표본이 작아 뜻 없는 수가 나온다.
set -uo pipefail

MAX_DOT="${KCC_MAX_DOT:-30}"
MAX_NEG_RATIO="${KCC_MAX_NEG_RATIO:-40}"
MIN_SAMPLE="${KCC_MIN_SAMPLE:-40}"   # 종결어미가 이보다 적으면 비율을 강제하지 않는다

if [ $# -eq 0 ]; then
  echo "사용법: $(basename "$0") <파일...>" >&2
  exit 2
fi
for f in "$@"; do
  [ -f "$f" ] || { echo "파일 없음: $f" >&2; exit 2; }
done

HERE="$(cd "$(dirname "$0")" && pwd)"
TMP="$(mktemp)"; RAW="$(mktemp)"
trap 'rm -f "$TMP" "$RAW"' EXIT

python3 "$HERE/extract.py"       "$@" > "$TMP"   # 보고용: 파일:줄번호:내용
python3 "$HERE/extract.py" --raw "$@" > "$RAW"   # 세기용: 내용만

count()  { grep -o  -- "$1" "$RAW" 2>/dev/null | wc -l | tr -d ' '; }
ecount() { grep -oE -- "$1" "$RAW" 2>/dev/null | wc -l | tr -d ' '; }
lcount() { grep -cE -- "$1" "$RAW" 2>/dev/null | tr -d ' '; }

FAIL=0
row() {
  printf '  %-22s %5s  %-6s %s\n' "$1" "$2" "$3" "${4:-}"
  [ "$3" = "FAIL" ] && FAIL=1
  return 0
}

echo
echo "  한국어 문구 검사 — $# 개 파일"
echo "  ────────────────────────────────────────────────────────"

# 1. 가운뎃점. 글머리표로 쓴 것은 뺀다.
#    `<li>· 글` 과, 줄바꿈되어 `·` 가 줄 첫머리로 온 것 둘 다 글머리표다.
DOT_ALL=$(count '·')
DOT_BULLET=$(( $(ecount '>· ') + $(lcount '^[[:space:]]*·') ))
DOT=$(( DOT_ALL - DOT_BULLET )); [ "$DOT" -lt 0 ] && DOT=0
if [ "$DOT" -le "$MAX_DOT" ]; then row "문장 안 가운뎃점" "$DOT" "OK" "글머리표 ${DOT_BULLET}개 제외 · 목표 ${MAX_DOT} 이하"
else row "문장 안 가운뎃점" "$DOT" "FAIL" "글머리표 ${DOT_BULLET}개 제외 · 목표 ${MAX_DOT} 이하"; fi

# 2. 줄표. 표에서 미지원을 뜻하는 '—' 는 뺀다.
DASH=$(( $(count '—') - $(ecount "'—'") )); [ "$DASH" -lt 0 ] && DASH=0
if [ "$DASH" -eq 0 ]; then row "산문 줄표" "$DASH" "OK" "목표 0"
else row "산문 줄표" "$DASH" "FAIL" "목표 0"; fi

# 3. 부정 종결 비율. 표본이 작으면 강제하지 않는다.
NEG=$(ecount '지 않습니다|지 않았습니다|없습니다|않습니다|못합니다')
END=$(ecount '습니다|입니다')
RATIO=0; [ "$END" -gt 0 ] && RATIO=$(( NEG * 100 / END ))
if [ "$END" -lt "$MIN_SAMPLE" ]; then
  row "부정 종결" "$NEG" "정보" "전체 종결의 ${RATIO}% · 표본이 ${END}개라 판정 안 함"
elif [ "$RATIO" -le "$MAX_NEG_RATIO" ]; then
  row "부정 종결" "$NEG" "OK" "전체 종결의 ${RATIO}% · 목표 ${MAX_NEG_RATIO}% 이하"
else
  row "부정 종결" "$NEG" "FAIL" "전체 종결의 ${RATIO}% · 목표 ${MAX_NEG_RATIO}% 이하"
fi

# 4. 금지 낱말
BANNED='당신|(^|[^만])들고 있|에 대해|에 대한|를 통해|을 통해|되어진|에 있어서|와 관련하여|것입니다|것이라|제 색|제 소스|적대적|앞에 떠|빠져나가기|으로 세(지|고|면서|는|어|다)|(서사시|난이도) ?사다리|별 하나가 꺼졌|망원경이 [^.]{0,30}겨누'
BAD=$(ecount "$BANNED")
if [ "$BAD" -eq 0 ]; then row "금지 낱말" "$BAD" "OK" "banned.md 참고"
else
  row "금지 낱말" "$BAD" "FAIL" "banned.md 참고"
  grep -nE "$BANNED" "$TMP" | sed 's/^[0-9]*://' | cut -c1-110 | head -8 | sed 's/^/       /'
fi

# 5. 문장형 제목. 한국어 제목은 명사다.
# 한글 범위(`[가-힣]`)로 한 번 걸렀었다. GNU grep 이 C 로케일에서 그 범위를 「Invalid
# collation character」로 거절해서 우분투 CI 에서는 이 검사가 통째로 0 이 되고 있었다.
# 아래 종결어미가 모두 한글이라 그 단계는 없어도 같은 것을 고른다.
TITLES=$(grep -oE 'title="[^"]*"|<h[1-6][^>]*>[^<]*</h[1-6]>|^#{1,6} .*' "$RAW" 2>/dev/null \
         | grep -E '(습니다|입니다|하나|있나|없나|인가|나요|까요)("|<|$)' || true)
SENT=$(printf '%s' "$TITLES" | grep -c . || true)
if [ "$SENT" -eq 0 ]; then row "문장형 제목" "0" "OK" "제목은 명사로"
else
  row "문장형 제목" "$SENT" "FAIL" "제목은 명사로"
  printf '%s\n' "$TITLES" | head -8 | sed 's/^/       /'
fi

echo "  ────────────────────────────────────────────────────────"
if [ "$FAIL" -eq 0 ]; then echo "  PASS"; echo; exit 0
else echo "  FAIL — 고칠 때까지 수정 완료로 보고하지 말 것"; echo; exit 1; fi
