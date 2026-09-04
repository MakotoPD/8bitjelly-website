<template>
  <BlogPostForm :post="null" @saved="navigateTo('/admin/blog')" />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
</script>
