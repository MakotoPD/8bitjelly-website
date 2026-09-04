<template>
  <div style="display:flex; min-height:100vh; background:#f5f5f5;">
    <aside class="admin-sidebar">
      <NuxtLink to="/" class="logo" style="margin-bottom:24px;">
        <span class="logo-mark"></span>
        8BitJelly
      </NuxtLink>

      <div style="font-family:'Press Start 2P',monospace; font-size:9px; color:rgba(255,241,236,0.4); text-transform:uppercase; letter-spacing:0.08em; padding:8px 14px; margin-top:8px;">
        Mój profil
      </div>

      <NuxtLink to="/member" class="admin-nav-link" exact-active-class="router-link-active">
        <UIcon name="i-heroicons-user-circle" style="width:16px;height:16px;" />
        Profil
      </NuxtLink>
      <NuxtLink to="/member/security" class="admin-nav-link">
        <UIcon name="i-heroicons-shield-check" style="width:16px;height:16px;" />
        Bezpieczeństwo
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
  await $fetch('/api/member/auth/logout', { method: 'POST' })
  navigateTo('/member/login')
}
</script>
