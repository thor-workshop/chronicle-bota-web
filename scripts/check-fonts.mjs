// 사이트 글자가 줄인 글꼴에 다 들어 있는지 본다. 빠졌으면 npm run subset-fonts 를 돌리라고 알린다.
import { execFileSync } from 'node:child_process'
import { siteText } from './site-text.mjs'

const covered = execFileSync('uv', ['run', '--no-project', '--quiet', '--with', 'fonttools[woff]==4.63.0', 'python', '-c',
  'import sys;from fontTools.ttLib import TTFont;print("".join(chr(c) for c in TTFont(sys.argv[1]).getBestCmap()))',
  'src/fonts/Galmuri11.woff2'], { encoding: 'utf8' })
const missing = [...siteText].filter((ch) => ch.trim() && !covered.includes(ch))
if (missing.length) {
  console.error(`글꼴에 없는 글자 ${missing.length}개: ${missing.join('')}`)
  console.error('npm run subset-fonts 를 돌려 주세요.')
  process.exit(1)
}
console.log(`글꼴이 사이트 글자 ${siteText.length}개를 모두 담고 있습니다.`)
