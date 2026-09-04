<template>
  <div>
    <div v-if="pending" style="text-align:center;padding:60px;"><p class="pixel">Loading...</p></div>
    <GameForm v-else-if="game" :game="game" @saved="navigateTo('/admin/games')" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
const route = useRoute()
const { data: game, pending } = await useFetch(`/api/games/${route.params.id}`, { server: false })
</script>
