import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { pageFor } from './pages'

export function render(id: string): string {
  const Page = pageFor(id)
  return renderToString(<StrictMode><Page /></StrictMode>)
}
