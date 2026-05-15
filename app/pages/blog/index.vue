<template>
  <div>
    <div class="page-hero" style="background:var(--pink);border-bottom:2px solid var(--ink);">
      <div class="wrap page-hero-grid">
        <div>
          <span class="eyebrow">{{ $t('blog.eyebrow') }}</span>
          <h1 class="display">{{ $t('blog.title') }} <em>{{ $t('blog.titleEm') }}</em></h1>
          <p>{{ $t('blog.kicker') }}</p>
        </div>
      </div>
    </div>

    <div class="marquee">
      <div class="marquee-track">
        <span v-for="n in 8" :key="n">Dev Logs <span class="star">★</span> Tutorials <span class="star">★</span> Behind the Scenes <span class="star">★</span></span>
      </div>
    </div>

    <section class="blog-section">
      <div class="wrap">
        <!-- Tag filter -->
        <div class="filter-bar" v-if="tags && tags.length">
          <button class="chip" :class="{ active: !activeTag }" @click="activeTag = null">
            {{ $t('blog.filterAll') }}
          </button>
          <button
            v-for="tag in tags"
            :key="tag.id"
            class="chip"
            :class="{ active: activeTag === tag.name }"
            @click="activeTag = tag.name"
          >
            {{ tag.name }}
          </button>
        </div>

        <div v-if="pending" style="text-align:center;padding:60px 0;">
          <p class="pixel">{{ $t('common.loading') }}</p>
        </div>

        <div v-else-if="posts && posts.length" class="posts-grid">
          <NuxtLink
            v-for="post in posts"
            :key="post.id"
            :to="localePath(`/blog/${post.slug}`)"
            class="card"
            style="display:flex;flex-direction:column;"
          >
            <div class="post-cover relative" :class="post.coverPattern" style="aspect-ratio:16/9;border-bottom:2.5px solid var(--ink);display:flex;align-items:center;justify-content:center;overflow:hidden;">
              <NuxtImg v-if="post.coverImage" :src="post.coverImage" :alt="post.title" class="w-full h-full object-cover" />
              <span class="z-10 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"  style="font-size:72px;filter:drop-shadow(4px 4px 0 var(--ink))">{{ post.coverEmoji }}</span>
            </div>
            <div style="padding:18px 20px 22px;flex:1;display:flex;flex-direction:column;">
              <div style="display:flex;gap:10px;align-items:center;font-family:'JetBrains Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:color-mix(in oklab,var(--ink) 65%,transparent);margin-bottom:10px;">
                <span>{{ post.author }}</span>
                <span style="width:5px;height:5px;background:var(--magenta);border-radius:50%;display:inline-block;"></span>
                <span>{{ formatDate(post.publishedAt) }}</span>
              </div>
              <h2 class="display" style="font-size:24px;margin:0 0 10px;line-height:1.1;">{{ post.title }}</h2>
              <p style="font-size:14px;line-height:1.5;color:color-mix(in oklab,var(--ink) 75%,transparent);flex:1;margin:0 0 14px;">{{ post.excerpt }}</p>
              <div style="display:flex;gap:6px;flex-wrap:wrap;">
                <span v-for="tag in (post.tags || []).slice(0, 3)" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else style="text-align:center;padding:80px 0;">
          <p class="pixel" style="font-size:12px;color:color-mix(in oklab,var(--ink) 50%,transparent);">
            {{ $t('common.noResults') }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })
const { t, locale } = useI18n()
const localePath = useLocalePath()
const activeTag = ref<string | null>(null)

useSeoMeta({ title: `Blog — 8BitJelly`, description: 'Dev logs, tutorials and news from the 8BitJelly crew.' })

const { data: tags } = await useFetch('/api/tags')

const { data: posts, pending } = await useFetch('/api/blogs', {
  query: computed(() => ({
    locale: locale.value,
    limit: 50,
    ...(activeTag.value ? { tag: activeTag.value } : {}),
  })),
  watch: [locale, activeTag],
})

function formatDate(d: string | Date | null) {
  if (!d) return ''
  return new Date(d).toLocaleDateString(locale.value === 'pl' ? 'pl-PL' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
</script>

<style scoped>
.blog-section {
  padding: 80px 0 100px;
  background: var(--cream);
}
.filter-bar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}
.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 1000px) {
  .posts-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .blog-section { padding: 40px 0 60px; }
  .filter-bar { margin-bottom: 20px; }
  .posts-grid { grid-template-columns: 1fr; }
}
</style>
