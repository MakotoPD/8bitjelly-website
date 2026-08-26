<template>
  <Teleport to="body">
    <div
      v-if="src"
      style="position:fixed;inset:0;background:rgba(27,11,46,0.92);z-index:200;display:flex;align-items:center;justify-content:center;padding:24px;"
      @click="src = null"
    >
      <img :src="src" alt="" style="max-width:90vw;max-height:90vh;border:3px solid var(--ink);border-radius:12px;box-shadow:10px 10px 0 var(--ink);" />
      <button style="position:absolute;top:20px;right:20px;background:var(--cream);border:2px solid var(--ink);border-radius:8px;width:40px;height:40px;display:flex;align-items:center;justify-content:center;cursor:pointer;" @click.stop="src = null">
        <UIcon name="i-heroicons-x-mark" style="width:20px;height:20px;" />
      </button>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const src = defineModel<string | null>({ default: null })
useEventListener('keydown', (e: KeyboardEvent) => { if (e.key === 'Escape') src.value = null })
</script>
