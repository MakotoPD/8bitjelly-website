<template>
  <div class="marquee">
    <div class="marquee-track" ref="track">
      <span>Indie Games</span><span class="star">★</span>
      <span>Gamedev Passion</span><span class="star">★</span>
      <span>Open to Join</span><span class="star">★</span>
      <span>8BitJelly</span><span class="star">★</span>
      <span>Made with passion</span><span class="star">★</span>
      <span>Indie Games</span><span class="star">★</span>
      <span>Gamedev Passion</span><span class="star">★</span>
      <span>Open to Join</span><span class="star">★</span>
      <span>8BitJelly</span><span class="star">★</span>
      <span>Made with passion</span><span class="star">★</span>
    </div>
  </div>

  <section class="stats" ref="statsEl">
    <div class="stat">
      <div class="stat-num display" ref="n1">0<small>+</small></div>
      <div class="stat-label pixel">{{ $t('stats.games') }}</div>
    </div>
    <div class="stat">
      <div class="stat-num display" ref="n2">0<small>+</small></div>
      <div class="stat-label pixel">{{ $t('stats.members') }}</div>
    </div>
    <div class="stat">
      <div class="stat-num display" ref="n3">0<small>+</small></div>
      <div class="stat-label pixel">{{ $t('stats.years') }}</div>
    </div>
    <div class="stat">
      <div class="stat-num display" ref="n4">∞</div>
      <div class="stat-label pixel">{{ $t('stats.coffees') }}</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const statsEl = ref<HTMLElement>()
const n1 = ref<HTMLElement>()
const n2 = ref<HTMLElement>()
const n3 = ref<HTMLElement>()

onMounted(() => {
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger)

    const animNum = (el: HTMLElement | undefined, end: number, suffix = '+') => {
      if (!el) return
      gsap.fromTo({ val: 0 }, { val: end }, {
        duration: 1.8,
        ease: 'power2.out',
        onUpdate() { el.innerHTML = `${Math.round((this as any).targets()[0].val)}<small>${suffix}</small>` },
        scrollTrigger: { trigger: statsEl.value, start: 'top 80%', once: true },
      })
    }

    animNum(n1.value, 8)
    animNum(n2.value, 20)
    animNum(n3.value, 4)

    gsap.from('.stat', {
      y: 40, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: statsEl.value, start: 'top 85%', once: true },
    })
  }
})
</script>

<style scoped>
.stats {
  display: grid; grid-template-columns: repeat(4, 1fr);
  border-bottom: 2px solid var(--ink);
}
.stat {
  padding: 38px 28px;
  border-right: 2px solid var(--ink);
  background: var(--cream);
}
.stat:last-child { border-right: 0; }
.stat:nth-child(2) { background: var(--pink); }
.stat:nth-child(3) { background: var(--yellow); }
.stat:nth-child(4) { background: var(--mint); }
.stat-num { font-size: 72px; line-height: 1; }
.stat-num :deep(small) { font-size: 36px; vertical-align: top; }
.stat-label { margin-top: 8px; font-size: 10px; letter-spacing: 0.08em; }

@media (max-width: 1000px) {
  .stats { grid-template-columns: repeat(2, 1fr); }
  .stat:nth-child(2) { border-right: 0; }
  .stat:nth-child(1), .stat:nth-child(2) { border-bottom: 2px solid var(--ink); }
}
@media (max-width: 600px) {
  .stats { grid-template-columns: 1fr; }
  .stat { border-right: 0; border-bottom: 2px solid var(--ink); }
  .stat:last-child { border-bottom: 0; }
}
</style>
