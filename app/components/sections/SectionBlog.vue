<template>
  <section class="blog-section" ref="sectionEl">
    <div class="wrap">
      <div class="section-head">
        <div>
          <span class="eyebrow">{{ $t('blog.eyebrow') }}</span>
          <h2 class="section-title display">{{ $t('blog.title') }} <em>{{ $t('blog.titleEm') }}</em></h2>
        </div>
        <div>
          <p class="section-kicker">{{ $t('blog.kicker') }}</p>
          <NuxtLink :to="localePath('/blog')" class="btn ghost" style="margin-top:12px;">
            {{ $t('blog.readAll') }} →
          </NuxtLink>
        </div>
      </div>

      <div v-if="posts && posts.length" class="blog-grid">
        <NuxtLink
          v-for="(post, i) in posts.slice(0, 3)"
          :key="post.id"
          :to="localePath(`/blog/${post.slug}`)"
          class="post"
          :class="{ featured: i === 0 }"
        >
          <div class="post-cover relative" :class="post.coverPattern">
            <NuxtImg
              v-if="post.coverImage"
              :src="post.coverImage"
              :alt="post.title"
              class="w-full h-full object-cover"
            />
            <span class="z-10 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"  style="font-size:72px;filter:drop-shadow(4px 4px 0 var(--ink))">{{ post.coverEmoji }}</span>
          </div>
          <div class="post-body">
            <div class="post-meta">
              <span>{{ post.author }}</span>
              <span class="dot"></span>
              <span>{{ formatDate(post.publishedAt) }}</span>
            </div>
            <h3 class="display">{{ post.title }}</h3>
            <p class="post-excerpt">{{ post.excerpt }}</p>
            <div v-if="post.tags && post.tags.length" style="margin-top:12px;display:flex;gap:6px;flex-wrap:wrap;">
              <span v-for="tag in post.tags.slice(0, 3)" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div v-else style="text-align:center;padding:60px 0;">
        <p class="pixel" style="font-size:12px;color:color-mix(in oklab, var(--ink) 50%, transparent);">No posts yet...</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { locale } = useI18n()
const localePath = useLocalePath()
const sectionEl = ref<HTMLElement>()

const { data: posts } = await useFetch('/api/blogs', {
  query: computed(() => ({ locale: locale.value, limit: 3 })),
  watch: [locale],
})

function formatDate(d: string | Date | null) {
  if (!d) return ''
  return new Date(d).toLocaleDateString(locale.value === 'pl' ? 'pl-PL' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

onMounted(() => {
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger)
    gsap.from('.post', {
      y: 40, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: sectionEl.value, start: 'top 80%', once: true },
    })
  }
})
</script>

<style scoped>
.blog-section {
  padding: 110px 0 90px;
  background: var(--pink);
  border-top: 2px solid var(--ink);
  border-bottom: 2px solid var(--ink);
}
.blog-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 20px; }
.post {
  background: var(--cream);
  border: 2.5px solid var(--ink);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 5px 5px 0 var(--ink);
  transition: transform 0.2s ease;
  display: flex; flex-direction: column;
}
.post:hover { transform: translate(-3px,-3px); box-shadow: 8px 8px 0 var(--ink); }
.post-cover {
  aspect-ratio: 16 / 9;
  border-bottom: 2.5px solid var(--ink);
  position: relative;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
}
.post.featured { grid-row: span 2; }
.post.featured .post-cover { aspect-ratio: 4 / 3; }
.post-emoji { font-size: 88px; filter: drop-shadow(4px 4px 0 var(--ink)); }
.post.featured .post-emoji { font-size: 140px; }
.post-body { padding: 18px 20px 22px; flex: 1; }
.post-meta {
  display: flex; gap: 10px; align-items: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em;
  color: color-mix(in oklab, var(--ink) 70%, transparent);
}
.dot { width: 5px; height: 5px; background: var(--magenta); border-radius: 50%; }
.post h3 { font-size: 26px; line-height: 1.05; margin: 8px 0 10px; }
.post.featured h3 { font-size: 40px; }
.post-excerpt { font-size: 14px; line-height: 1.5; color: color-mix(in oklab, var(--ink) 75%, transparent); }
.post.featured .post-excerpt { font-size: 17px; }

@media (max-width: 1000px) {
  .blog-grid { grid-template-columns: 1fr; }
  .post.featured { grid-row: auto; }
}
</style>
