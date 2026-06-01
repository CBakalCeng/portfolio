<template>
  <div id="portfolio-root" :class="isDark ? 'dark' : ''">
    <NavBar />
    <main>
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <ExperienceSection />
      <CertificationsSection />
      <RecommendationsSection />
      <ContactSection />
    </main>
    <FooterSection />

    <!-- Scroll-to-top -->
    <Transition name="fade">
      <button
        v-if="showScrollTop"
        @click="scrollTop"
        class="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-xl btn-primary shadow-gold-md flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <i class="fa-solid fa-chevron-up text-sm"></i>
      </button>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUiStore } from './stores/ui'
import NavBar              from './components/NavBar.vue'
import HeroSection         from './components/HeroSection.vue'
import AboutSection        from './components/AboutSection.vue'
import ExpertiseSection    from './components/ExpertiseSection.vue'
import ExperienceSection   from './components/ExperienceSection.vue'
import CertificationsSection from './components/CertificationsSection.vue'
import RecommendationsSection from './components/RecommendationsSection.vue'
import ContactSection      from './components/ContactSection.vue'
import FooterSection       from './components/FooterSection.vue'

const { isDark } = storeToRefs(useUiStore())

const showScrollTop = ref(false)
const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
const handleScroll = () => { showScrollTop.value = window.scrollY > 500 }

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>
