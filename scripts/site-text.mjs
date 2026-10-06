// 사이트에 나올 수 있는 글자를 모두 모은다. 글꼴 줄이기와 빠진 글자 검사가 같이 쓴다.
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const files = []
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) walk(path)
    else if (/\.(tsx?|css|html)$/.test(name)) files.push(path)
  }
}
walk('src')
files.push('index.html', 'privacy/index.html')

const chars = new Set()
for (let c = 0x20; c < 0x7f; c++) chars.add(String.fromCharCode(c))
for (const ch of '·…←→↑↓©') chars.add(ch)
for (const file of files) for (const ch of readFileSync(file, 'utf8')) if (ch.codePointAt(0) > 0x7f) chars.add(ch)

export const siteText = [...chars].sort().join('')
if (import.meta.url === pathToFileURL(resolve(process.argv[1])).href) process.stdout.write(siteText)
