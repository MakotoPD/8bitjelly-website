<template>
  <div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;flex-wrap:wrap;gap:16px;">
      <div>
        <h1 class="display" style="font-size:48px;margin:0 0 4px;">Gallery</h1>
        <p style="color:color-mix(in oklab,var(--ink) 60%,transparent);margin:0;">Manage gallery images</p>
      </div>
    </div>

    <!-- Add new image form -->
    <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:28px;box-shadow:5px 5px 0 var(--ink);margin-bottom:32px;">
      <h2 class="display" style="font-size:24px;margin:0 0 20px;">Add Image</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
        <div class="field">
          <label>Game</label>
          <select v-model="newItem.gameTitle" class="select">
            <option value="" disabled>Select a game...</option>
            <option v-for="title in gameTitles" :key="title" :value="title">{{ title }}</option>
          </select>
        </div>
        <div class="field">
          <label>Alt text</label>
          <input v-model="newItem.altText" class="input" placeholder="Describe the image..." />
        </div>
      </div>
      <ImageUpload v-model="newItem.imageUrl" label="Upload image" style="margin-bottom:16px;" />
      <button class="btn" :disabled="!newItem.gameTitle || !newItem.imageUrl || adding" @click="addImage">
        <UIcon name="i-heroicons-plus" />
        Add to Gallery
      </button>
    </div>

    <!-- Gallery items grouped by game -->
    <template v-if="gallery && Object.keys(gallery).length">
      <template v-for="(images, gameTitle) in gallery" :key="gameTitle">
        <h2 class="display" style="font-size:32px;margin:24px 0 16px;border-bottom:2px solid var(--ink);padding-bottom:12px;">{{ gameTitle }}</h2>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:16px;">
          <div v-for="img in images" :key="img.id" style="border:2.5px solid var(--ink);border-radius:10px;overflow:hidden;box-shadow:3px 3px 0 var(--ink);background:var(--cream);">
            <div style="position:relative;">
              <img :src="img.imageUrl" :alt="img.altText" style="width:100%;aspect-ratio:16/9;object-fit:cover;display:block;" />
              <button
                style="position:absolute;top:6px;right:6px;background:var(--pink);border:2px solid var(--ink);border-radius:6px;width:28px;height:28px;display:flex;align-items:center;justify-content:center;cursor:pointer;"
                @click="deleteImage(img.id)"
              >
                <UIcon name="i-heroicons-x-mark" style="width:14px;height:14px;" />
              </button>
            </div>
            <div style="padding:8px;display:grid;gap:6px;border-top:2.5px solid var(--ink);">
              <select :value="img.gameTitle" class="select" style="font-size:13px;padding:6px 8px;" @change="save(img, { gameTitle: ($event.target as HTMLSelectElement).value })">
                <option v-for="title in gameTitles" :key="title" :value="title">{{ title }}</option>
              </select>
              <input :value="img.altText" class="input" style="font-size:13px;padding:6px 8px;" placeholder="Alt text" @change="save(img, { altText: ($event.target as HTMLInputElement).value })" />
              <input :value="img.sortOrder" type="number" class="input" style="font-size:13px;padding:6px 8px;" placeholder="Sort" @change="save(img, { sortOrder: ($event.target as HTMLInputElement).value })" />
            </div>
          </div>
        </div>
      </template>
    </template>

    <div v-else style="text-align:center;padding:60px;">
      <p class="pixel" style="font-size:12px;opacity:0.5;">No gallery images yet. Add the first one above!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
const { data: gallery, refresh } = await useFetch<Record<string, any[]>>('/api/gallery', { server: false })
const { data: games } = await useFetch<{ title: string }[]>('/api/games', { server: false })
const adding = ref(false)
const newItem = reactive({ gameTitle: '', imageUrl: '', altText: '' })

// games from the catalogue + any title already used in the gallery (legacy rows)
const gameTitles = computed(() => [...new Set([
  ...(games.value || []).map(g => g.title),
  ...Object.keys(gallery.value || {}),
])].sort())

async function addImage() {
  if (!newItem.gameTitle || !newItem.imageUrl) return
  adding.value = true
  try {
    await $fetch('/api/gallery', { method: 'POST', body: { ...newItem } })
    Object.assign(newItem, { gameTitle: '', imageUrl: '', altText: '' })
    await refresh()
  } finally {
    adding.value = false
  }
}

async function save(img: any, patch: Record<string, unknown>) {
  await $fetch(`/api/gallery/${img.id}`, { method: 'PUT', body: { ...img, ...patch } })
  await refresh()
}

async function deleteImage(id: number) {
  await $fetch(`/api/gallery/${id}`, { method: 'DELETE' })
  await refresh()
}
</script>
