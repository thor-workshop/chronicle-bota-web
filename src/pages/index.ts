import { Home } from './Home'
import { Privacy } from './Privacy'

export const PAGES = { home: Home, privacy: Privacy }
export type PageId = keyof typeof PAGES

export function pageFor(id: string | undefined) {
  return PAGES[(id ?? 'home') as PageId] ?? Home
}
