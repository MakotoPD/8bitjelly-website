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

useSeoMeta({
  title: '8BitJelly — Hobby Gamedev Crew',
  description: 'A hobby group of passionate game developers making games with love.',
  ogImage: '/og.png',
  twitterCard: 'summary_large_image',
})
</script>
