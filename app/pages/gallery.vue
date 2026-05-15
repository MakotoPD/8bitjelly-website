<template>
  <div>
    <div class="page-hero" style="background:var(--sky);border-bottom:2px solid var(--ink);">
      <div class="wrap">
        <span class="eyebrow">8BitJelly</span>
        <h1 class="display" style="font-size:clamp(60px,10vw,140px);margin:14px 0 18px;line-height:0.9;">
          {{ $t('gallery.title') }} <em style="color:var(--magenta);">{{ $t('gallery.titleEm') }}</em>
        </h1>
        <p style="font-size:18px;max-width:540px;color:color-mix(in oklab,var(--ink) 80%,transparent);">{{ $t('gallery.subtitle') }}</p>
      </div>
    </div>

    <section style="padding:80px 0 100px;background:var(--cream);">
      <div class="wrap">
        <div v-if="pending" style="text-align:center;padding:60px;">
          <p class="pixel">{{ $t('common.loading') }}</p>
        </div>

        <template v-else-if="gallery">
          <template v-for="(images, gameTitle) in gallery" :key="gameTitle">
            <h2 class="display" style="font-size:48px;margin:48px 0 24px 0;border-bottom:2px solid var(--ink);padding-bottom:16px;">
              {{ gameTitle }}
            </h2>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:16px;">
              <div
                v-for="img in images"
                :key="img.id"
                style="border:2.5px solid var(--ink);border-radius:12px;overflow:hidden;box-shadow:4px 4px 0 var(--ink);cursor:pointer;"
                @click="lightbox = img.imageUrl"
              >
                <NuxtImg
                  :src="img.imageUrl"
                  :alt="img.altText || gameTitle"
                  style="width:100%;aspect-ratio:16/9;object-fit:cover;display:block;"
                  loading="lazy"
                />
              </div>
            </div>
          </template>
        </template>

        <div v-else style="text-align:center;padding:80px 0;">
          <p class="pixel" style="font-size:12px;">No gallery images yet.</p>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightbox"
        style="position:fixed;inset:0;background:rgba(27,11,46,0.92);z-index:200;display:flex;align-items:center;justify-content:center;padding:24px;"
        @click="lightbox = null"
      >
        <img :src="lightbox" alt="Gallery" style="max-width:90vw;max-height:90vh;border:3px solid var(--ink);border-radius:12px;box-shadow:10px 10px 0 var(--ink);" />
        <button style="position:absolute;top:20px;right:20px;background:var(--cream);border:2px solid var(--ink);border-radius:8px;width:40px;height:40px;display:flex;align-items:center;justify-content:center;cursor:pointer;" @click.stop="lightbox = null">
          <UIcon name="i-heroicons-x-mark" style="width:20px;height:20px;" />
        </button>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })
const lightbox = ref<string | null>(null)

useSeoMeta({ title: 'Gallery — 8BitJelly', description: 'Art gallery from 8BitJelly game projects.' })

const { data: gallery, pending } = await useFetch('/api/gallery')
</script>

<style scoped>
@media (max-width: 1000px) {
  div[style*="grid-template-columns:repeat(3,1fr)"] { grid-template-columns: repeat(2,1fr) !important; }
}
@media (max-width: 600px) {
  div[style*="grid-template-columns:repeat(3,1fr)"] { grid-template-columns: 1fr !important; }
}
</style>
