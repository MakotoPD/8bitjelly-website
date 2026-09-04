<template>
  <div class="image-upload">
    <div v-if="modelValue" class="image-preview">
      <img :src="modelValue" :alt="label" />
      <div class="image-preview-actions">
        <button type="button" class="btn sm ghost" @click="triggerInput">
          <UIcon name="i-heroicons-arrow-path" /> Change
        </button>
        <button type="button" class="btn sm" style="background:var(--pink);" @click="$emit('update:modelValue', null)">
          <UIcon name="i-heroicons-trash" /> Remove
        </button>
      </div>
    </div>

    <div v-else class="upload-drop" :class="{ dragging }" @click="triggerInput" @dragover.prevent="dragging = true" @dragleave="dragging = false" @drop.prevent="onDrop">
      <div v-if="uploading" style="display:flex;flex-direction:column;align-items:center;gap:12px;">
        <UIcon name="i-heroicons-arrow-path" style="width:28px;height:28px;animation:spin 1s linear infinite;opacity:0.5;" />
        <span style="font-size:13px;opacity:0.6;">Uploading...</span>
      </div>
      <div v-else style="display:flex;flex-direction:column;align-items:center;gap:8px;">
        <UIcon name="i-heroicons-cloud-arrow-up" style="width:32px;height:32px;opacity:0.4;" />
        <span style="font-size:13px;font-weight:600;">{{ label }}</span>
        <span style="font-size:11px;opacity:0.5;">Click or drag & drop · JPG, PNG, WebP</span>
      </div>
    </div>

    <div v-if="error" style="margin-top:8px;padding:8px 12px;background:var(--pink);border:1.5px solid var(--ink);border-radius:8px;font-size:13px;">
      {{ error }}
    </div>

    <input ref="inputRef" type="file" :accept="accept" style="display:none;" @change="onFileChange" />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: string | null
  label?: string
  accept?: string
}>(), {
  label: 'Upload image',
  accept: 'image/jpeg,image/png,image/webp,image/gif',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const inputRef = ref<HTMLInputElement>()
const uploading = ref(false)
const dragging = ref(false)
const error = ref('')

function triggerInput() {
  inputRef.value?.click()
}

async function uploadFile(file: File) {
  if (!file.type.startsWith('image/')) {
    error.value = 'Only image files allowed'
    return
  }
  if (file.size > 10 * 1024 * 1024) {
    error.value = 'File too large (max 10MB)'
    return
  }

  error.value = ''
  uploading.value = true
  try {
    const form = new FormData()
    form.append('file', file)
    const res = await $fetch<{ url: string }>('/api/upload', { method: 'POST', body: form })
    emit('update:modelValue', res.url)
  } catch (e: any) {
    error.value = e?.data?.message || 'Upload failed'
  } finally {
    uploading.value = false
  }
}

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) uploadFile(file)
}

function onDrop(e: DragEvent) {
  dragging.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) uploadFile(file)
}
</script>

<style scoped>
.image-upload { width: 100%; }

.upload-drop {
  border: 2.5px dashed var(--ink);
  border-radius: 12px;
  padding: 32px 16px;
  text-align: center;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  background: color-mix(in oklab, var(--cream) 80%, transparent);
}
.upload-drop:hover, .upload-drop.dragging {
  background: var(--yellow);
  border-style: solid;
}

.image-preview {
  position: relative;
  border: 2.5px solid var(--ink);
  border-radius: 12px;
  overflow: hidden;
}
.image-preview img {
  display: block;
  width: 100%;
  max-height: 240px;
  object-fit: cover;
}
.image-preview-actions {
  display: flex;
  gap: 8px;
  padding: 10px;
  background: var(--cream);
  border-top: 2px solid var(--ink);
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>
