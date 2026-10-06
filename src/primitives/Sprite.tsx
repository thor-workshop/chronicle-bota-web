import type { CSSProperties } from 'react'

export type Sheet = { url: string; width: number; height: number; cell: number; frames: number }

type Props = { sheet: Sheet; scale: number; label?: string; paused?: boolean }

// 게임 아틀라스의 첫 줄(대기 동작)을 정수 배율로 키워 번갈아 그린다.
// 한 칸만 보이도록 배경 위치를 옮기므로 아틀라스를 잘라 따로 굽지 않아도 된다.
export function Sprite({ sheet, scale, label, paused = false }: Props) {
  const size = sheet.cell * scale
  const style = {
    width: size,
    height: size,
    backgroundImage: `url(${sheet.url})`,
    backgroundSize: `${sheet.width * scale}px ${sheet.height * scale}px`,
    '--shift': `${-size * sheet.frames}px`,
    animationTimingFunction: `steps(${sheet.frames})`,
    animationPlayState: paused ? 'paused' : 'running',
  } as CSSProperties
  return <div className="sprite" style={style} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} />
}
