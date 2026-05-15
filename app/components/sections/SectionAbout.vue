<template>
  <section class="about" id="about" ref="sectionEl">
    <div class="wrap about-grid">
      <div>
        <span class="eyebrow">{{ $t('about.eyebrow') }}</span>
        <h2 class="section-title display" style="margin-bottom:24px;">
          {{ $t('about.title') }}<br>
          <em>{{ $t('about.titleEm') }}</em><br>
          {{ $t('about.titleEnd') }}
        </h2>
        <p style="font-size:20px;line-height:1.55;margin:0 0 20px;">{{ $t('about.desc1') }}</p>
        <p style="font-size:18px;line-height:1.55;color:color-mix(in oklab, var(--ink) 75%, transparent);">{{ $t('about.desc2') }}</p>
      </div>

      <div class="pillar-list">
        <div class="pillar" v-for="(pillar, i) in pillars" :key="i">
          <div class="num pixel">{{ String(i + 1).padStart(2, '0') }}</div>
          <div>
            <h4>{{ pillar.title }}</h4>
            <p>{{ pillar.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t } = useI18n()
const sectionEl = ref<HTMLElement>()

const pillars = computed(() => [
  { title: t('about.pillar1Title'), desc: t('about.pillar1Desc') },
  { title: t('about.pillar2Title'), desc: t('about.pillar2Desc') },
  { title: t('about.pillar3Title'), desc: t('about.pillar3Desc') },
])

onMounted(() => {
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger)
    gsap.from(sectionEl.value!.querySelectorAll('.pillar'), {
      x: 40, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: sectionEl.value, start: 'top 75%', once: true },
    })
    gsap.from(sectionEl.value!.querySelector('.section-title'), {
      y: 40, opacity: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: sectionEl.value, start: 'top 75%', once: true },
    })
  }
})
</script>

<style scoped>
.about { padding: 110px 0 80px; }
.about-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 64px; align-items: start; }
.pillar-list { display: grid; gap: 14px; }
.pillar {
  border: 2.5px solid var(--ink);
  background: var(--cream);
  border-radius: 14px;
  padding: 18px 20px;
  display: flex; align-items: center; gap: 16px;
  box-shadow: 4px 4px 0 var(--ink);
}
.num {
  width: 38px; height: 38px;
  background: var(--ink); color: var(--cream);
  display: flex; align-items: center; justify-content: center;
  border-radius: 8px; flex: none;
}
.pillar h4 { margin: 0; font-size: 17px; font-weight: 700; }
.pillar p { margin: 4px 0 0; font-size: 14px; color: color-mix(in oklab, var(--ink) 70%, transparent); line-height: 1.4; }

@media (max-width: 1000px) {
  .about-grid { grid-template-columns: 1fr; }
}
</style>
