<template>
  <div>
    <h1 class="display" style="font-size:48px;margin:0 0 8px;">Dashboard</h1>
    <p style="color:color-mix(in oklab,var(--ink) 60%,transparent);margin:0 0 40px;">Welcome back! Here's what's happening.</p>

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:40px;">
      <div v-for="stat in stats" :key="stat.label" :style="`background:${stat.color};border:2.5px solid var(--ink);border-radius:16px;padding:24px;box-shadow:5px 5px 0 var(--ink);`">
        <div class="display" style="font-size:52px;line-height:1;">{{ stat.value }}</div>
        <div class="pixel" style="font-size:9px;margin-top:8px;text-transform:uppercase;">{{ stat.label }}</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
      <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:24px;box-shadow:5px 5px 0 var(--ink);">
        <h2 class="display" style="font-size:28px;margin:0 0 20px;">Recent Posts</h2>
        <div v-if="recentBlogs && recentBlogs.length" style="display:grid;gap:10px;">
          <div v-for="post in recentBlogs.slice(0, 5)" :key="post.id" style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border:1.5px solid var(--cream-2);border-radius:8px;">
            <div>
              <div style="font-weight:600;font-size:14px;">{{ post.titleEn }}</div>
              <div style="font-size:11px;font-family:'JetBrains Mono',monospace;color:color-mix(in oklab,var(--ink) 50%,transparent);">{{ formatDate(post.createdAt) }}</div>
            </div>
            <span :class="`tag ${post.isPublished ? 'magenta' : ''}`">{{ post.isPublished ? 'Published' : 'Draft' }}</span>
          </div>
        </div>
        <p v-else style="color:color-mix(in oklab,var(--ink) 50%,transparent);font-size:14px;">No posts yet.</p>
        <NuxtLink to="/admin/blog" class="btn ghost sm" style="margin-top:16px;">Manage Blog →</NuxtLink>
      </div>

      <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:24px;box-shadow:5px 5px 0 var(--ink);">
        <h2 class="display" style="font-size:28px;margin:0 0 20px;">Quick Links</h2>
        <div style="display:grid;gap:10px;">
          <NuxtLink to="/admin/blog/new" class="btn ghost" style="justify-content:flex-start;gap:12px;">
            <UIcon name="i-heroicons-plus-circle" />
            New Blog Post
          </NuxtLink>
          <NuxtLink to="/admin/games/new" class="btn ghost" style="justify-content:flex-start;gap:12px;">
            <UIcon name="i-heroicons-plus-circle" />
            Add Game
          </NuxtLink>
          <NuxtLink to="/admin/team/new" class="btn ghost" style="justify-content:flex-start;gap:12px;">
            <UIcon name="i-heroicons-plus-circle" />
            Add Team Member
          </NuxtLink>
          <NuxtLink to="/admin/gallery" class="btn ghost" style="justify-content:flex-start;gap:12px;">
            <UIcon name="i-heroicons-photo" />
            Gallery
          </NuxtLink>
        </div>
        <div style="margin-top:24px;padding-top:24px;border-top:2px solid var(--cream-2);">
          <NuxtLink to="/" target="_blank" class="btn sm ghost" style="gap:8px;">
            <UIcon name="i-heroicons-arrow-top-right-on-square" />
            View Site
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const recentBlogs = ref<any[]>([])
const stats = ref([
  { label: 'Blog Posts', value: 0, color: 'var(--pink)' },
  { label: 'Games', value: 0, color: 'var(--yellow)' },
  { label: 'Team Members', value: 0, color: 'var(--mint)' },
  { label: 'Published', value: 0, color: 'var(--sky)' },
])

onMounted(async () => {
  const [blogsRes, gamesRes, teamRes] = await Promise.all([
    $fetch<any[]>('/api/blogs/admin').catch(() => []),
    $fetch<any[]>('/api/games/admin').catch(() => []),
    $fetch<any[]>('/api/team/admin').catch(() => []),
  ])
  recentBlogs.value = blogsRes
  stats.value = [
    { label: 'Blog Posts', value: blogsRes.length, color: 'var(--pink)' },
    { label: 'Games', value: gamesRes.length, color: 'var(--yellow)' },
    { label: 'Team Members', value: teamRes.length, color: 'var(--mint)' },
    { label: 'Published', value: blogsRes.filter((b: any) => b.isPublished).length, color: 'var(--sky)' },
  ]
})

function formatDate(d: string | Date | null) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>
