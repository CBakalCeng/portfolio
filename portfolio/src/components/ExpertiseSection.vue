<template>
  <section id="expertise" class="py-24 lg:py-32 relative overflow-hidden" style="background: var(--color-base);">
    <div class="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.04] pointer-events-none"
      style="background: radial-gradient(circle, #c9922a, transparent); transform: translate(40%, -40%);"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="mb-16 text-center reveal" ref="headerEl">
        <p class="section-eyebrow justify-center mb-4 max-w-xs mx-auto">Core Competencies</p>
        <h2 class="font-display text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-4">
          Areas of <span class="gradient-gold italic">Excellence</span>
        </h2>
        <p class="max-w-xl mx-auto text-base" style="color: var(--color-body);">
          A decade of technical and leadership depth across global infrastructure and enterprise program management.
        </p>
        <div class="gold-divider mt-6"></div>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 items-start mb-16">

        <!-- Left: Radar chart -->
        <div class="exec-panel p-8 reveal" ref="chartEl">
          <h3 class="text-[var(--color-text)] font-semibold text-base mb-6 flex items-center gap-2">
            <i class="fa-solid fa-circle-nodes text-gold text-sm"></i>
            Competency Radar
          </h3>
          <div class="relative h-72">
            <Radar v-if="chartReady" :data="radarData" :options="radarOptions" />
          </div>
          <p class="text-[10px] uppercase tracking-widest text-center mt-4" style="color: var(--color-muted);">
            <span class="inline-flex items-center gap-1.5"><span class="w-3 h-0.5 rounded inline-block bg-gold"></span>Profile</span>
            &nbsp;·&nbsp;
            <span class="inline-flex items-center gap-1.5"><span class="w-3 h-0.5 rounded inline-block bg-blue-400 opacity-50"></span>Industry Avg</span>
          </p>
        </div>

        <!-- Right: Proficiency bars -->
        <div class="space-y-5 reveal" ref="barsEl" style="transition-delay:100ms">
          <h3 class="text-[var(--color-text)] font-semibold text-base flex items-center gap-2 mb-6">
            <i class="fa-solid fa-bars-progress text-gold text-sm"></i>
            Proficiency Index
          </h3>
          <div v-for="bar in expertise.proficiencyBars" :key="bar.name" class="space-y-1.5">
            <div class="flex justify-between items-center">
              <span class="text-[var(--color-text)] text-sm font-medium">{{ bar.name }}</span>
              <span class="font-mono-data text-xs font-semibold" :style="{ color: bar.color }">{{ bar.pct }}%</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" :style="{ background: bar.color, width: barsVisible ? bar.pct + '%' : '0%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Competency groups grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div v-for="(group, i) in expertise.competencyGroups" :key="group.id"
          :ref="el => { if(el) groupEls[i] = el }"
          class="exec-panel p-6 reveal group hover:border-gold/40 transition-colors duration-300"
          :style="{ transitionDelay: `${i * 60}ms` }">

          <!-- Group header -->
          <div class="flex items-center gap-3 mb-4">
            <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" :style="{ background: group.color + '18' }">
              <i :class="`fa-solid ${group.icon} text-sm`" :style="{ color: group.color }"></i>
            </div>
            <h4 class="text-[var(--color-text)] text-sm font-semibold leading-tight">{{ group.name }}</h4>
          </div>

          <!-- Skills list -->
          <div class="flex flex-wrap gap-1.5">
            <span v-for="skill in group.skills" :key="skill" class="tag-pill">{{ skill }}</span>
          </div>

          <!-- Bottom accent bar -->
          <div class="mt-4 h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500" :style="{ background: group.color }"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { expertise } from '../data/portfolioContent'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const headerEl   = ref(null)
const chartEl    = ref(null)
const barsEl     = ref(null)
const groupEls   = ref([])
const barsVisible  = ref(false)
const chartReady   = ref(false)

const radarData = computed(() => ({
  labels: expertise.radarLabels,
  datasets: [
    {
      label: 'Profile',
      data: expertise.radarValues,
      backgroundColor: 'rgba(201,146,42,0.15)',
      borderColor: '#c9922a',
      borderWidth: 2,
      pointBackgroundColor: '#e8b84b',
      pointBorderColor: '#c9922a',
      pointRadius: 4,
      pointHoverRadius: 6,
    },
    {
      label: 'Industry Avg',
      data: Array(expertise.radarLabels.length).fill(expertise.benchmarkValue),
      backgroundColor: 'rgba(59,130,246,0.05)',
      borderColor: 'rgba(59,130,246,0.35)',
      borderWidth: 1.5,
      borderDash: [5, 5],
      pointRadius: 0,
    },
  ],
}))

const radarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      min: 0, max: 100,
      ticks: { stepSize: 20, display: false },
      grid:  { color: 'rgba(201,146,42,0.08)' },
      angleLines: { color: 'rgba(201,146,42,0.08)' },
      pointLabels: {
        color: '#8899aa',
        font: { family: "'Inter', sans-serif", size: 11 },
      },
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#161b27',
      borderColor: '#1e2a3a',
      borderWidth: 1,
      titleColor: '#dde3ee',
      bodyColor: '#8899aa',
      padding: 10,
    },
  },
}

const observe = (el, cb) => {
  if (!el) return
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { if (cb) cb(); else el.classList.add('visible'); obs.disconnect() }
  }, { threshold: 0.12 })
  obs.observe(el)
}

onMounted(() => {
  observe(headerEl.value, () => headerEl.value?.classList.add('visible'))
  observe(chartEl.value,  () => { chartEl.value?.classList.add('visible'); chartReady.value = true })
  observe(barsEl.value,   () => { barsEl.value?.classList.add('visible'); barsVisible.value = true })
  setTimeout(() => groupEls.value.forEach(el => observe(el)), 100)
})
</script>
