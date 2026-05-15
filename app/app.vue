<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// Konami code easter egg
onMounted(() => {
  const sequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
  let index = 0
  document.addEventListener('keydown', (e) => {
    if (e.key === sequence[index]) {
      index++
      if (index === sequence.length) {
        document.body.classList.toggle('party')
        index = 0
      }
    } else {
      index = 0
    }
  })
})
</script>
