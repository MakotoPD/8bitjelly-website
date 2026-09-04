<template>
  <section class="hero" id="top">
    <div class="hero-bg-grid"></div>
    <div class="blob b1"></div>
    <div class="blob b2"></div>
    <div class="blob b3"></div>

    <div class="wrap hero-grid">
      <div class="hero-left" ref="heroLeft">
        <span class="eyebrow">{{ $t('hero.eyebrow') }}</span>
        <h1 class="hero-title display">
          <span class="row"><span class="word">{{ $t('hero.title1') }}</span></span>
          <span class="row"><span class="word pink">{{ $t('hero.title2') }}</span></span>
          <span class="row"><span class="word outline">{{ $t('hero.title3') }}</span></span>
        </h1>
        <p class="hero-sub">{{ $t('hero.subtitle') }}</p>
        <div class="hero-cta">
          <NuxtLink :to="localePath('/#games')" class="btn large">
            <UIcon name="i-heroicons-puzzle-piece" />
            {{ $t('hero.cta1') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/#team')" class="btn ghost large">
            {{ $t('hero.cta2') }} →
          </NuxtLink>
        </div>
      </div>

      <div class="hero-whale-stage" ref="whaleStage">
        <div class="whale-disc"></div>
        <img src="/whale.png" class="whale-img" alt="8BitJelly whale mascot" ref="whaleImg" />
        <div class="orbit-dot d1">🎮</div>
        <div class="orbit-dot d2">🎨</div>
        <div class="orbit-dot d3">🎵</div>
        <div class="orbit-dot d4">💻</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const localePath = useLocalePath()
const heroLeft = ref<HTMLElement>()
const whaleStage = ref<HTMLElement>()
const whaleImg = ref<HTMLElement>()

onMounted(() => {
  gsap.from('.hero-left .eyebrow', { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' })
  gsap.from('.hero-title .word', { y: 80, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.1 })
  gsap.from('.hero-sub', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.45 })
  gsap.from('.hero-cta', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.6 })
  gsap.from('.whale-disc', { scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(1.5)', delay: 0.3 })
  gsap.from('.whale-img', { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.5 })
  gsap.from('.orbit-dot', { scale: 0, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(2)', delay: 0.9 })

  if (whaleImg.value) {
    gsap.to(whaleImg.value, { y: -18, duration: 2.8, ease: 'power1.inOut', yoyo: true, repeat: -1 })
  }

  gsap.to('.orbit-dot.d1', { y: 14, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 })
  gsap.to('.orbit-dot.d2', { y: -16, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1 })
  gsap.to('.orbit-dot.d3', { x: 14, duration: 3.0, ease: 'sine.inOut', yoyo: true, repeat: -1 })
  gsap.to('.orbit-dot.d4', { x: -12, y: -8, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 })
})
</script>

<style scoped>
.hero {
  padding: 80px 0 100px;
  position: relative;
  overflow: hidden;
}
.hero-bg-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(var(--pink) 1px, transparent 1px),
    linear-gradient(90deg, var(--pink) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at 60% 40%, black 30%, transparent 80%);
  opacity: 0.5;
}
.blob {
  position: absolute; border-radius: 50%; filter: blur(40px); opacity: 0.55;
  pointer-events: none;
}
.blob.b1 { width: 420px; height: 420px; background: var(--pink); top: -80px; left: -120px; }
.blob.b2 { width: 320px; height: 320px; background: var(--yellow); bottom: -100px; right: 30%; opacity: 0.4; }
.blob.b3 { width: 280px; height: 280px; background: var(--mint); top: 30%; right: -80px; opacity: 0.45; }

.hero-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 40px;
  min-height: 640px;
}
.hero-title {
  font-size: clamp(64px, 9vw, 120px);
  margin: 18px 0 24px;
}
.hero-title .row { display: block; overflow: hidden; padding-bottom: 0.3em; }
.hero-title .word { display: inline-block; }
.hero-title .pink { color: var(--magenta); }
.hero-title .outline { -webkit-text-stroke: 2.5px var(--ink); color: transparent; }
.hero-sub {
  max-width: 540px;
  font-size: 18px;
  line-height: 1.55;
  color: color-mix(in oklab, var(--ink) 80%, transparent);
  margin: 0 0 28px;
}
.hero-cta { display: flex; gap: 14px; flex-wrap: wrap; }

.hero-whale-stage {
  position: relative;
  height: 540px;
  display: flex; align-items: center; justify-content: center;
}
.whale-disc {
  position: absolute;
  width: 460px; height: 460px;
  border-radius: 50%;
  background: var(--magenta);
  border: 3px solid var(--ink);
  box-shadow: 10px 10px 0 var(--ink);
}
.whale-disc::before {
  content: ''; position: absolute; inset: 14px;
  border: 2px dashed var(--cream);
  border-radius: 50%;
  opacity: 0.5;
}
.whale-img {
  position: relative;
  width: 480px; max-width: 90%;
  filter: drop-shadow(0 18px 30px rgba(27,11,46,.25));
  z-index: 2;
}
.orbit-dot {
  position: absolute;
  width: 36px; height: 36px;
  border: 2.5px solid var(--ink);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
  box-shadow: 3px 3px 0 var(--ink);
}
.orbit-dot.d1 { top: 6%; left: 8%; background: var(--yellow); }
.orbit-dot.d2 { top: 18%; right: 4%; background: var(--mint); }
.orbit-dot.d3 { bottom: 12%; left: 2%; background: var(--sky); }
.orbit-dot.d4 { bottom: 4%; right: 16%; background: var(--cream); }

@media (max-width: 1000px) {
  .hero-grid { grid-template-columns: 1fr; }
  .hero-whale-stage { height: 380px; }
  .whale-disc { width: 320px; height: 320px; }
  .whale-img { width: 340px; }
}
</style>
