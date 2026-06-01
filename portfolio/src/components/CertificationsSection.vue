<template>
  <section id="certifications" class="py-24 lg:py-32 relative overflow-hidden" style="background: var(--color-base);">
    <div class="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.04] pointer-events-none"
      style="background: radial-gradient(circle, #8B5CF6, transparent); transform: translate(30%, 30%);"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="mb-16 text-center reveal" ref="headerEl">
        <p class="section-eyebrow justify-center mb-4 max-w-xs mx-auto">Credentials</p>
        <h2 class="font-display text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-4">
          Certifications &amp; <span class="gradient-gold italic">Honours</span>
        </h2>
        <p class="max-w-xl mx-auto text-base" style="color: var(--color-body);">
          Internationally recognised qualifications across project management, engineering, risk, and quality.
        </p>
        <div class="gold-divider mt-6"></div>
      </div>

      <!-- Featured certifications grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div v-for="(cert, i) in certifications.featured" :key="cert.title"
          :ref="el => { if(el) certEls[i] = el }"
          class="exec-panel overflow-hidden reveal group hover:border-gold/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-sm"
          :style="{ transitionDelay: `${i * 60}ms` }">

          <!-- Gradient accent bar -->
          <div class="h-1 w-full" :style="{ background: `linear-gradient(90deg, ${cert.color}, transparent)` }"></div>

          <!-- Cert image -->
          <div class="h-44 overflow-hidden relative" style="background: var(--color-panel);">
            <img :src="cert.img" :alt="cert.title" class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent"></div>
          </div>

          <!-- Info -->
          <div class="p-5">
            <h3 class="text-[var(--color-text)] font-semibold text-sm leading-snug mb-1">{{ cert.title }}</h3>
            <p class="text-sm font-medium mb-1" :style="{ color: cert.color }">{{ cert.issuer }}</p>
            <p class="text-xs mb-3" style="color: var(--color-muted);">{{ cert.date }}</p>
            <p v-if="cert.credentialId" class="font-mono-data text-xs mb-3" style="color: var(--color-muted);">ID: {{ cert.credentialId }}</p>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
              style="background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25); color: #10B981;">
              <span class="pulse-dot w-1.5 h-1.5"></span>
              {{ cert.active ? 'Active' : 'Lifetime' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Additional credentials -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 reveal" ref="addEl">
        <div v-for="cred in certifications.additional" :key="cred.title"
          class="exec-panel p-5 group hover:border-gold/30 transition-colors duration-300 relative overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" :style="{ background: `linear-gradient(90deg, ${cred.color}, transparent)` }"></div>
          <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3" :style="{ background: cred.color + '18' }">
            <i :class="`fa-solid ${cred.icon} text-sm`" :style="{ color: cred.color }"></i>
          </div>
          <h4 class="text-[var(--color-text)] font-semibold text-sm mb-1 leading-snug">{{ cred.title }}</h4>
          <p class="text-xs font-medium mb-1" :style="{ color: cred.color }">{{ cred.issuer }}</p>
          <p class="text-xs" style="color: var(--color-muted);">{{ cred.date }}</p>
        </div>
      </div>

      <!-- Awards & Honours -->
      <div class="reveal" ref="awardsEl">
        <h3 class="text-center font-display text-2xl font-semibold text-[var(--color-text)] mb-10">
          Awards &amp; <span class="gradient-gold italic">Recognitions</span>
        </h3>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="award in certifications.awards" :key="award.title"
            class="exec-panel p-6 text-center group hover:border-gold/30 transition-colors duration-300 hover:-translate-y-1 transition-transform">
            <div class="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" :style="{ background: award.color + '18' }">
              <i :class="`fa-solid ${award.icon} text-xl`" :style="{ color: award.color }"></i>
            </div>
            <h4 class="text-[var(--color-text)] font-semibold text-sm mb-1 leading-snug">{{ award.title }}</h4>
            <p class="text-xs font-medium mb-2" :style="{ color: award.color }">{{ award.by }}</p>
            <p class="text-xs leading-relaxed" style="color: var(--color-body);">{{ award.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { certifications } from '../data/portfolioContent'

const headerEl = ref(null)
const addEl    = ref(null)
const awardsEl = ref(null)
const certEls  = ref([])

const observe = (el) => {
  if (!el) return
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
  }, { threshold: 0.08 })
  obs.observe(el)
}

onMounted(() => {
  observe(headerEl.value)
  observe(addEl.value)
  observe(awardsEl.value)
  setTimeout(() => certEls.value.forEach(el => observe(el)), 100)
})
</script>
