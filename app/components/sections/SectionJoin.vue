<template>
  <section class="join" id="join" ref="sectionEl">
    <div class="wrap join-inner">
      <span class="eyebrow" style="background:rgba(255,255,255,0.15);border-color:white;color:white;">
        {{ $t('join.eyebrow') }}
      </span>
      <h2 class="display">
        {{ $t('join.title') }}<br>
        <em>{{ $t('join.titleEm') }}</em>
        {{ $t('join.titleEnd') }}
      </h2>
      <p>{{ $t('join.desc') }}</p>
      <div class="flex flex-col gap-4 items-center">
        <NuxtLink :to="localePath('/contact')" class="btn yellow large w-fit">
          {{ $t('join.cta') }}
        </NuxtLink>
        <span style="font-family:'Press Start 2P',monospace;font-size:9px;opacity:0.7;align-self:center;">
          {{ $t('join.ctaSub') }}
        </span>
      </div>
      <div class="stack-row">
        <span v-for="tech in techStack" :key="tech" class="tag">{{ tech }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const localePath = useLocalePath()
const sectionEl = ref<HTMLElement>()

const techStack = ['Unity', 'C#', 'Blender', 'Vue.js', 'Nuxt', '.NET', 'Figma']

onMounted(() => {
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger)
    gsap.from('.join h2', {
      y: 50, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: sectionEl.value, start: 'top 80%', once: true },
    })
    gsap.from('.stack-row .tag', {
      scale: 0, opacity: 0, stagger: 0.05, duration: 0.4, ease: 'back.out(2)',
      scrollTrigger: { trigger: sectionEl.value, start: 'top 70%', once: true },
    })
  }
})
</script>

<style scoped>
.join {
  padding: 130px 0;
  background: var(--magenta);
  color: white;
  position: relative; overflow: hidden;
  border-bottom: 2px solid var(--ink);
}
.join::before {
  content: ''; position: absolute; inset: 0;
  background-image:
    radial-gradient(circle at 12% 30%, var(--yellow) 12px, transparent 13px),
    radial-gradient(circle at 88% 70%, var(--mint) 14px, transparent 15px),
    radial-gradient(circle at 25% 80%, var(--cream) 8px, transparent 9px),
    radial-gradient(circle at 75% 20%, var(--cream) 6px, transparent 7px);
  opacity: 0.8;
}
.join-inner { position: relative; text-align: center; }
.join h2 {
  font-size: clamp(56px, 8vw, 130px); line-height: 0.9;
  margin: 14px 0 18px; color: var(--cream);
}
.join h2 em { font-style: normal; color: var(--eggplant); }
.join p { font-size: 19px; max-width: 580px; margin: 0 auto 30px; line-height: 1.55; }
.stack-row { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 36px; }
.stack-row .tag { background: var(--cream); color: var(--ink); }
</style>
