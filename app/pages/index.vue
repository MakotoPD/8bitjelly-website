<template>
  <div>
    <SectionHero />
    <SectionStats />
    <SectionAbout />
    <SectionTeam />
    <SectionGames />
    <SectionBlog />
    <SectionJoin />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, locale } = useI18n()
const route = useRoute()

useSeoMeta({
  title: computed(() => t('seo.homeTitle')),
  ogTitle: computed(() => t('seo.homeTitle')),
  description: computed(() => t('seo.homeDescription')),
  ogDescription: computed(() => t('seo.homeDescription')),
  ogImage: 'https://8bitjelly.com/og.png',
  ogType: 'website',
  ogUrl: computed(() => `https://8bitjelly.com${route.path}`),
  ogLocale: computed(() => locale.value === 'pl' ? 'pl_PL' : 'en_US'),
  twitterCard: 'summary_large_image',
  twitterTitle: computed(() => t('seo.homeTitle')),
  twitterDescription: computed(() => t('seo.homeDescription')),
})

useHead({
  link: [{ rel: 'canonical', href: computed(() => `https://8bitjelly.com${route.path}`) }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: '8BitJelly',
      url: 'https://8bitjelly.com',
      description: 'A hobby group of passionate game developers, artists, and musicians making games with love.',
      inLanguage: ['en', 'pl'],
    }),
  }],
})
</script>
