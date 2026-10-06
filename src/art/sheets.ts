import astral from './astral_16.png'
import beatrice from './beatrice_16.png'
import type { Sheet } from '../primitives/Sprite'

// 크기는 게임의 assets/sprites/*.json 과 PNG 크기를 옮겨 적었다. 대기 동작은 모두 두 칸이다.
export const SHEETS: Record<string, Sheet> = {
  astral: { url: astral, width: 64, height: 64, cell: 16, frames: 2 },
  beatrice: { url: beatrice, width: 64, height: 96, cell: 16, frames: 2 },
}
