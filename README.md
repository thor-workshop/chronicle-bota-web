# Chronicle: Breach of the Abyss

아스트랄과 베아트리스의 이야기, 터치 모드 전투와 기술 선택을 소개하는 React/Vite 사이트입니다.
시오리는 실루엣과 COMING SOON 표시로 예고합니다. 앞으로 새로운 캐릭터가 계속 추가됩니다.
게임은 iOS·Android 출시를 준비하고 있습니다.

## 실행과 검사

Node.js 24와 npm, 한국어 검사에 사용하는 uv가 필요합니다.

~~~bash
npm ci
npm run dev
npm run typecheck
npm run lint
npm run check-korean
npm run check-fonts
npm run build
npm run preview -- --port 4180
~~~

기본 경로는 `/chronicle-bota-web/`입니다. 소개 페이지와 `/privacy/`의 본문을 정적 HTML로 미리 채웁니다.
문구는 `src/content.ts`에서 관리합니다. 문구를 바꾸면 `npm run subset-fonts`를 실행하고 글꼴 누락을 검사합니다.

## 공개

공개 주소는 https://thor-workshop.github.io/chronicle-bota-web/ 입니다.
`develop`에는 개발 원본, `master`에는 게시한 판을 보관합니다. 새로운 게시 작업은 사용자의 승인 범위를 확인한 뒤 진행합니다.
Pages 워크플로는 `master`에 올리거나 승인 후 직접 실행할 때 작동합니다.
개인정보 문서에는 2026년 10월 6일 시행일과 GitHub Pages의 호스팅 안내를 반영했습니다.

## 문구와 이미지

한국어 작성과 검수는 `AGENTS.md`와 `CLAUDE.md`를 따릅니다.
게임 그림과 문구의 권리는 Thor's Workshop에 있습니다.
Galmuri11은 SIL Open Font License 1.1을 따르며 사용 허가서는 `public/licenses/Galmuri-OFL.txt`에 있습니다.
