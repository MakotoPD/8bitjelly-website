<template>
  <NuxtLayout>
    <section style="min-height:72vh;display:grid;place-items:center;padding:120px 0 100px;">
      <div class="wrap" style="text-align:center;display:grid;gap:24px;justify-items:center;">
        <span class="eyebrow">{{ $t('error.eyebrow') }}</span>

        <h1 class="display" style="font-size:clamp(80px,18vw,190px);margin:0;color:var(--magenta);">
          {{ error?.statusCode || 500 }}
        </h1>

        <h2 class="display" style="font-size:clamp(26px,5vw,44px);margin:0;max-width:16ch;">
          {{ $t(`error.${key}.title`) }}
        </h2>

        <p style="font-size:18px;max-width:52ch;color:color-mix(in oklab,var(--ink) 80%,transparent);margin:0;">
          {{ $t(`error.${key}.text`) }}
        </p>

        <p v-if="error?.message && showDetails" class="mono" style="font-size:13px;opacity:0.6;word-break:break-word;max-width:60ch;">
          {{ error.message }}
        </p>

        <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:8px;">
          <button class="btn" @click="handleError">{{ $t('common.backToHome') }}</button>
          <NuxtLink :to="localePath('/contact')" class="btn ghost">{{ $t('nav.contact') }}</NuxtLink>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const localePath = useLocalePath()
const { t } = useI18n()

// only 404/403/500 have their own copy; everything else falls back to 500
const key = computed(() => ([404, 403, 500].includes(props.error?.statusCode) ? props.error.statusCode : 500))
const showDetails = import.meta.dev

useHead({
  title: () => `${props.error?.statusCode || 500} — ${t(`error.${key.value}.title`)}`,
  meta: [{ name: 'robots', content: 'noindex' }],
})

const handleError = () => clearError({ redirect: localePath('/') })
</script>
