<template>
  <nav class="top">
    <div class="nav-inner">
      <NuxtLink :to="localePath('/')" class="logo">
        <img src="/logo_black.svg" alt="8BitJelly" class="logo-img" />
      </NuxtLink>

      <div class="nav-links">
        <a :href="localePath('/#top')">{{ $t('nav.home') }}</a>
        <a :href="localePath('/#about')">{{ $t('nav.about') }}</a>
        <a :href="localePath('/#team')">{{ $t('nav.team') }}</a>
        <a :href="localePath('/#games')">{{ $t('nav.games') }}</a>
        <NuxtLink :to="localePath('/blog')">{{ $t('nav.blog') }}</NuxtLink>
        <NuxtLink :to="localePath('/gallery')">{{ $t('nav.gallery') }}</NuxtLink>
        <NuxtLink :to="localePath('/contact')" class="btn sm ghost" style="margin-left:8px;">
          {{ $t('nav.contact') }}
        </NuxtLink>
      </div>

      <div style="display:flex;align-items:center;gap:12px;">
        <div class="nav-lang">
          <button :class="{ active: locale === 'en' }" @click="setLocale('en')">EN</button>
          <button :class="{ active: locale === 'pl' }" @click="setLocale('pl')">PL</button>
        </div>

        <button class="nav-hamburger" @click="mobileOpen = true">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>

  <Teleport to="body">
    <Transition name="slide">
      <div v-if="mobileOpen" class="mobile-menu">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
          <img src="/logo_black.svg" alt="8BitJelly" class="logo-img" />
          <button style="background:none;border:2px solid var(--ink);border-radius:8px;padding:8px;cursor:pointer;" @click="mobileOpen = false">
            <UIcon name="i-heroicons-x-mark" style="width:20px;height:20px;" />
          </button>
        </div>
        <NuxtLink :to="localePath('/')" @click="mobileOpen = false">{{ $t('nav.home') }}</NuxtLink>
        <NuxtLink :to="localePath('/blog')" @click="mobileOpen = false">{{ $t('nav.blog') }}</NuxtLink>
        <NuxtLink :to="localePath('/gallery')" @click="mobileOpen = false">{{ $t('nav.gallery') }}</NuxtLink>
        <NuxtLink :to="localePath('/contact')" @click="mobileOpen = false">{{ $t('nav.contact') }}</NuxtLink>
        <div class="nav-lang w-fit" style="margin-top:16px;">
          <button :class="{ active: locale === 'en' }" @click="setLocale('en'); mobileOpen = false">EN</button>
          <button :class="{ active: locale === 'pl' }" @click="setLocale('pl'); mobileOpen = false">PL</button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()
const localePath = useLocalePath()
const mobileOpen = ref(false)

watch(useRoute(), () => { mobileOpen.value = false })
</script>

<style scoped>
.logo-img {
  height: 36px;
  width: auto;
  display: block;
  /* Colorize to brand magenta (#FF3D7F) */
  filter: brightness(0) saturate(100%) invert(37%) sepia(97%) saturate(1366%) hue-rotate(311deg) brightness(104%);
  transition: filter 0.2s ease;
}
.logo:hover .logo-img,
.logo-img:hover {
  /* Darken slightly on hover */
  filter: brightness(0) saturate(100%) invert(22%) sepia(97%) saturate(1200%) hue-rotate(311deg) brightness(90%);
}

.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>
