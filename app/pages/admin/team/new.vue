<template>
  <TeamMemberForm :member="null" @saved="navigateTo('/admin/team')" />
</template>
<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
</script>
