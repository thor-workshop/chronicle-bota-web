import type { Media } from '../content'

// 움직이는 그림(무손실 WebP)과 멈춘 한 장. 동작 줄이기면 멈춘 한 장만 보인다.
export function Motion({ media, width, height, className, paused = false }: { media: Media; width: number; height: number; className?: string; paused?: boolean }) {
  if (!media.motion || paused) return <img className={className} src={media.still} width={width} height={height} alt={media.alt} loading="lazy" decoding="async" />
  return (
    <picture className={className}>
      <source media="(prefers-reduced-motion: reduce)" srcSet={media.still} />
      <img src={media.motion} width={width} height={height} alt={media.alt} loading="lazy" decoding="async" />
    </picture>
  )
}
