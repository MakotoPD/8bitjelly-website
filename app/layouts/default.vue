<template>
  <div>
    <AppNav />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// Corporation JSON-LD
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: '8BitJelly',
      url: 'https://8bitjelly.com',
      logo: 'https://8bitjelly.com/logo_white.png',
      sameAs: [
        'https://www.instagram.com/8bitjelly',
        'https://www.facebook.com/8bitjelly',
        'https://github.com/8bitjelly',
      ],
    }),
  }],
})
</script>
