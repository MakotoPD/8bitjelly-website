<template>
  <div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;flex-wrap:wrap;gap:16px;">
      <div>
        <h1 class="display" style="font-size:48px;margin:0 0 4px;">Open Positions</h1>
        <p style="color:color-mix(in oklab,var(--ink) 60%,transparent);margin:0;">Positions shown in the contact form</p>
      </div>
    </div>

    <!-- Add form -->
    <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:28px;box-shadow:5px 5px 0 var(--ink);margin-bottom:32px;">
      <h2 class="display" style="font-size:24px;margin:0 0 20px;">Add Position</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr auto;gap:16px;align-items:end;">
        <div class="field">
          <label>Title (English) <span class="req">*</span></label>
          <input v-model="newItem.titleEn" class="input" placeholder="e.g. 2D Artist" />
        </div>
        <div class="field">
          <label>Title (Polish)</label>
          <input v-model="newItem.titlePl" class="input" placeholder="np. Grafik 2D" />
        </div>
        <button class="btn" :disabled="!newItem.titleEn || adding" @click="addLooking">
          <UIcon name="i-heroicons-plus" />
          Add
        </button>
      </div>
    </div>

    <div v-if="lookings && lookings.length" style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;overflow:hidden;box-shadow:5px 5px 0 var(--ink);">
      <table class="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>English</th>
            <th>Polish</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="l in lookings" :key="l.id">
            <td class="pixel" style="font-size:9px;">{{ l.sortOrder }}</td>
            <td style="font-weight:600;">{{ l.titleEn }}</td>
            <td>{{ l.titlePl }}</td>
            <td>
              <span :class="`tag ${l.isActive ? 'magenta' : ''}`">{{ l.isActive ? 'Active' : 'Inactive' }}</span>
            </td>
            <td>
              <button class="btn sm" style="background:var(--pink);" @click="deleteLooking(l.id)">
                <UIcon name="i-heroicons-trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else style="text-align:center;padding:60px;background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;">
      <p class="pixel" style="font-size:12px;opacity:0.5;">No open positions yet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
const { data: lookings, refresh } = await useFetch<any[]>('/api/lookings/admin', { server: false })
const adding = ref(false)
const newItem = reactive({ titleEn: '', titlePl: '' })

async function addLooking() {
  if (!newItem.titleEn) return
  adding.value = true
  try {
    await $fetch('/api/lookings', { method: 'POST', body: { ...newItem } })
    Object.assign(newItem, { titleEn: '', titlePl: '' })
    await refresh()
  } finally {
    adding.value = false
  }
}

async function deleteLooking(id: number) {
  await $fetch(`/api/lookings/${id}`, { method: 'DELETE' })
  await refresh()
}
</script>
