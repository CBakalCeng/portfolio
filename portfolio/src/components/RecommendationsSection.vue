<template>
  <section id="recommendations" class="py-24 lg:py-32 relative overflow-hidden" style="background: var(--color-surface);">
    <div class="absolute top-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04] pointer-events-none"
      style="background: radial-gradient(circle, #8B5CF6, transparent); transform: translate(-30%, -30%);"></div>
    <div class="absolute inset-0 opacity-[0.02] pointer-events-none" style="background-image: radial-gradient(var(--color-gold) 1px, transparent 1px); background-size: 28px 28px;"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="mb-16 text-center reveal" ref="headerEl">
        <p class="section-eyebrow justify-center mb-4 max-w-xs mx-auto">Testimonials</p>
        <h2 class="font-display text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-4">
          Recommendations &amp; <span class="gradient-gold italic">Endorsements</span>
        </h2>
        <p class="max-w-xl mx-auto text-base" style="color: var(--color-body);">
          What colleagues, clients, and collaborators have to say.
        </p>
        <div class="gold-divider mt-6"></div>
      </div>

      <!-- ── Approved recommendations grid ── -->
      <div v-if="recommendations.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <div v-for="rec in recommendations" :key="rec.id"
          class="exec-panel p-6 flex flex-col gap-4 hover:border-gold/30 transition-colors duration-300 hover:-translate-y-1 transition-transform">

          <!-- Quote mark -->
          <div class="text-4xl leading-none font-display" style="color: var(--color-gold); opacity: 0.35;">"</div>

          <!-- Testimonial text -->
          <p class="text-sm leading-relaxed flex-1" style="color: var(--color-body);">{{ rec.testimonial_text }}</p>

          <!-- Author -->
          <div class="flex items-center gap-3 pt-3 border-t" style="border-color: var(--color-border);">
            <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 text-[#08090f]"
              style="background: linear-gradient(135deg, #c9922a, #e8b84b);">
              {{ initials(rec.author_name) }}
            </div>
            <div>
              <p class="text-[var(--color-text)] font-semibold text-sm">{{ rec.author_name }}</p>
              <p class="text-xs" style="color: var(--color-muted);">{{ rec.author_title }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state while loading or no approved recs yet -->
      <div v-else-if="!loading" class="text-center py-12 mb-16">
        <div class="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style="background: rgba(201,146,42,0.1);">
          <i class="fa-solid fa-comments text-2xl" style="color: var(--color-gold);"></i>
        </div>
        <p class="font-semibold text-[var(--color-text)] mb-1">No endorsements yet</p>
        <p class="text-sm" style="color: var(--color-muted);">Be the first to leave a recommendation below.</p>
      </div>

      <!-- Loading skeleton -->
      <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <div v-for="n in 3" :key="n" class="exec-panel p-6 space-y-3 animate-pulse">
          <div class="h-3 rounded" style="background: var(--color-border); width: 75%;"></div>
          <div class="h-3 rounded" style="background: var(--color-border); width: 90%;"></div>
          <div class="h-3 rounded" style="background: var(--color-border); width: 60%;"></div>
          <div class="flex items-center gap-3 pt-3 border-t" style="border-color: var(--color-border);">
            <div class="w-10 h-10 rounded-full" style="background: var(--color-border);"></div>
            <div class="space-y-1.5 flex-1">
              <div class="h-3 rounded" style="background: var(--color-border); width: 50%;"></div>
              <div class="h-2 rounded" style="background: var(--color-border); width: 70%;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Submit a recommendation ── -->
      <div class="max-w-2xl mx-auto reveal" ref="formEl">
        <div class="exec-panel p-8">
          <h3 class="font-display text-xl font-semibold text-[var(--color-text)] mb-2 flex items-center gap-2">
            <i class="fa-solid fa-pen-to-square text-gold text-sm"></i>
            Leave a Recommendation
          </h3>
          <p class="text-sm mb-6" style="color: var(--color-body);">
            Submissions are reviewed before being published. Thank you for your kind words.
          </p>

          <form @submit.prevent="handleSubmit" class="space-y-5" novalidate>
            <div class="grid sm:grid-cols-2 gap-5">
              <div>
                <label class="block text-[10px] uppercase tracking-widest font-semibold mb-2" style="color: var(--color-muted);">Your Name *</label>
                <input v-model="form.author_name" type="text" placeholder="Jane Smith" required class="rec-input w-full" />
              </div>
              <div>
                <label class="block text-[10px] uppercase tracking-widest font-semibold mb-2" style="color: var(--color-muted);">Your Title *</label>
                <input v-model="form.author_title" type="text" placeholder="Senior Director, ACME Corp" required class="rec-input w-full" />
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-5">
              <div>
                <label class="block text-[10px] uppercase tracking-widest font-semibold mb-2" style="color: var(--color-muted);">Company / Organisation</label>
                <input v-model="form.company" type="text" placeholder="Organisation name" class="rec-input w-full" />
              </div>
              <div>
                <label class="block text-[10px] uppercase tracking-widest font-semibold mb-2" style="color: var(--color-muted);">Your Relationship</label>
                <select v-model="form.relationship" class="rec-input w-full">
                  <option value="">Select relationship…</option>
                  <option value="Direct Manager">Direct Manager</option>
                  <option value="Colleague">Colleague</option>
                  <option value="Client">Client</option>
                  <option value="Direct Report">Direct Report</option>
                  <option value="Business Partner">Business Partner</option>
                  <option value="Mentor">Mentor</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-[10px] uppercase tracking-widest font-semibold mb-2" style="color: var(--color-muted);">Your Recommendation *</label>
              <textarea v-model="form.testimonial_text" rows="5" required
                placeholder="Share your experience working with Chetan…"
                class="rec-input w-full resize-none"></textarea>
              <p class="text-[10px] mt-1.5" style="color: var(--color-muted);">{{ form.testimonial_text.length }}/600 characters</p>
            </div>

            <!-- Status -->
            <Transition name="fade">
              <div v-if="recStatus === 'success'"
                class="flex items-center gap-3 p-4 rounded-xl text-sm"
                style="background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25); color: #10B981;">
                <i class="fa-solid fa-circle-check text-base"></i>
                Thank you! Your recommendation has been submitted and will appear once approved.
              </div>
              <div v-else-if="recStatus === 'error'"
                class="flex items-center gap-3 p-4 rounded-xl text-sm"
                style="background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25); color: #EF4444;">
                <i class="fa-solid fa-circle-exclamation text-base"></i>
                Submission failed. Please try again or reach out directly on LinkedIn.
              </div>
            </Transition>

            <button type="submit" :disabled="submitting || !supabaseReady" class="btn-primary w-full justify-center py-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
              <span v-if="!submitting" class="flex items-center gap-2">
                <i class="fa-solid fa-paper-plane text-xs"></i>
                Submit Recommendation
              </span>
              <span v-else class="flex items-center gap-2">
                <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Submitting…
              </span>
            </button>

            <p v-if="!supabaseReady" class="text-xs text-center" style="color: var(--color-muted);">
              <i class="fa-solid fa-circle-info mr-1"></i>
              Recommendation submission requires database connection.
            </p>
          </form>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { supabase } from '../services/supabase'

const headerEl = ref(null)
const formEl   = ref(null)

const loading      = ref(true)
const submitting   = ref(false)
const recStatus    = ref('')   // '' | 'success' | 'error'
const recommendations = ref([])

const supabaseReady = computed(() => !!supabase)

const form = reactive({
  author_name:      '',
  author_title:     '',
  company:          '',
  relationship:     '',
  testimonial_text: '',
})

const initials = (name) =>
  name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()

// Fetch approved recommendations
const fetchRecs = async () => {
  loading.value = true
  if (!supabase) { loading.value = false; return }
  const { data, error } = await supabase
    .from('portfolio_recommendations')
    .select('id, author_name, author_title, testimonial_text, created_at')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

  if (!error && data) recommendations.value = data
  loading.value = false
}

// Submit a new recommendation
const handleSubmit = async () => {
  if (!supabase) return
  if (!form.author_name || !form.author_title || !form.testimonial_text) return

  submitting.value = true
  recStatus.value = ''

  // Merge company + relationship into author_title so we only ever write
  // to the 3 guaranteed columns (author_name, author_title, testimonial_text).
  const parts = [form.author_title, form.company, form.relationship].filter(Boolean)
  const { error } = await supabase.from('portfolio_recommendations').insert({
    author_name:      form.author_name,
    author_title:     parts.join(' · '),
    testimonial_text: form.testimonial_text,
  })

  if (error) {
    console.error('Recommendation submit error:', error)
    recStatus.value = 'error'
  } else {
    recStatus.value = 'success'
    Object.assign(form, { author_name: '', author_title: '', company: '', relationship: '', testimonial_text: '' })
  }

  submitting.value = false
  setTimeout(() => { recStatus.value = '' }, 7000)
}

const observe = (el) => {
  if (!el) return
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
  }, { threshold: 0.1 })
  obs.observe(el)
}

onMounted(() => {
  fetchRecs()
  observe(headerEl.value)
  observe(formEl.value)
})
</script>

<style scoped>
.rec-input {
  background: var(--color-panel);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 12px 16px;
  color: var(--color-text);
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  transition: border-color 0.3s;
  outline: none;
}
.rec-input::placeholder { color: var(--color-muted); opacity: 0.6; }
.rec-input:focus { border-color: var(--color-gold); }
select.rec-input { cursor: pointer; }
select.rec-input option { background: var(--color-panel); color: var(--color-text); }
</style>
