import { LABELS, SITE } from '../content'

// 페이지 맨 아래 상태줄. 개인정보처리방침 링크는 스토어가 찾아야 하므로 좁은 화면에서도 숨기지 않는다.
export function Status({ privacy }: { privacy: string }) {
  return (
    <footer className="status">
      <div className="wrap status-row">
        <span>
          © {SITE.year} {SITE.maker}
        </span>
        <span className="status-links">
          <a href={`mailto:${SITE.contact}`}>{SITE.contact}</a>
          <a href={privacy}>{LABELS.privacy}</a>
        </span>
      </div>
    </footer>
  )
}
