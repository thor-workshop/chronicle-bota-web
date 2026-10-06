#!/usr/bin/env python3
"""사람이 읽는 한국어만 남긴다. 코드 주석은 뺀다.

  extract.py <파일...>          파일:줄번호:내용   (보고용)
  extract.py --raw <파일...>    내용만             (세기용)

세는 것과 보고하는 것을 나눈 이유: 접두사에 들어 있는 문자가
문장부호 집계에 섞이면 안 된다. 경로에 가운뎃점이나 줄표가 있으면
줄마다 하나씩 잘못 세어진다.
"""
import re, sys

args = sys.argv[1:]
raw = False
if args and args[0] == '--raw':
    raw = True
    args = args[1:]

for path in args:
    src = open(path, encoding='utf-8').read()
    # 블록 주석과 줄 주석을 지운다. 줄 번호는 유지한다.
    def blank(m): return re.sub(r'[^\n]', ' ', m.group(0))
    src = re.sub(r'/\*.*?\*/', blank, src, flags=re.S)
    src = re.sub(r'<!--.*?-->', blank, src, flags=re.S)
    src = re.sub(r'^[ \t]*//.*$', '', src, flags=re.M)
    for i, line in enumerate(src.split('\n'), 1):
        if re.search(r'[가-힣]', line):
            print(line if raw else f'{path}:{i}:{line}')
