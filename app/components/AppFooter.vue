<template>
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <NuxtLink :to="localePath('/')" class="logo" style="color:var(--cream);margin-bottom:16px;display:inline-flex;">
            8BitJelly
          </NuxtLink>
          <p style="font-size:14px;line-height:1.6;color:color-mix(in oklab, var(--cream) 70%, transparent);margin:12px 0 20px;max-width:280px;">
            {{ $t('footer.desc') }}
          </p>
          <div class="socials">
            <a href="https://www.instagram.com/8bitjelly" target="_blank" rel="noopener" aria-label="Instagram">
              <UIcon name="i-simple-icons-instagram" style="width:18px;height:18px;" />
            </a>
            <a href="https://www.facebook.com/8bitjelly" target="_blank" rel="noopener" aria-label="Facebook">
              <UIcon name="i-simple-icons-facebook" style="width:18px;height:18px;" />
            </a>
            <a href="https://github.com/8bitjelly" target="_blank" rel="noopener" aria-label="GitHub">
              <UIcon name="i-simple-icons-github" style="width:18px;height:18px;" />
            </a>
          </div>
        </div>

        <div>
          <h5>{{ $t('footer.explore') }}</h5>
          <ul>
            <li><NuxtLink :to="localePath('/blog')">{{ $t('nav.blog') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/gallery')">{{ $t('nav.gallery') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/#games')">{{ $t('nav.games') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/#team')">{{ $t('nav.team') }}</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h5>{{ $t('footer.company') }}</h5>
          <ul>
            <li><NuxtLink :to="localePath('/#about')">{{ $t('footer.about') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/contact')">{{ $t('nav.contact') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/#join')">{{ $t('nav.joinUs') }}</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h5>{{ $t('footer.legal') }}</h5>
          <ul>
            <li><NuxtLink :to="localePath('/terms')">{{ $t('footer.terms') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/privacy')">{{ $t('footer.privacy') }}</NuxtLink></li>
            <li><button class="cookie-manage-btn" @click="$emit('manageCookies')">{{ $t('footer.cookies') }}</button></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <span>{{ $t('footer.copyright') }} ❤️</span>
        <div class="nav-lang" style="border-color:rgba(255,241,236,0.3);">
          <button :class="{ active: locale === 'en' }" @click="setLocale('en')" style="color:var(--cream);">EN</button>
          <button :class="{ active: locale === 'pl' }" @click="setLocale('pl')" style="color:var(--cream);">PL</button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()
const localePath = useLocalePath()
defineEmits(['manageCookies'])
</script>

<style scoped>
.cookie-manage-btn {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  font-size: 15px;
  color: inherit;
  cursor: pointer;
  text-align: left;
}
.cookie-manage-btn:hover { color: var(--magenta); }
</style>
