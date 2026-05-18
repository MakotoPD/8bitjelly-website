<template>
  <div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;flex-wrap:wrap;gap:16px;">
      <div>
        <h1 class="display" style="font-size:48px;margin:0 0 4px;">Team</h1>
        <p style="color:color-mix(in oklab,var(--ink) 60%,transparent);margin:0;">{{ membersList.length }} members</p>
      </div>
      <NuxtLink to="/admin/team/new" class="btn">
        <UIcon name="i-heroicons-plus" />
        Add Member
      </NuxtLink>
    </div>

    <div v-if="membersList.length" style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;overflow:hidden;box-shadow:5px 5px 0 var(--ink);">
      <table class="admin-table">
        <thead>
          <tr>
            <th style="width:36px;"></th>
            <th>Member</th>
            <th>Roles</th>
            <th>Status</th>
            <th>Socials</th>
            <th>Actions</th>
          </tr>
        </thead>
        <draggable
          v-model="membersList"
          tag="tbody"
          item-key="id"
          handle=".drag-handle"
          :animation="200"
          ghost-class="dragging-row"
          @end="onDragEnd"
        >
          <template #item="{ element: m }">
            <tr>
              <td style="padding:0 8px;">
                <UIcon name="i-heroicons-bars-3" class="drag-handle" style="width:18px;height:18px;opacity:0.35;cursor:grab;display:block;" />
              </td>
              <td>
                <div style="display:flex;align-items:center;gap:10px;">
                  <div style="width:36px;height:36px;background:var(--pink);border:2px solid var(--ink);border-radius:8px;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:18px;flex:none;">
                    <img v-if="m.avatarImage" :src="m.avatarImage" style="width:100%;height:100%;object-fit:cover;" alt="" />
                    <span v-else>{{ m.avatarEmoji }}</span>
                  </div>
                  <div style="font-weight:600;">{{ m.name }}</div>
                </div>
              </td>
              <td>
                <div style="display:flex;gap:4px;flex-wrap:wrap;">
                  <span v-for="role in m.roles" :key="role" class="tag" style="font-size:7px;padding:3px 6px;">{{ role }}</span>
                </div>
              </td>
              <td>
                <span :class="`tag ${m.isActive ? 'magenta' : ''}`">{{ m.isActive ? 'Active' : 'Inactive' }}</span>
              </td>
              <td>
                <div style="display:flex;gap:4px;">
                  <UIcon v-if="m.instagram" name="i-simple-icons-instagram" style="width:14px;height:14px;" />
                  <UIcon v-if="m.github" name="i-simple-icons-github" style="width:14px;height:14px;" />
                  <UIcon v-if="m.artstation" name="i-simple-icons-artstation" style="width:14px;height:14px;" />
                </div>
              </td>
              <td>
                <div style="display:flex;gap:6px;">
                  <NuxtLink :to="`/admin/team/${m.id}`" class="btn sm ghost"><UIcon name="i-heroicons-pencil" /></NuxtLink>
                  <button class="btn sm" style="background:var(--pink);" @click="confirmDelete(m.id, m.name)"><UIcon name="i-heroicons-trash" /></button>
                </div>
              </td>
            </tr>
          </template>
        </draggable>
      </table>
    </div>

    <Teleport to="body">
      <div v-if="deleteConfirm" style="position:fixed;inset:0;background:rgba(27,11,46,0.7);z-index:200;display:flex;align-items:center;justify-content:center;padding:24px;">
        <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:20px;padding:32px;max-width:400px;width:100%;box-shadow:10px 10px 0 var(--ink);">
          <h3 class="display" style="font-size:32px;margin:0 0 12px;">Remove member?</h3>
          <p style="margin:0 0 24px;">{{ deleteConfirm.title }}</p>
          <div style="display:flex;gap:12px;">
            <button class="btn" style="background:var(--pink);" @click="doDelete">Remove</button>
            <button class="btn ghost" @click="deleteConfirm = null">Cancel</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'

definePageMeta({ layout: 'admin', middleware: 'admin' })
const { data: members, refresh } = await useFetch<any[]>('/api/team/admin', { server: false })
const deleteConfirm = ref<{ id: number, title: string } | null>(null)

const membersList = ref<any[]>([])
watch(members, val => { membersList.value = val ?? [] }, { immediate: true })

const reorderTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

function onDragEnd() {
  if (reorderTimeout.value) clearTimeout(reorderTimeout.value)
  reorderTimeout.value = setTimeout(async () => {
    await $fetch('/api/team/reorder', {
      method: 'PATCH',
      body: { ids: membersList.value.map((m: any) => m.id) },
    })
  }, 600)
}

function confirmDelete(id: number, title: string) { deleteConfirm.value = { id, title } }
async function doDelete() {
  if (!deleteConfirm.value) return
  await $fetch(`/api/team/${deleteConfirm.value.id}`, { method: 'DELETE' })
  deleteConfirm.value = null
  await refresh()
}
</script>

<style scoped>
.drag-handle:active { cursor: grabbing; }
.dragging-row { opacity: 0.3; }
</style>
