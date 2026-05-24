import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue(), viteSingleFile()],
  base: './',
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url))
    }
  },
  build: {
    outDir: 'docs',
    emptyOutDir: false
  }
})
