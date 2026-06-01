<template>
  <footer class="relative overflow-hidden py-12" style="background: var(--color-base); border-top: 1px solid var(--color-border);">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-3 gap-8 mb-10">

        <!-- Brand -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-[#08090f] font-bold text-sm shadow-gold-sm">
              CB
            </div>
            <div>
              <p class="text-[var(--color-text)] font-semibold text-sm">Chetan Bakal</p>
              <p class="font-mono text-[10px] tracking-widest text-gold uppercase">CEng · PMP®</p>
            </div>
          </div>
          <p class="text-xs leading-relaxed max-w-xs" style="color: var(--color-muted);">
            Global PMO Lead driving infrastructure portfolio governance across APAC, EMEA &amp; Americas via Turner &amp; Townsend at bp.
          </p>
        </div>

        <!-- Quick links -->
        <div>
          <h4 class="text-[10px] uppercase tracking-widest font-semibold text-gold mb-4">Navigation</h4>
          <div class="grid grid-cols-2 gap-2">
            <a v-for="link in navLinks" :key="link.id"
              :href="`#${link.id}`" @click.prevent="scrollTo(link.id)"
              class="text-xs transition-colors duration-200 hover:text-gold"
              style="color: var(--color-muted);">
              {{ link.label }}
            </a>
          </div>
        </div>

        <!-- Contact snapshot -->
        <div>
          <h4 class="text-[10px] uppercase tracking-widest font-semibold text-gold mb-4">Contact</h4>
          <div class="space-y-2.5">
            <a href="mailto:chetanbakal@hotmail.com" class="flex items-center gap-2 text-xs transition-colors duration-200 hover:text-gold" style="color: var(--color-muted);">
              <i class="fa-solid fa-envelope text-gold text-[10px] w-4"></i>
              chetanbakal@hotmail.com
            </a>
            <a href="tel:+917798999978" class="flex items-center gap-2 text-xs transition-colors duration-200 hover:text-gold" style="color: var(--color-muted);">
              <i class="fa-solid fa-phone text-gold text-[10px] w-4"></i>
              +91 77989 99978
            </a>
            <span class="flex items-center gap-2 text-xs" style="color: var(--color-muted);">
              <i class="fa-solid fa-location-dot text-gold text-[10px] w-4"></i>
              Pune, Maharashtra, India
            </span>
            <a href="https://linkedin.com/in/chetanbakal" target="_blank" rel="noopener"
              class="flex items-center gap-2 text-xs transition-colors duration-200 hover:text-blue-400" style="color: var(--color-muted);">
              <i class="fa-brands fa-linkedin text-blue-400 text-[10px] w-4"></i>
              linkedin.com/in/chetanbakal
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style="border-color: var(--color-border);">
        <p class="text-xs" style="color: var(--color-muted);">
          © {{ year }} Chetan Bakal. All rights reserved.
        </p>
        <div class="flex items-center gap-2 text-xs" style="color: var(--color-muted);">
          <span class="pulse-dot w-1.5 h-1.5"></span>
          Available for senior leadership roles globally
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()

const navLinks = [
  { id: 'hero',           label: 'Home' },
  { id: 'about',          label: 'Profile' },
  { id: 'expertise',      label: 'Expertise' },
  { id: 'experience',     label: 'Experience' },
  { id: 'certifications',   label: 'Credentials' },
  { id: 'recommendations', label: 'Endorsements' },
  { id: 'contact',         label: 'Contact' },
]

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
</script>
