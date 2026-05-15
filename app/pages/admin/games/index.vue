<template>
  <div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;flex-wrap:wrap;gap:16px;">
      <div>
        <h1 class="display" style="font-size:48px;margin:0 0 4px;">Games</h1>
        <p style="color:color-mix(in oklab,var(--ink) 60%,transparent);margin:0;">{{ games?.length || 0 }} total games</p>
      </div>
      <NuxtLink to="/admin/games/new" class="btn">
        <UIcon name="i-heroicons-plus" />
        Add Game
      </NuxtLink>
    </div>

    <div v-if="games && games.length" style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;overflow:hidden;box-shadow:5px 5px 0 var(--ink);">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Platform</th>
            <th>Priority</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="game in games" :key="game.id">
            <td>
              <div style="font-weight:600;display:flex;align-items:center;gap:8px;">
                <span style="font-size:20px;">{{ game.coverEmoji }}</span>
                {{ game.title }}
              </div>
              <div style="font-size:11px;font-family:'JetBrains Mono',monospace;color:color-mix(in oklab,var(--ink) 50%,transparent);">{{ game.slug }}</div>
            </td>
            <td><span class="tag">{{ game.status }}</span></td>
            <td><span class="tag dark">{{ game.platform }}</span></td>
            <td>
              <UIcon v-if="game.isPriority" name="i-heroicons-star-solid" style="color:var(--yellow);width:18px;height:18px;" />
              <UIcon v-else name="i-heroicons-star" style="width:18px;height:18px;opacity:0.3;" />
            </td>
            <td>
              <UIcon v-if="game.isFeatured" name="i-heroicons-check-circle-solid" style="color:var(--magenta);width:18px;height:18px;" />
              <UIcon v-else name="i-heroicons-x-circle" style="width:18px;height:18px;opacity:0.3;" />
            </td>
            <td>
              <div style="display:flex;gap:6px;">
                <NuxtLink :to="`/admin/games/${game.id}`" class="btn sm ghost">
                  <UIcon name="i-heroicons-pencil" />
                </NuxtLink>
                <button class="btn sm" style="background:var(--pink);" @click="confirmDelete(game.id, game.title)">
                  <UIcon name="i-heroicons-trash" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Teleport to="body">
      <div v-if="deleteConfirm" style="position:fixed;inset:0;background:rgba(27,11,46,0.7);z-index:200;display:flex;align-items:center;justify-content:center;padding:24px;">
        <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:20px;padding:32px;max-width:400px;width:100%;box-shadow:10px 10px 0 var(--ink);">
          <h3 class="display" style="font-size:32px;margin:0 0 12px;">Delete game?</h3>
          <p style="margin:0 0 24px;">"{{ deleteConfirm.title }}"</p>
          <div style="display:flex;gap:12px;">
            <button class="btn" style="background:var(--pink);" @click="doDelete">Delete</button>
            <button class="btn ghost" @click="deleteConfirm = null">Cancel</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
const { data: games, refresh } = await useFetch<any[]>('/api/games/admin', { server: false })
const deleteConfirm = ref<{ id: number, title: string } | null>(null)

function confirmDelete(id: number, title: string) { deleteConfirm.value = { id, title } }

async function doDelete() {
  if (!deleteConfirm.value) return
  await $fetch(`/api/games/${deleteConfirm.value.id}`, { method: 'DELETE' })
  deleteConfirm.value = null
  await refresh()
}
</script>
