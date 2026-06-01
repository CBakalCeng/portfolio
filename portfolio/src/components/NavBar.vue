<template>
  <nav :class="[
    'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
    scrolled
      ? 'bg-[var(--color-surface)]/95 backdrop-blur-xl border-b border-[var(--color-border)] shadow-exec'
      : 'bg-transparent'
  ]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">

        <!-- Logo / Monogram -->
        <a href="#hero" @click.prevent="scrollTo('hero')" class="flex items-center gap-3 group">
          <div class="relative">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-[#08090f] font-bold text-sm shadow-gold-sm group-hover:shadow-gold-md transition-shadow duration-300">
              CB
            </div>
          </div>
          <div class="hidden sm:block">
            <span class="text-[var(--color-text)] font-semibold text-sm tracking-wide">Chetan Bakal</span>
            <span class="text-gold text-[10px] block font-mono font-semibold tracking-widest uppercase">CEng · PMP®</span>
          </div>
        </a>

        <!-- Desktop nav links -->
        <div class="hidden lg:flex items-center gap-1">
          <a v-for="link in navLinks" :key="link.id"
            :href="`#${link.id}`"
            @click.prevent="scrollTo(link.id)"
            :class="[
              'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300',
              activeSection === link.id
                ? 'text-gold'
                : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
            ]"
          >
            <span class="relative z-10">{{ link.label }}</span>
            <div :class="[
              'absolute inset-0 rounded-lg transition-all duration-300',
              activeSection === link.id ? 'bg-gold/10' : 'bg-transparent hover:bg-white/4'
            ]"></div>
            <span v-if="activeSection === link.id"
              class="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gold rounded-full">
            </span>
          </a>
        </div>

        <!-- Right actions -->
        <div class="flex items-center gap-3">
          <!-- Theme toggle -->
          <button @click="toggleTheme"
            class="w-9 h-9 rounded-lg border border-[var(--color-border)] flex items-center justify-center text-[var(--color-muted)] hover:border-gold hover:text-gold transition-all duration-300"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <i v-if="isDark" class="fa-solid fa-sun text-sm"></i>
            <i v-else class="fa-solid fa-moon text-sm"></i>
          </button>

          <!-- Connect CTA -->
          <a href="mailto:chetanbakal@hotmail.com"
            class="hidden lg:inline-flex btn-primary text-xs py-2.5 px-5">
            <i class="fa-solid fa-envelope"></i>
            Connect
          </a>

          <!-- Hamburger -->
          <button @click="mobileOpen = !mobileOpen"
            class="lg:hidden w-9 h-9 rounded-lg border border-[var(--color-border)] flex flex-col items-center justify-center gap-1.5 transition-all duration-300 hover:border-gold"
            aria-label="Toggle menu">
            <span :class="['w-5 h-0.5 bg-[var(--color-muted)] transition-all duration-300', mobileOpen ? 'rotate-45 translate-y-2' : '']"></span>
            <span :class="['w-5 h-0.5 bg-[var(--color-muted)] transition-all duration-300', mobileOpen ? 'opacity-0' : '']"></span>
            <span :class="['w-5 h-0.5 bg-[var(--color-muted)] transition-all duration-300', mobileOpen ? '-rotate-45 -translate-y-2' : '']"></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="mobile-menu">
      <div v-if="mobileOpen" class="lg:hidden bg-[var(--color-surface)]/98 backdrop-blur-xl border-b border-[var(--color-border)]">
        <div class="max-w-7xl mx-auto px-4 py-4 space-y-1">
          <a v-for="link in navLinks" :key="link.id"
            :href="`#${link.id}`"
            @click.prevent="scrollTo(link.id); mobileOpen = false"
            :class="[
              'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
              activeSection === link.id
                ? 'text-gold bg-gold/8 border border-gold/20'
                : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-white/4'
            ]">
            <i :class="`fa-solid ${link.icon} text-xs`"></i>
            {{ link.label }}
          </a>
          <div class="pt-2 border-t border-[var(--color-border)]">
            <a href="mailto:chetanbakal@hotmail.com"
              class="flex items-center justify-center gap-2 px-4 py-3 btn-primary text-sm w-full rounded-lg">
              <i class="fa-solid fa-envelope"></i> Connect
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUiStore } from '../stores/ui'

const uiStore = useUiStore()
const { isDark, activeSection } = storeToRefs(uiStore)
const { toggleTheme } = uiStore

const scrolled   = ref(false)
const mobileOpen = ref(false)

const navLinks = [
  { id: 'hero',            label: 'Home',        icon: 'fa-house' },
  { id: 'about',           label: 'Profile',     icon: 'fa-user' },
  { id: 'expertise',       label: 'Expertise',   icon: 'fa-chart-pie' },
  { id: 'experience',      label: 'Experience',  icon: 'fa-briefcase' },
  { id: 'certifications',    label: 'Credentials',      icon: 'fa-certificate' },
  { id: 'recommendations',  label: 'Endorsements',     icon: 'fa-comments' },
  { id: 'contact',          label: 'Contact',          icon: 'fa-envelope' },
]

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
  const sections = navLinks.map(l => l.id)
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i])
    if (el && window.scrollY >= el.offsetTop - 120) {
      activeSection.value = sections[i]
      break
    }
  }
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>
