<template>
  <section id="about" class="py-24 lg:py-32 relative overflow-hidden" style="background: var(--color-surface);">
    <div class="absolute inset-0 opacity-[0.025] pointer-events-none" style="background-image: radial-gradient(var(--color-gold) 1px, transparent 1px); background-size: 28px 28px;"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="mb-16 text-center reveal" ref="headerEl">
        <p class="section-eyebrow justify-center mb-4 max-w-xs mx-auto">Executive Profile</p>
        <h2 class="font-display text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-4">
          Who I <span class="gradient-gold italic">Am</span>
        </h2>
        <div class="gold-divider mt-6"></div>
      </div>

      <div class="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

        <!-- Left: Narrative -->
        <div class="lg:col-span-3 space-y-6">
          <div class="space-y-5 reveal" ref="textEl" style="transition-delay:80ms">
            <p v-for="(para, i) in about.paragraphs" :key="i"
              class="leading-relaxed"
              :class="i === 0 ? 'text-lg' : 'text-base'"
              :style="{ color: i === 0 ? 'var(--color-text)' : 'var(--color-body)' }"
              v-html="para">
            </p>
          </div>

          <!-- Highlight cards -->
          <div class="grid sm:grid-cols-2 gap-4 pt-4 reveal" ref="cardsEl" style="transition-delay:160ms">
            <div v-for="h in about.highlights" :key="h.title" class="metric-card p-4 group cursor-default">
              <div class="flex items-start gap-3">
                <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  :style="{ background: h.color + '18' }">
                  <i :class="`fa-solid ${h.icon} text-sm`" :style="{ color: h.color }"></i>
                </div>
                <div>
                  <h4 class="text-[var(--color-text)] text-sm font-semibold mb-1">{{ h.title }}</h4>
                  <p class="text-xs leading-relaxed" style="color: var(--color-body);">{{ h.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Stats + Quick Info -->
        <div class="lg:col-span-2 space-y-5">

          <!-- Stats grid -->
          <div class="grid grid-cols-2 gap-4 reveal" ref="statsEl" style="transition-delay:120ms">
            <div v-for="s in stats" :key="s.label" class="metric-card p-5 text-center group relative overflow-hidden">
              <div class="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              <div class="relative">
                <div class="font-mono-data text-3xl font-bold gradient-gold mb-1">{{ s.value }}</div>
                <div class="text-[var(--color-muted)] text-xs leading-snug">{{ s.label }}</div>
              </div>
            </div>
          </div>

          <!-- Quick info card -->
          <div class="exec-panel p-6 space-y-4 reveal" ref="infoEl" style="transition-delay:200ms">
            <h3 class="text-[var(--color-text)] font-semibold text-sm pb-3 mb-1 border-b" style="border-color: var(--color-border);">Quick Information</h3>
            <div v-for="info in about.quickInfo" :key="info.label" class="flex items-center gap-3">
              <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style="background: rgba(201,146,42,0.1);">
                <i :class="`fa-solid ${info.icon} text-[10px]`" style="color: var(--color-gold)"></i>
              </div>
              <div>
                <p class="text-[10px] uppercase tracking-wider" style="color: var(--color-muted);">{{ info.label }}</p>
                <p class="text-[var(--color-text)] text-sm font-medium">{{ info.value }}</p>
              </div>
            </div>
            <!-- Social row -->
            <div class="pt-3 border-t flex gap-3" style="border-color: var(--color-border);">
              <a href="https://linkedin.com/in/chetanbakal" target="_blank" rel="noopener"
                class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300 hover:scale-105"
                style="border: 1px solid rgba(59,130,246,0.35); color: #3B82F6; background: rgba(59,130,246,0.05);">
                <i class="fa-brands fa-linkedin text-sm"></i> LinkedIn
              </a>
              <a href="mailto:chetanbakal@hotmail.com"
                class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300 hover:scale-105"
                style="border: 1px solid rgba(201,146,42,0.35); color: var(--color-gold); background: rgba(201,146,42,0.05);">
                <i class="fa-solid fa-envelope text-sm"></i> Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { about } from '../data/portfolioContent'

const headerEl = ref(null)
const textEl   = ref(null)
const cardsEl  = ref(null)
const statsEl  = ref(null)
const infoEl   = ref(null)

const stats = [
  { value: '10+',     label: 'Years of Experience' },
  { value: '₹3K Cr+', label: 'Portfolio Value Managed' },
  { value: '150+',    label: 'Projects Overseen' },
  { value: '3',       label: 'Global Regions' },
]

const observe = (el) => {
  if (!el) return
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
  }, { threshold: 0.12 })
  obs.observe(el)
}

onMounted(() => [headerEl, textEl, cardsEl, statsEl, infoEl].forEach(r => observe(r.value)))
</script>
