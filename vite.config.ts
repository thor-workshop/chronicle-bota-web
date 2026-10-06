import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// GitHub Pages 기본 주소(thor-workshop.github.io/chronicle-bota-web/)에서 연다.
// 도메인을 사면 base 를 '/' 로 바꾸고 public/CNAME 을 더한다.
export default defineConfig({
  base: '/chronicle-bota-web/',
  plugins: [react()],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        privacy: resolve(import.meta.dirname, 'privacy/index.html'),
      },
    },
  },
})
