<template>
  <div ref="el" />
</template>

<script setup lang="ts">
const model = defineModel<string>({ default: '' })
const el = ref<HTMLElement>()
const siteKey = useRuntimeConfig().public.turnstileSiteKey

let widgetId: string | undefined
let loader: Promise<any> | undefined

function load() {
  if ((window as any).turnstile) return Promise.resolve((window as any).turnstile)
  loader ||= new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    s.async = true
    s.onload = () => resolve((window as any).turnstile)
    s.onerror = reject
    document.head.appendChild(s)
  })
  return loader
}

onMounted(async () => {
  if (!siteKey || !el.value) return
  const turnstile = await load()
  widgetId = turnstile.render(el.value, {
    sitekey: siteKey,
    callback: (token: string) => { model.value = token },
    'expired-callback': () => { model.value = '' },
    'error-callback': () => { model.value = '' },
  })
})

onBeforeUnmount(() => {
  if (widgetId) (window as any).turnstile?.remove(widgetId)
})

// tokens are single-use — call after a successful submit to allow another one
defineExpose({
  reset() {
    if (widgetId) (window as any).turnstile?.reset(widgetId)
    model.value = ''
  },
})
</script>
