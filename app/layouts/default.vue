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
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: '8BitJelly',
      url: 'https://8bitjelly.com',
      email: 'hello@8bitjelly.com',
      description: 'A hobby group of passionate game developers, artists, and musicians making games with love.',
      foundingLocation: { '@type': 'Place', addressCountry: 'PL' },
      inLanguage: ['en', 'pl'],
      logo: {
        '@type': 'ImageObject',
        url: 'https://8bitjelly.com/logo_white.png',
      },
      sameAs: [
        'https://www.instagram.com/8bitjelly',
        'https://www.facebook.com/8bitjelly',
        'https://github.com/8bitjelly',
        'https://itch.io/8bitjelly',
      ],
    }),
  }],
})
</script>
