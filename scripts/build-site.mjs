// 브라우저용으로 빌드한 뒤 서버 렌더로 두 페이지의 HTML을 미리 채운다.
// JS가 꺼져 있거나 스토어 심사자가 읽기만 해도 글이 다 보이게 하려는 것이다.
import { build } from 'vite'
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

// SITE_BASE 를 주면 그 경로에서 열리게 짓는다(게임 저장소의 기획 검토본에 사본을 둘 때 쓴다).
const base = process.env.SITE_BASE || undefined
await build({ logLevel: 'warn', base })
await build({ logLevel: 'warn', base, build: { ssr: 'src/entry-server.tsx', outDir: 'dist-ssr', rollupOptions: { input: 'src/entry-server.tsx' } } })
const { render } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href)

for (const [id, file] of [['home', 'dist/index.html'], ['privacy', 'dist/privacy/index.html']]) {
  const html = readFileSync(file, 'utf8')
  if (!html.includes('<!--app-->')) throw new Error(`${file} 에 <!--app--> 자리가 없습니다`)
  const body = render(id)
  if (!body.trim()) throw new Error(`${id} 페이지가 비었습니다`)
  writeFileSync(file, html.replace('<!--app-->', body))
  console.log(`${file} 를 채웠습니다 (${body.length}자)`)
}
writeFileSync('dist/404.html', readFileSync('dist/index.html', 'utf8'))
rmSync('dist-ssr', { recursive: true, force: true })
