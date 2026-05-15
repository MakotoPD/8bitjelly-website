<template>
  <div>
    <div v-if="pending" style="text-align:center;padding:60px;"><p class="pixel">Loading...</p></div>
    <TeamMemberForm v-else-if="member" :member="member" @saved="navigateTo('/admin/team')" />
  </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
const route = useRoute()
const { data: member, pending } = await useFetch(`/api/team/${route.params.id}`, { server: false })
</script>
