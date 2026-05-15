<template>
  <div style="display:flex; min-height:100vh; background:#f5f5f5;">
    <aside class="admin-sidebar">
      <NuxtLink to="/" class="logo" style="margin-bottom:24px;">
        8BitJelly
      </NuxtLink>

      <div style="font-family:'Press Start 2P',monospace; font-size:9px; color:rgba(255,241,236,0.4); text-transform:uppercase; letter-spacing:0.08em; padding:8px 14px; margin-top:8px;">
        Content
      </div>

      <NuxtLink to="/admin" class="admin-nav-link" exact-active-class="router-link-active">
        <UIcon name="i-heroicons-squares-2x2" style="width:16px;height:16px;" />
        Dashboard
      </NuxtLink>
      <NuxtLink to="/admin/blog" class="admin-nav-link">
        <UIcon name="i-heroicons-document-text" style="width:16px;height:16px;" />
        Blog
      </NuxtLink>
      <NuxtLink to="/admin/games" class="admin-nav-link">
        <UIcon name="i-heroicons-puzzle-piece" style="width:16px;height:16px;" />
        Gry
      </NuxtLink>
      <NuxtLink to="/admin/team" class="admin-nav-link">
        <UIcon name="i-heroicons-user-group" style="width:16px;height:16px;" />
        Ekipa
      </NuxtLink>
      <NuxtLink to="/admin/gallery" class="admin-nav-link">
        <UIcon name="i-heroicons-photo" style="width:16px;height:16px;" />
        Galeria
      </NuxtLink>
      <NuxtLink to="/admin/lookings" class="admin-nav-link">
        <UIcon name="i-heroicons-briefcase" style="width:16px;height:16px;" />
        Pozycje
      </NuxtLink>

      <div style="flex:1;" />

      <button class="admin-nav-link" style="border:none;background:none;color:inherit;text-align:left;cursor:pointer;" @click="logout">
        <UIcon name="i-heroicons-arrow-right-on-rectangle" style="width:16px;height:16px;" />
        Wyloguj
      </button>
    </aside>

    <div class="admin-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  navigateTo('/admin/login')
}
</script>
