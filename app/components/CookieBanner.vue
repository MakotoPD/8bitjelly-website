<template>
  <Transition name="cookie">
    <div v-if="visible" class="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div class="cookie-inner">
        <div class="cookie-text">
          <p class="cookie-title pixel">{{ locale === 'pl' ? '🍪 Pliki Cookie' : '🍪 Cookies' }}</p>
          <p class="cookie-desc">
            <template v-if="locale === 'pl'">
              Używamy Google Analytics, aby lepiej rozumieć ruch na stronie. Wymaga to plików cookie. Możesz odmówić — strona działa bez nich.
              <NuxtLink :to="localePath('/privacy')" style="color:var(--magenta);text-decoration:underline;">Polityka prywatności</NuxtLink>
            </template>
            <template v-else>
              We use Google Analytics to understand site traffic. This requires cookies. You can decline — the site works fine without them.
              <NuxtLink :to="localePath('/privacy')" style="color:var(--magenta);text-decoration:underline;">Privacy Policy</NuxtLink>
            </template>
          </p>
        </div>
        <div class="cookie-actions">
          <button class="btn ghost sm" @click="decline">
            {{ locale === 'pl' ? 'Odrzuć' : 'Decline' }}
          </button>
          <button class="btn sm" @click="accept">
            {{ locale === 'pl' ? 'Akceptuj' : 'Accept' }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const { gtag } = useGtag()

const visible = ref(false)
const STORAGE_KEY = 'cookie_consent'

onMounted(() => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    visible.value = true
  } else if (stored === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' })
  }
})

function accept() {
  localStorage.setItem(STORAGE_KEY, 'granted')
  gtag('consent', 'update', { analytics_storage: 'granted' })
  visible.value = false
}

function decline() {
  localStorage.setItem(STORAGE_KEY, 'denied')
  visible.value = false
}

// Exposed so footer "Manage cookies" link can reopen the banner
defineExpose({ reopen: () => { visible.value = true } })
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  width: calc(100% - 40px);
  max-width: 700px;
  background: var(--cream);
  border: 2.5px solid var(--ink);
  border-radius: 18px;
  box-shadow: 8px 8px 0 var(--ink);
}
.cookie-inner {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 24px;
  flex-wrap: wrap;
}
.cookie-text { flex: 1; min-width: 200px; }
.cookie-title {
  font-size: 9px;
  margin: 0 0 8px;
}
.cookie-desc {
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
  color: color-mix(in oklab, var(--ink) 75%, transparent);
}
.cookie-actions {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.cookie-enter-active,
.cookie-leave-active { transition: transform 0.3s ease, opacity 0.3s ease; }
.cookie-enter-from,
.cookie-leave-to { transform: translateX(-50%) translateY(120%); opacity: 0; }

@media (max-width: 600px) {
  .cookie-banner { bottom: 12px; }
  .cookie-inner { padding: 16px 18px; }
  .cookie-actions { width: 100%; justify-content: flex-end; }
}
</style>
