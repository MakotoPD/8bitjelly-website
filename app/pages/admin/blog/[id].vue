<template>
  <div>
    <div v-if="pending" style="text-align:center;padding:60px;">
      <p class="pixel">Loading...</p>
    </div>
    <BlogPostForm v-else-if="post" :post="post" @saved="navigateTo('/admin/blog')" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
const route = useRoute()
const { data: post, pending } = await useFetch(`/api/blogs/${route.params.id}`, { server: false })
</script>
