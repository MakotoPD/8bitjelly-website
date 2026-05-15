<template>
  <section class="games" id="games" ref="sectionEl">
    <div class="wrap">
      <div class="section-head">
        <div>
          <span class="eyebrow">{{ $t('games.eyebrow') }}</span>
          <h2 class="section-title display">{{ $t('games.title') }} <em>{{ $t('games.titleEm') }}</em></h2>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-end;">
          <p class="section-kicker" style="text-align:right;">{{ $t('games.kicker') }}</p>
          <!-- <NuxtLink :to="localePath('/gallery')" class="btn ghost">
            {{ $t('games.viewAll') }} →
          </NuxtLink> -->
        </div>
      </div>

      <div v-if="games && games.length" class="games-grid">
        <div
          v-for="(game, i) in games"
          :key="game.id"
          class="game"
          :class="{ featured: game.isFeatured, wide: i === 0 && !game.isFeatured }"
        >
          <div class="game-art">
            <NuxtImg
              v-if="game.coverImage"
              :src="game.coverImage"
              :alt="game.title"
              style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"
            />
            <div v-else class="game-art-fill" :class="game.coverPattern"></div>
            <div class="game-emoji">{{ game.coverEmoji }}</div>
            <div class="game-tags">
              <span v-for="tag in game.tags.slice(0, 2)" :key="tag" class="tag">{{ tag }}</span>
              <span class="tag dark">{{ statusLabel(game.status) }}</span>
            </div>
          </div>
          <div class="game-body">
            <h3 class="game-title display">{{ game.title }}</h3>
            <p class="game-desc">{{ game.description }}</p>
            <div class="game-meta">
              <span class="pixel">{{ game.platform }}</span>
              <a v-if="game.itchioUrl" :href="game.itchioUrl" target="_blank" rel="noopener">
                <UIcon name="i-simple-icons-itchdotio" style="width:14px;height:14px;" />
                {{ $t('games.playNow') }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div v-else style="text-align:center;padding:60px 0;color:color-mix(in oklab, var(--ink) 50%, transparent);">
        <p class="pixel" style="font-size:12px;">No games yet...</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const sectionEl = ref<HTMLElement>()

const { data: games } = await useFetch('/api/games', {
  query: computed(() => ({ locale: locale.value })),
  watch: [locale],
})

function statusLabel(status: string) {
  const key = status.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
  return t(`games.${key}`) || status
}

onMounted(() => {
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger)
    gsap.from('.game', {
      y: 50, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: sectionEl.value, start: 'top 80%', once: true },
    })
  }
})
</script>

<style scoped>
.games { padding: 110px 0 90px; background: var(--cream); }
.games-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 18px; }
.game {
  grid-column: span 4;
  border: 2.5px solid var(--ink);
  border-radius: 18px;
  background: var(--cream);
  overflow: hidden;
  box-shadow: 6px 6px 0 var(--ink);
  transition: transform 0.2s ease;
  display: flex; flex-direction: column;
}
.game:hover { transform: translate(-3px,-3px); box-shadow: 9px 9px 0 var(--ink); }
.game.featured { grid-column: span 6; }
.game.wide { grid-column: span 8; }
.game-art {
  aspect-ratio: 16 / 10; position: relative; overflow: hidden;
  border-bottom: 2.5px solid var(--ink);
}
.game.featured .game-art { aspect-ratio: 16 / 9; }
.game-art-fill { position: absolute; inset: 0; }
.game-emoji {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 100px;
  filter: drop-shadow(4px 4px 0 var(--ink));
}
.game.featured .game-emoji { font-size: 140px; }
.game-tags { position: absolute; top: 12px; left: 12px; display: flex; gap: 6px; }
.game-body { padding: 18px 20px 22px; flex: 1; display: flex; flex-direction: column; }
.game-title { font-size: 28px; line-height: 1; margin: 0; }
.game.featured .game-title { font-size: 40px; }
.game-desc { font-size: 14px; line-height: 1.5; margin: 10px 0 14px; color: color-mix(in oklab, var(--ink) 75%, transparent); flex: 1; }
.game-meta {
  display: flex; align-items: center; justify-content: space-between; gap: 10px;
  font-family: 'Press Start 2P', monospace; font-size: 9px;
}
.game-meta a {
  display: inline-flex; gap: 6px; align-items: center;
  padding: 8px 12px; background: var(--ink); color: var(--cream); border-radius: 8px;
}
.game-meta a:hover { background: var(--magenta); }

@media (max-width: 1000px) {
  .games-grid > .game,
  .games-grid > .game.featured,
  .games-grid > .game.wide { grid-column: span 12; }
}
</style>
