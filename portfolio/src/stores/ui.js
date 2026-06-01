import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  // ── Dark / Light mode ──────────────────────────────────────────────
  const saved = localStorage.getItem('theme')
  const isDark = ref(saved ? saved === 'dark' : true)

  const applyTheme = (dark) => {
    document.documentElement.classList.toggle('dark', dark)
  }

  applyTheme(isDark.value)

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  watch(isDark, (val) => {
    applyTheme(val)
    localStorage.setItem('theme', val ? 'dark' : 'light')
  })

  // ── Active nav section ─────────────────────────────────────────────
  const activeSection = ref('hero')

  return { isDark, toggleTheme, activeSection }
})
