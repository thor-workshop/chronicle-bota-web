// 게임의 강조 표기를 읽습니다. 기존 [낱말] 표기도 핵심 용어로 처리합니다.
export function Keywords({ text }: { text: string }) {
  return text.split(/(\[[^\]]+\])/).map((part, i) => {
    if (!part.startsWith('[') || !part.endsWith(']')) return part
    const token = part.slice(1, -1)
    const typed = /^(num|status|term):(.*)$/.exec(token)
    const classes = { num: 'number', status: 'status-text', term: 'kw' }
    const className = typed ? classes[typed[1] as keyof typeof classes] : 'kw'
    return <span key={i} className={className}>{typed ? typed[2] : token}</span>
  })
}
