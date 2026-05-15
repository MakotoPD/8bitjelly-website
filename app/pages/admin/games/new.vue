<template>
  <GameForm :game="null" @saved="navigateTo('/admin/games')" />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
</script>
