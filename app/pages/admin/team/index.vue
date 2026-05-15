<template>
  <div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;flex-wrap:wrap;gap:16px;">
      <div>
        <h1 class="display" style="font-size:48px;margin:0 0 4px;">Team</h1>
        <p style="color:color-mix(in oklab,var(--ink) 60%,transparent);margin:0;">{{ members?.length || 0 }} members</p>
      </div>
      <NuxtLink to="/admin/team/new" class="btn">
        <UIcon name="i-heroicons-plus" />
        Add Member
      </NuxtLink>
    </div>

    <div v-if="members && members.length" style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;overflow:hidden;box-shadow:5px 5px 0 var(--ink);">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Member</th>
            <th>Roles</th>
            <th>Status</th>
            <th>Socials</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="m in members" :key="m.id">
            <td>
              <div style="display:flex;align-items:center;gap:10px;">
                <div style="width:36px;height:36px;background:var(--pink);border:2px solid var(--ink);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;flex:none;">
                  {{ m.avatarEmoji }}
                </div>
                <div>
                  <div style="font-weight:600;">{{ m.name }}</div>
                  <div style="font-size:11px;font-family:'JetBrains Mono',monospace;opacity:0.5;">order: {{ m.sortOrder }}</div>
                </div>
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
        </tbody>
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
definePageMeta({ layout: 'admin', middleware: 'admin' })
const { data: members, refresh } = await useFetch<any[]>('/api/team/admin', { server: false })
const deleteConfirm = ref<{ id: number, title: string } | null>(null)

function confirmDelete(id: number, title: string) { deleteConfirm.value = { id, title } }
async function doDelete() {
  if (!deleteConfirm.value) return
  await $fetch(`/api/team/${deleteConfirm.value.id}`, { method: 'DELETE' })
  deleteConfirm.value = null
  await refresh()
}
</script>
