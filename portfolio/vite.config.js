import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/portfolio/',   // ← e.g. '/portfolio/' or '/chetan-bakal/'
})
