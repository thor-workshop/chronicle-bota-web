import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { pageFor } from './pages'
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/site.css'

const root = document.getElementById('root')!
const Page = pageFor(root.dataset.page)
hydrateRoot(root, <StrictMode><Page /></StrictMode>)
