<template>
  <section id="experience" class="py-24 lg:py-32 relative overflow-hidden" style="background: var(--color-surface);">
    <div class="absolute inset-0 opacity-[0.02] pointer-events-none" style="background-image: radial-gradient(var(--color-gold) 1px, transparent 1px); background-size: 32px 32px;"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="mb-16 text-center reveal" ref="headerEl">
        <p class="section-eyebrow justify-center mb-4 max-w-xs mx-auto">Career Trajectory</p>
        <h2 class="font-display text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-4">
          Professional <span class="gradient-gold italic">Journey</span>
        </h2>
        <p class="max-w-xl mx-auto text-base" style="color: var(--color-body);">
          From site engineer to Global PMO — a decade of progressive leadership across high-value infrastructure programs.
        </p>
        <div class="gold-divider mt-6"></div>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Vertical rail (desktop) -->
        <div class="hidden lg:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 timeline-rail rounded-full"></div>

        <div class="space-y-10 lg:space-y-12">
          <div v-for="(job, i) in experiences" :key="job.id"
            :ref="el => { if(el) itemEls[i] = el }"
            class="reveal relative flex flex-col lg:flex-row gap-6 lg:gap-12 items-start"
            :class="i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'"
            :style="{ transitionDelay: `${i * 60}ms` }">

            <!-- Card -->
            <div class="flex-1 max-w-xl">
              <div class="exec-panel p-6 group relative overflow-hidden hover:border-gold/30 transition-colors duration-300">
                <!-- Top accent bar -->
                <div class="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" :style="{ background: `linear-gradient(90deg, ${job.color}, transparent)` }"></div>
                <!-- Shimmer on hover -->
                <div class="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                <div class="relative">
                  <!-- Header row -->
                  <div class="flex items-start justify-between gap-4 mb-3">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                        :style="{ background: job.color + '18' }">
                        <i :class="`fa-solid ${job.icon} text-sm`" :style="{ color: job.color }"></i>
                      </div>
                      <div>
                        <h3 class="text-[var(--color-text)] font-semibold text-base leading-tight">{{ job.role }}</h3>
                        <p class="text-sm font-medium" :style="{ color: job.color }">{{ job.company }}</p>
                      </div>
                    </div>
                    <span v-if="job.current"
                      class="shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"
                      style="background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); color: #10B981;">
                      <span class="pulse-dot w-1.5 h-1.5"></span>
                      Current
                    </span>
                  </div>

                  <!-- Meta -->
                  <div class="flex flex-wrap items-center gap-4 mb-4">
                    <span class="inline-flex items-center gap-1.5 text-xs" style="color: var(--color-muted);">
                      <i class="fa-solid fa-calendar text-[10px]"></i>{{ job.period }}
                    </span>
                    <span class="inline-flex items-center gap-1.5 text-xs" style="color: var(--color-muted);">
                      <i class="fa-solid fa-location-dot text-[10px]"></i>{{ job.location }}
                    </span>
                    <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium"
                      :style="{ background: job.color + '14', color: job.color }">
                      {{ job.type }}
                    </span>
                  </div>

                  <!-- Bullets -->
                  <ul class="space-y-2 mb-4">
                    <li v-for="point in job.bullets" :key="point" class="flex items-start gap-2 text-sm leading-relaxed" style="color: var(--color-body);">
                      <span class="mt-2 w-1 h-1 rounded-full shrink-0" :style="{ background: job.color }"></span>
                      {{ point }}
                    </li>
                  </ul>

                  <!-- Tags -->
                  <div class="flex flex-wrap gap-1.5">
                    <span v-for="tag in job.tags" :key="tag" class="tag-pill">{{ tag }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Centre timeline node (desktop) -->
            <div class="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-8 flex-col items-center z-10">
              <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center shadow-gold-sm" :style="{ borderColor: job.color, background: 'var(--color-base)' }">
                <div class="w-2 h-2 rounded-full" :style="{ background: job.color }"></div>
              </div>
              <div class="mt-2 px-3 py-1 rounded-full text-xs font-mono-data font-semibold whitespace-nowrap"
                style="background: var(--color-panel); border: 1px solid var(--color-border); color: var(--color-muted);">
                {{ job.year }}
              </div>
            </div>

            <!-- Spacer for alternating layout -->
            <div class="flex-1 max-w-xl hidden lg:block"></div>
          </div>
        </div>
      </div>

      <!-- Education -->
      <div class="mt-20 reveal" ref="eduEl">
        <h3 class="text-center font-display text-2xl font-semibold text-[var(--color-text)] mb-10">
          Academic <span class="gradient-gold italic">Foundation</span>
        </h3>
        <div class="grid md:grid-cols-3 gap-5">
          <div v-for="edu in education" :key="edu.degree" class="exec-panel p-6 group hover:border-gold/30 transition-colors duration-300 relative overflow-hidden">
            <div class="absolute top-0 left-0 right-0 h-0.5" :style="{ background: `linear-gradient(90deg, ${edu.color}, transparent)` }"></div>
            <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-4" :style="{ background: edu.color + '18' }">
              <i :class="`fa-solid ${edu.icon} text-sm`" :style="{ color: edu.color }"></i>
            </div>
            <h4 class="text-[var(--color-text)] font-semibold text-sm mb-1 leading-snug">{{ edu.degree }}</h4>
            <p class="text-sm font-medium mb-1" :style="{ color: edu.color }">{{ edu.institution }}</p>
            <p class="text-xs mb-3" style="color: var(--color-muted);">{{ edu.period }} · {{ edu.grade }}</p>
            <p class="text-xs leading-relaxed" style="color: var(--color-body);">{{ edu.detail }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { experiences, education } from '../data/portfolioContent'

const headerEl = ref(null)
const eduEl    = ref(null)
const itemEls  = ref([])

const observe = (el) => {
  if (!el) return
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
  }, { threshold: 0.08 })
  obs.observe(el)
}

onMounted(() => {
  observe(headerEl.value)
  observe(eduEl.value)
  setTimeout(() => itemEls.value.forEach(el => observe(el)), 100)
})
</script>
