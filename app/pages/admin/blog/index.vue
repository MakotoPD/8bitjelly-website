<template>
  <div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;flex-wrap:wrap;gap:16px;">
      <div>
        <h1 class="display" style="font-size:48px;margin:0 0 4px;">Blog Posts</h1>
        <p style="color:color-mix(in oklab,var(--ink) 60%,transparent);margin:0;">{{ posts?.length || 0 }} total posts</p>
      </div>
      <NuxtLink to="/admin/blog/new" class="btn">
        <UIcon name="i-heroicons-plus" />
        New Post
      </NuxtLink>
    </div>

    <div v-if="posts && posts.length" style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;overflow:hidden;box-shadow:5px 5px 0 var(--ink);">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Tags</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id">
            <td>
              <div style="font-weight:600;">{{ post.titleEn }}</div>
              <div style="font-size:11px;font-family:'JetBrains Mono',monospace;color:color-mix(in oklab,var(--ink) 50%,transparent);">{{ post.slug }}</div>
            </td>
            <td>{{ post.author }}</td>
            <td>
              <span :class="`tag ${post.isPublished ? 'magenta' : ''}`">
                {{ post.isPublished ? 'Published' : 'Draft' }}
              </span>
            </td>
            <td>
              <div style="display:flex;gap:4px;flex-wrap:wrap;">
                <span v-for="tag in (post.tags || []).slice(0, 2)" :key="tag" class="tag" style="font-size:7px;padding:3px 6px;">{{ tag }}</span>
              </div>
            </td>
            <td style="font-family:'JetBrains Mono',monospace;font-size:11px;">{{ formatDate(post.createdAt) }}</td>
            <td>
              <div style="display:flex;gap:6px;">
                <NuxtLink :to="`/admin/blog/${post.id}`" class="btn sm ghost">
                  <UIcon name="i-heroicons-pencil" />
                </NuxtLink>
                <button class="btn sm" style="background:var(--pink);" @click="confirmDelete(post.id, post.titleEn)">
                  <UIcon name="i-heroicons-trash" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else style="text-align:center;padding:80px;background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;">
      <p class="pixel" style="font-size:12px;color:color-mix(in oklab,var(--ink) 50%,transparent);">No posts yet. Create your first one!</p>
      <NuxtLink to="/admin/blog/new" class="btn" style="margin-top:20px;">
        <UIcon name="i-heroicons-plus" />
        Create Post
      </NuxtLink>
    </div>

    <!-- Delete confirm modal -->
    <Teleport to="body">
      <div v-if="deleteConfirm" style="position:fixed;inset:0;background:rgba(27,11,46,0.7);z-index:200;display:flex;align-items:center;justify-content:center;padding:24px;">
        <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:20px;padding:32px;max-width:400px;width:100%;box-shadow:10px 10px 0 var(--ink);">
          <h3 class="display" style="font-size:32px;margin:0 0 12px;">Delete post?</h3>
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

const { data: posts, refresh } = await useFetch<any[]>('/api/blogs/admin', { server: false })
const deleteConfirm = ref<{ id: number, title: string } | null>(null)

function confirmDelete(id: number, title: string) {
  deleteConfirm.value = { id, title }
}

async function doDelete() {
  if (!deleteConfirm.value) return
  await $fetch(`/api/blogs/${deleteConfirm.value.id}`, { method: 'DELETE' })
  deleteConfirm.value = null
  await refresh()
}

function formatDate(d: string | Date | null) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>
