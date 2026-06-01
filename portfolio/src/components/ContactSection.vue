<template>
  <section id="contact" class="py-24 lg:py-32 relative overflow-hidden" style="background: var(--color-surface);">
    <div class="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.04] pointer-events-none"
      style="background: radial-gradient(circle, #c9922a, transparent); transform: translate(30%, -30%);"></div>
    <div class="absolute inset-0 opacity-[0.02] pointer-events-none" style="background-image: radial-gradient(var(--color-gold) 1px, transparent 1px); background-size: 28px 28px;"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="mb-16 text-center reveal" ref="headerEl">
        <p class="section-eyebrow justify-center mb-4 max-w-xs mx-auto">Get in Touch</p>
        <h2 class="font-display text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-4">
          Let's <span class="gradient-gold italic">Connect</span>
        </h2>
        <p class="max-w-xl mx-auto text-base leading-relaxed" style="color: var(--color-body);">
          Open to senior leadership opportunities, advisory roles, and strategic collaborations in global infrastructure and PMO.
        </p>
        <div class="gold-divider mt-6"></div>
      </div>

      <div class="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">

        <!-- Left: Contact info -->
        <div class="lg:col-span-2 space-y-5 reveal" ref="infoEl" style="transition-delay:80ms">
          <div class="exec-panel p-6 space-y-5">
            <h3 class="text-[var(--color-text)] font-semibold text-base pb-3 border-b" style="border-color: var(--color-border);">Contact Details</h3>
            <a v-for="item in contactItems" :key="item.label" :href="item.href" :target="item.external ? '_blank' : undefined"
              class="flex items-center gap-4 group hover:opacity-90 transition-all duration-300">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110" :style="{ background: item.color + '18' }">
                <i :class="`fa-solid ${item.icon} text-sm`" :style="{ color: item.color }"></i>
              </div>
              <div>
                <p class="text-[10px] uppercase tracking-wider" style="color: var(--color-muted);">{{ item.label }}</p>
                <p class="text-[var(--color-text)] text-sm font-medium group-hover:text-gold transition-colors duration-300">{{ item.value }}</p>
              </div>
            </a>
          </div>

          <!-- Network links -->
          <div class="exec-panel p-6 space-y-4">
            <h3 class="text-[var(--color-text)] font-semibold text-base pb-3 border-b" style="border-color: var(--color-border);">Professional Networks</h3>
            <a href="https://linkedin.com/in/chetanbakal" target="_blank" rel="noopener"
              class="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group"
              style="border: 1px solid rgba(59,130,246,0.2); background: rgba(59,130,246,0.04);"
              @mouseenter="e => e.currentTarget.style.borderColor='rgba(59,130,246,0.5)'"
              @mouseleave="e => e.currentTarget.style.borderColor='rgba(59,130,246,0.2)'">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style="background: rgba(59,130,246,0.15);">
                <i class="fa-brands fa-linkedin text-blue-400 text-base"></i>
              </div>
              <div class="flex-1">
                <p class="text-[var(--color-text)] font-semibold text-sm">LinkedIn Profile</p>
                <p class="text-xs" style="color: var(--color-muted);">linkedin.com/in/chetanbakal</p>
              </div>
              <i class="fa-solid fa-arrow-up-right-from-square text-xs group-hover:text-blue-400 transition-colors" style="color: var(--color-muted);"></i>
            </a>

            <a href="/resume.pdf" target="_blank"
              class="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group"
              style="border: 1px solid rgba(201,146,42,0.2); background: rgba(201,146,42,0.04);"
              @mouseenter="e => e.currentTarget.style.borderColor='rgba(201,146,42,0.5)'"
              @mouseleave="e => e.currentTarget.style.borderColor='rgba(201,146,42,0.2)'">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style="background: rgba(201,146,42,0.15);">
                <i class="fa-solid fa-file-arrow-down text-gold text-base"></i>
              </div>
              <div class="flex-1">
                <p class="text-[var(--color-text)] font-semibold text-sm">Download Executive CV</p>
                <p class="text-xs" style="color: var(--color-muted);">Latest resume · PDF</p>
              </div>
              <i class="fa-solid fa-download text-xs group-hover:text-gold transition-colors" style="color: var(--color-muted);"></i>
            </a>
          </div>
        </div>

        <!-- Right: Contact Form -->
        <div class="lg:col-span-3 reveal" ref="formEl" style="transition-delay:160ms">
          <div class="exec-panel p-8">
            <h3 class="text-[var(--color-text)] font-semibold text-xl mb-6 flex items-center gap-2">
              <i class="fa-solid fa-paper-plane text-gold text-sm"></i>
              Send a Message
            </h3>

            <form @submit.prevent="handleSubmit" class="space-y-5" novalidate>
              <div class="grid sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-[10px] uppercase tracking-widest font-semibold mb-2" style="color: var(--color-muted);">Your Name *</label>
                  <input v-model="form.name" type="text" placeholder="John Smith" required
                    class="form-input w-full" />
                </div>
                <div>
                  <label class="block text-[10px] uppercase tracking-widest font-semibold mb-2" style="color: var(--color-muted);">Your Email *</label>
                  <input v-model="form.email" type="email" placeholder="john@company.com" required
                    class="form-input w-full" />
                </div>
              </div>

              <div>
                <label class="block text-[10px] uppercase tracking-widest font-semibold mb-2" style="color: var(--color-muted);">Organisation</label>
                <input v-model="form.organization" type="text" placeholder="Organisation / Company"
                  class="form-input w-full" />
              </div>

              <div>
                <label class="block text-[10px] uppercase tracking-widest font-semibold mb-2" style="color: var(--color-muted);">Subject *</label>
                <input v-model="form.subject" type="text" placeholder="Senior PMO Director Opportunity" required
                  class="form-input w-full" />
              </div>

              <div>
                <label class="block text-[10px] uppercase tracking-widest font-semibold mb-2" style="color: var(--color-muted);">Message *</label>
                <textarea v-model="form.message" rows="5" placeholder="Tell me about the opportunity or how I can help..." required
                  class="form-input w-full resize-none"></textarea>
              </div>

              <!-- Status messages -->
              <Transition name="fade">
                <div v-if="status === 'success'"
                  class="flex items-center gap-3 p-4 rounded-xl text-sm"
                  style="background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25); color: #10B981;">
                  <i class="fa-solid fa-circle-check text-base"></i>
                  Message sent successfully! I'll get back to you within 24 hours.
                </div>
                <div v-else-if="status === 'error'"
                  class="flex items-center gap-3 p-4 rounded-xl text-sm"
                  style="background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25); color: #EF4444;">
                  <i class="fa-solid fa-circle-exclamation text-base"></i>
                  Something went wrong. Please email me directly at chetanbakal@hotmail.com
                </div>
              </Transition>

              <button type="submit" :disabled="submitting" class="btn-primary w-full justify-center text-sm py-4 disabled:opacity-60 disabled:cursor-not-allowed">
                <span v-if="!submitting" class="flex items-center gap-2">
                  <i class="fa-solid fa-paper-plane text-xs"></i> Send Message
                </span>
                <span v-else class="flex items-center gap-2">
                  <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Sending…
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import emailjs from '@emailjs/browser'
import { supabase } from '../services/supabase'

const headerEl  = ref(null)
const infoEl    = ref(null)
const formEl    = ref(null)
const submitting = ref(false)
const status     = ref('')   // '' | 'success' | 'error'

const form = reactive({ name: '', email: '', organization: '', subject: '', message: '' })

const contactItems = [
  { icon: 'fa-envelope',      color: '#c9922a', label: 'Email',              value: 'chetanbakal@hotmail.com',    href: 'mailto:chetanbakal@hotmail.com', external: false },
  { icon: 'fa-phone',         color: '#3B82F6', label: 'Phone',              value: '+91 77989 99978',            href: 'tel:+917798999978',              external: false },
  { icon: 'fa-location-dot',  color: '#10B981', label: 'Location',           value: 'Pune, Maharashtra, India',   href: '#',                              external: false },
  { icon: 'fa-building',      color: '#8B5CF6', label: 'Current Engagement', value: 'Turner & Townsend · bp GPMO', href: '#',                              external: false },
]

const handleSubmit = async () => {
  if (!form.name || !form.email || !form.subject || !form.message) return
  submitting.value = true
  status.value = ''

  const payload = {
    from_name:    form.name,
    from_email:   form.email,
    organization: form.organization,
    subject:      form.subject,
    message:      form.message,
  }

  try {
    // Primary: Supabase backup
    if (supabase) {
      await supabase.from('contact_messages').insert({
        from_name:  form.name,
        from_email: form.email,
        subject:    form.subject,
        message:    `[Org: ${form.organization || 'N/A'}]\n\n${form.message}`,
      })
    }

    // EmailJS delivery
    const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (serviceId && templateId && publicKey) {
      await emailjs.send(serviceId, templateId, payload, { publicKey })
    }

    status.value = 'success'
    Object.assign(form, { name: '', email: '', organization: '', subject: '', message: '' })
    setTimeout(() => { status.value = '' }, 6000)
  } catch (err) {
    console.error('Contact form error:', err)
    status.value = 'error'
    setTimeout(() => { status.value = '' }, 8000)
  } finally {
    submitting.value = false
  }
}

const observe = (el) => {
  if (!el) return
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() }
  }, { threshold: 0.1 })
  obs.observe(el)
}

onMounted(() => [headerEl, infoEl, formEl].forEach(r => observe(r.value)))
</script>

<style scoped>
.form-input {
  background: var(--color-panel);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 12px 16px;
  color: var(--color-text);
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  transition: border-color 0.3s, background 0.3s;
  outline: none;
}
.form-input::placeholder { color: var(--color-muted); opacity: 0.6; }
.form-input:focus { border-color: var(--color-gold); background: var(--color-surface); }
</style>
