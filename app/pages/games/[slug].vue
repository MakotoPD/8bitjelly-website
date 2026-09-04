<template>
  <div>
    <div v-if="game">
      <!-- Hero -->
      <div class="game-hero">
        <NuxtImg
          v-if="game.coverImage"
          :src="game.coverImage"
          :alt="game.title"
          style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"
        />
        <div v-else class="game-hero-pattern" :class="game.coverPattern">
          <span class="game-hero-emoji">{{ game.coverEmoji }}</span>
        </div>
      </div>

      <!-- Header -->
      <div class="game-header" style="background:var(--cream);border-bottom:2px solid var(--ink);">
        <div class="wrap" style="max-width:860px;">
          <NuxtLink
            :to="localePath('/#games')"
            style="display:inline-flex;align-items:center;gap:8px;font-family:'Press Start 2P',monospace;font-size:9px;text-transform:uppercase;margin-bottom:24px;color:color-mix(in oklab,var(--ink) 60%,transparent);"
          >
            <UIcon name="i-heroicons-arrow-left" style="width:14px;height:14px;" />
            {{ $t('games.eyebrow') }}
          </NuxtLink>

          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px;">
            <span v-for="tag in game.tags" :key="tag" class="tag">{{ tag }}</span>
            <span class="tag dark">{{ statusLabel(game.status) }}</span>
            <span class="tag dark">{{ game.platform }}</span>
          </div>

          <h1 class="display" style="font-size:clamp(40px,7vw,96px);line-height:0.95;margin:0 0 28px;">
            {{ game.title }}
          </h1>

          <p v-if="game.description" style="font-size:18px;line-height:1.6;color:color-mix(in oklab,var(--ink) 75%,transparent);margin:0 0 28px;max-width:640px;">
            {{ game.description }}
          </p>

          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <a
              v-if="game.itchioUrl"
              :href="game.itchioUrl"
              target="_blank"
              rel="noopener"
              class="btn"
            >
              <UIcon name="i-simple-icons-itchdotio" style="width:16px;height:16px;" />
              {{ $t('games.playNow') }}
            </a>
            <a
              v-if="game.steamUrl"
              :href="game.steamUrl"
              target="_blank"
              rel="noopener"
              class="btn ghost"
            >
              <UIcon name="i-simple-icons-steam" style="width:16px;height:16px;" />
              Steam
            </a>
          </div>
        </div>
      </div>

      <!-- Rich text content -->
      <div v-if="game.content" class="game-content" style="background:var(--cream);">
        <div class="wrap" style="max-width:860px;">
          <div class="prose" v-html="game.content" />
        </div>
      </div>

      <!-- Screenshots from the gallery -->
      <section v-if="game.screenshots?.length" style="background:var(--cream);padding:0 0 100px;">
        <div class="wrap" style="max-width:860px;">
          <h2 class="display" style="font-size:40px;margin:0 0 24px;border-bottom:2px solid var(--ink);padding-bottom:16px;">
            {{ $t('games.screenshots') }}
          </h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px;">
            <button
              v-for="img in game.screenshots"
              :key="img.id"
              style="border:2.5px solid var(--ink);border-radius:12px;overflow:hidden;box-shadow:4px 4px 0 var(--ink);cursor:pointer;padding:0;background:none;display:block;"
              @click="lightbox = img.imageUrl"
            >
              <NuxtImg
                :src="img.imageUrl"
                :alt="img.altText || game.title"
                style="width:100%;aspect-ratio:16/9;object-fit:cover;display:block;"
                loading="lazy"
              />
            </button>
          </div>
        </div>
      </section>

      <Lightbox v-model="lightbox" />
    </div>

    <div v-else-if="error" style="text-align:center;padding:120px 0;">
      <p class="pixel" style="font-size:12px;">{{ $t('common.error') }}</p>
      <NuxtLink :to="localePath('/')" class="btn ghost" style="margin-top:24px;">← Home</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { locale, t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const lightbox = ref<string | null>(null)

const { data: game, error } = await useFetch(`/api/games/slug/${route.params.slug}`, {
  query: computed(() => ({ locale: locale.value })),
  watch: [locale],
})

function statusLabel(status: string) {
  const key = status.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
  return t(`games.${key}`) || status
}

useSeoMeta({
  title: computed(() => game.value ? `${game.value.title} — 8BitJelly` : '8BitJelly'),
  ogTitle: computed(() => game.value?.title || '8BitJelly'),
  description: computed(() => game.value?.description || ''),
  ogDescription: computed(() => game.value?.description || ''),
  ogImage: computed(() => game.value?.coverImage || 'https://8bitjelly.com/og.png'),
  ogType: 'website',
  ogUrl: computed(() => `https://8bitjelly.com${route.path}`),
  ogLocale: computed(() => locale.value === 'pl' ? 'pl_PL' : 'en_US'),
  twitterCard: 'summary_large_image',
})
</script>

<style scoped>
.game-hero {
  width: 100%;
  aspect-ratio: 21 / 9;
  position: relative;
  overflow: hidden;
  border-bottom: 2.5px solid var(--ink);
  background: var(--eggplant);
}
.game-hero-pattern {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
}
.game-hero-emoji {
  font-size: clamp(80px, 12vw, 160px);
  filter: drop-shadow(4px 4px 0 var(--ink));
}
.game-header { padding: 52px 0 44px; }
.game-content { padding: 60px 0 100px; }

@media (max-width: 600px) {
  .game-hero { aspect-ratio: 16 / 9; }
  .game-header { padding: 32px 0 28px; }
  .game-content { padding: 36px 0 60px; }
}
</style>
