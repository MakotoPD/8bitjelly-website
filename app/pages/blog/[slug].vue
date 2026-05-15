<template>
  <div>
    <article>
      <header class="post-header" style="background:var(--cream);border-bottom:2px solid var(--ink);">
        <div class="wrap" style="max-width:800px;">
          <NuxtLink :to="localePath('/blog')" style="display:inline-flex;align-items:center;gap:8px;font-family:'Press Start 2P',monospace;font-size:9px;text-transform:uppercase;margin-bottom:24px;color:color-mix(in oklab,var(--ink) 60%,transparent);">
            <UIcon name="i-heroicons-arrow-left" style="width:14px;height:14px;" />
            {{ $t('blog.readAll') }}
          </NuxtLink>

          <div v-if="post" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px;">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>

          <h1 v-if="post" class="display" style="font-size:clamp(40px,7vw,96px);line-height:0.95;margin:0 0 24px;">
            {{ post.title }}
          </h1>

          <div style="display:flex;align-items:center;gap:16px;font-family:'JetBrains Mono',monospace;font-size:12px;color:color-mix(in oklab,var(--ink) 60%,transparent);">
            <span v-if="post">{{ $t('blog.by') }} <strong style="color:var(--ink);">{{ post.author }}</strong></span>
            <span>·</span>
            <span v-if="post">{{ formatDate(post.publishedAt) }}</span>
          </div>
        </div>
      </header>

      <div v-if="post" class="post-content" style="background:var(--cream);">
        <div class="wrap" style="max-width:800px;">
          <div class="prose" v-html="post.content" />
        </div>
      </div>

      <div v-else-if="error" style="text-align:center;padding:100px 0;">
        <p class="pixel">{{ $t('common.error') }}</p>
        <NuxtLink :to="localePath('/blog')" class="btn ghost" style="margin-top:24px;">← Blog</NuxtLink>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })
const { locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const { data: post, error } = await useFetch(`/api/blogs/${route.params.slug}`, {
  query: computed(() => ({ locale: locale.value })),
  watch: [locale],
})

useSeoMeta({
  title: computed(() => post.value ? `${post.value.title} — 8BitJelly` : '8BitJelly Blog'),
  ogTitle: computed(() => post.value?.title || '8BitJelly Blog'),
  description: computed(() => post.value?.excerpt || ''),
  ogDescription: computed(() => post.value?.excerpt || ''),
  ogImage: computed(() => post.value?.coverImage || 'https://8bitjelly.com/og.png'),
  ogType: 'article',
  ogUrl: computed(() => `https://8bitjelly.com${route.path}`),
  ogLocale: computed(() => locale.value === 'pl' ? 'pl_PL' : 'en_US'),
  articlePublishedTime: computed(() => post.value?.publishedAt ? new Date(post.value.publishedAt).toISOString() : undefined),
  articleAuthor: computed(() => post.value?.author || '8BitJelly'),
  author: computed(() => post.value?.author || '8BitJelly'),
  twitterCard: 'summary_large_image',
  twitterTitle: computed(() => post.value?.title || '8BitJelly Blog'),
  twitterDescription: computed(() => post.value?.excerpt || ''),
})

useHead(computed(() => {
  const postUrl = `https://8bitjelly.com${route.path}`
  const scripts = post.value ? [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
        headline: post.value!.title,
        description: post.value!.excerpt || '',
        author: { '@type': 'Person', name: post.value!.author },
        datePublished: post.value!.publishedAt,
        dateModified: post.value!.publishedAt,
        image: {
          '@type': 'ImageObject',
          url: post.value!.coverImage || 'https://8bitjelly.com/og.png',
        },
        url: postUrl,
        inLanguage: locale.value === 'pl' ? 'pl-PL' : 'en-US',
        keywords: (post.value!.tags || []).join(', '),
        publisher: {
          '@type': 'Organization',
          name: '8BitJelly',
          url: 'https://8bitjelly.com',
          logo: { '@type': 'ImageObject', url: 'https://8bitjelly.com/logo_white.png' },
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://8bitjelly.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `https://8bitjelly.com${locale.value === 'pl' ? '/pl' : ''}/blog` },
          { '@type': 'ListItem', position: 3, name: post.value!.title, item: postUrl },
        ],
      }),
    },
  ] : []

  return {
    link: [{ rel: 'canonical', href: postUrl }],
    script: scripts,
  }
}))

function formatDate(d: string | Date | null) {
  if (!d) return ''
  return new Date(d).toLocaleDateString(locale.value === 'pl' ? 'pl-PL' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style scoped>
.post-header { padding: 70px 0 50px; }
.post-content { padding: 60px 0 100px; }

@media (max-width: 600px) {
  .post-header { padding: 36px 0 28px; }
  .post-content { padding: 36px 0 60px; }
}
</style>
