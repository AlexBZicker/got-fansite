/// <reference types="vite-react-ssg" />
import { copyFileSync } from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  server: { port: 5173, strictPort: true },
  // vite-react-ssg : /history/ -> history/index.html ; 404/index.html est aussi copié en 404.html (convention des hébergeurs statiques).
  ssgOptions: {
    dirStyle: 'nested',
    onFinished: (dir: string) => copyFileSync(path.join(dir, '404/index.html'), path.join(dir, '404.html')),
  },
})
