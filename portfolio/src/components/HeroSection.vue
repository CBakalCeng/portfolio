<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden" style="background: var(--color-base);">

    <!-- Subtle radial accent blobs -->
    <div class="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-[0.06] pointer-events-none"
      style="background: radial-gradient(circle, #c9922a 0%, transparent 70%); transform: translate(30%, -30%);"></div>
    <div class="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.04] pointer-events-none"
      style="background: radial-gradient(circle, #3B82F6 0%, transparent 70%); transform: translate(-30%, 30%);"></div>

    <!-- Fine grid overlay -->
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="
      background-image: linear-gradient(var(--color-gold) 1px, transparent 1px),
                        linear-gradient(90deg, var(--color-gold) 1px, transparent 1px);
      background-size: 60px 60px;
    "></div>

    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
      <div class="grid lg:grid-cols-2 gap-16 items-center">

        <!-- Left: Text Content -->
        <div :class="['space-y-8', visible ? 'animate-fade-in-left' : 'opacity-0']">

          <!-- Status badge -->
          <div class="flex items-center gap-3">
            <span class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-semibold tracking-widest uppercase"
              style="border-color: rgba(201,146,42,0.35); color: var(--color-gold); background: rgba(201,146,42,0.06);">
              <span class="pulse-dot w-1.5 h-1.5"></span>
              {{ hero.status }}
            </span>
          </div>

          <!-- Name -->
          <div class="space-y-3">
            <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-[var(--color-text)]">
              {{ hero.name.split(' ')[0] }}<br/>
              <span class="gradient-gold">{{ hero.name.split(' ')[1] }}</span>
            </h1>
            <div class="flex items-center gap-3 mt-3">
              <div class="h-px w-12 bg-gradient-to-r from-gold to-transparent opacity-60"></div>
              <span class="font-mono text-xs font-semibold tracking-widest text-gold uppercase">{{ hero.credentials }}</span>
            </div>
          </div>

          <!-- Title -->
          <div class="space-y-1">
            <p class="text-[var(--color-text)] text-xl font-semibold">{{ hero.subtitle }}</p>
            <p class="text-base leading-relaxed max-w-lg" style="color: var(--color-body);">{{ hero.summary }}</p>
          </div>

          <!-- Domain badges -->
          <div class="flex flex-wrap gap-2">
            <span v-for="badge in hero.badges" :key="badge.label"
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-300 hover:border-gold/40"
              style="border-color: var(--color-border); color: var(--color-subtext); background: var(--color-panel);">
              <i :class="`fa-solid ${badge.icon} text-[10px]`" :style="{ color: badge.color }"></i>
              {{ badge.label }}
            </span>
          </div>

          <!-- CTAs -->
          <div class="flex flex-wrap gap-4 pt-2">
            <a href="#expertise" @click.prevent="scrollTo('expertise')" class="btn-primary">
              Explore Expertise
              <i class="fa-solid fa-arrow-right text-xs"></i>
            </a>
            <a href="#contact" @click.prevent="scrollTo('contact')" class="btn-outline">
              <i class="fa-solid fa-paper-plane text-xs"></i>
              Connect
            </a>
            <a :href="hero.resume" target="_blank" class="btn-outline">
              <i class="fa-solid fa-file-arrow-down text-xs"></i>
              Resume
            </a>
          </div>
        </div>

        <!-- Right: Profile Visual -->
        <div :class="['flex justify-center lg:justify-end', visible ? 'animate-fade-in-right' : 'opacity-0']">
          <div class="relative">

            <!-- Outer ambient glow -->
            <div class="absolute -inset-8 rounded-full opacity-20 blur-3xl" style="background: radial-gradient(circle, #c9922a, transparent);"></div>

            <!-- Orbit ring -->
            <div class="absolute -inset-12 rounded-full border opacity-20" style="border-color: var(--color-gold); animation: spin-slow 28s linear infinite;"></div>

            <!-- Floating credential badges — counter-rotate to keep text upright -->
            <div class="absolute -inset-10" style="animation: spin-slow 22s linear infinite;">
              <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" style="animation: spin-slow 22s linear infinite reverse;">
                <span class="px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-gold-sm" style="background: var(--color-panel); border: 1px solid rgba(201,146,42,0.4); color: #c9922a;">PMP®</span>
              </div>
              <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" style="animation: spin-slow 22s linear infinite reverse;">
                <span class="px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap" style="background: var(--color-panel); border: 1px solid rgba(59,130,246,0.4); color: #3B82F6;">ITIL® v4</span>
              </div>
              <div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2" style="animation: spin-slow 22s linear infinite reverse;">
                <span class="px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap" style="background: var(--color-panel); border: 1px solid rgba(16,185,129,0.4); color: #10B981;">CEng®</span>
              </div>
              <div class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" style="animation: spin-slow 22s linear infinite reverse;">
                <span class="px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap" style="background: var(--color-panel); border: 1px solid rgba(139,92,246,0.4); color: #8B5CF6;">LSS GB</span>
              </div>
            </div>

            <!-- Profile photo -->
            <div class="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full">
              <div class="absolute inset-0 rounded-full p-[3px]" style="background: linear-gradient(135deg, #c9922a, #e8b84b, #c9922a);">
                <div class="w-full h-full rounded-full overflow-hidden" style="background: var(--color-base);">
                  <img :src="hero.photo" alt="Chetan Bakal" class="w-full h-full object-cover object-center" loading="eager" />
                </div>
              </div>
            </div>

            <!-- KPI chips below photo -->
            <div class="mt-20 grid grid-cols-2 gap-3 max-w-xs mx-auto">
              <div v-for="kpi in hero.kpis" :key="kpi.label"
                class="metric-card px-4 py-3 text-center">
                <div class="font-mono-data text-lg font-bold gradient-gold">{{ kpi.value }}</div>
                <div class="text-[10px] uppercase tracking-wide mt-0.5" style="color: var(--color-muted);">{{ kpi.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hover:opacity-80 transition-opacity cursor-pointer" @click="scrollTo('about')">
        <span class="font-mono text-[10px] tracking-widest uppercase" style="color: var(--color-muted);">Scroll</span>
        <div class="w-5 h-8 rounded-full border flex items-start justify-center p-1" style="border-color: var(--color-border);">
          <div class="w-1 h-2 rounded-full bg-gold animate-bounce"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { hero } from '../data/portfolioContent'

const visible = ref(false)
const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
onMounted(() => setTimeout(() => { visible.value = true }, 80))
</script>

<style scoped>
.animate-fade-in-left {
  animation: fadeInLeft 0.9s cubic-bezier(0.22,1,0.36,1) forwards;
}
.animate-fade-in-right {
  animation: fadeInRight 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s both;
}
@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-36px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(36px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
</style>
