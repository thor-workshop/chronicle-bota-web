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

초기 소스는 `develop` 브랜치에 올립니다. GitHub Pages 게시 승인은 따로 확인합니다.
Pages 워크플로는 `master`에 올리거나 승인 후 직접 실행할 때 작동합니다.
개인정보 문서의 검토 날짜와 호스팅 안내는 실제 게시 전에 갱신합니다.

## 문구와 이미지

한국어 작성과 검수는 `AGENTS.md`와 `CLAUDE.md`를 따릅니다.
게임 그림과 문구의 권리는 Thor's Workshop에 있습니다.
Galmuri11은 SIL Open Font License 1.1을 따르며 사용 허가서는 `public/licenses/Galmuri-OFL.txt`에 있습니다.
