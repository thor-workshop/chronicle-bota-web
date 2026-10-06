import { LABELS, SITE } from '../content'

export type MenuItem = { href: string; label: string }

// N-EMU의 BBS 머리처럼 이름과 번호 메뉴를 한 줄에 둔다.
export function Head({ menu, home, paused = false }: { menu: MenuItem[]; home: string; paused?: boolean }) {
  return (
    <header className="head">
      <div className="wrap head-row">
        <a className="mark" href={home} aria-label={SITE.name}>
          {SITE.short}
          <span className="cursor" aria-hidden="true" style={{ animationPlayState: paused ? 'paused' : 'running' }}>_</span>
        </a>
        <nav aria-label={LABELS.navigation}>
          {menu.map((item, i) => (
            <a key={item.href} href={item.href}>
              <span className="num" aria-hidden="true">[{i + 1}]</span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
