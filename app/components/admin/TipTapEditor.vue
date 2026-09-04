<template>
  <div class="tiptap-wrapper">
    <div v-if="editor" class="tiptap-toolbar">
      <button type="button" class="tool-btn" :class="{ active: editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()" title="Bold">
        <UIcon name="i-heroicons-bold" />
      </button>
      <button type="button" class="tool-btn" :class="{ active: editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()" title="Italic">
        <UIcon name="i-heroicons-italic" />
      </button>
      <button type="button" class="tool-btn" :class="{ active: editor.isActive('underline') }" @click="editor.chain().focus().toggleUnderline().run()" title="Underline">
        <span style="text-decoration:underline;font-weight:600;">U</span>
      </button>
      <div class="tool-divider"></div>
      <button type="button" class="tool-btn" :class="{ active: editor.isActive('heading', { level: 2 }) }" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" title="Heading 2">H2</button>
      <button type="button" class="tool-btn" :class="{ active: editor.isActive('heading', { level: 3 }) }" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" title="Heading 3">H3</button>
      <div class="tool-divider"></div>
      <button type="button" class="tool-btn" :class="{ active: editor.isActive('bulletList') }" @click="editor.chain().focus().toggleBulletList().run()" title="Bullet list">
        <UIcon name="i-heroicons-list-bullet" />
      </button>
      <button type="button" class="tool-btn" :class="{ active: editor.isActive('orderedList') }" @click="editor.chain().focus().toggleOrderedList().run()" title="Ordered list">
        <UIcon name="i-heroicons-numbered-list" />
      </button>
      <button type="button" class="tool-btn" :class="{ active: editor.isActive('blockquote') }" @click="editor.chain().focus().toggleBlockquote().run()" title="Blockquote">
        <UIcon name="i-heroicons-chat-bubble-left" />
      </button>
      <button type="button" class="tool-btn" :class="{ active: editor.isActive('code') }" @click="editor.chain().focus().toggleCode().run()" title="Inline code">
        <UIcon name="i-heroicons-code-bracket" />
      </button>
      <button type="button" class="tool-btn" :class="{ active: editor.isActive('codeBlock') }" @click="editor.chain().focus().toggleCodeBlock().run()" title="Code block">
        <UIcon name="i-heroicons-code-bracket-square" />
      </button>
      <div class="tool-divider"></div>
      <button type="button" class="tool-btn" :class="{ active: editor.isActive('link') }" @click="setLink" title="Link">
        <UIcon name="i-heroicons-link" />
      </button>
      <button type="button" class="tool-btn" @click="editor.chain().focus().unsetLink().run()" :disabled="!editor.isActive('link')" title="Remove link">
        <UIcon name="i-heroicons-link-slash" />
      </button>
      <div class="tool-divider"></div>
      <button type="button" class="tool-btn" :class="{ active: editor.isActive({ textAlign: 'left' }) }" @click="editor.chain().focus().setTextAlign('left').run()" title="Align left">
        <UIcon name="i-heroicons-bars-3-bottom-left" />
      </button>
      <button type="button" class="tool-btn" :class="{ active: editor.isActive({ textAlign: 'center' }) }" @click="editor.chain().focus().setTextAlign('center').run()" title="Align center">
        <UIcon name="i-heroicons-bars-3" />
      </button>
      <button type="button" class="tool-btn" :class="{ active: editor.isActive({ textAlign: 'right' }) }" @click="editor.chain().focus().setTextAlign('right').run()" title="Align right">
        <UIcon name="i-heroicons-bars-3-bottom-right" />
      </button>
      <div class="tool-divider"></div>
      <!-- Image upload -->
      <button type="button" class="tool-btn" :class="{ 'tool-btn-uploading': imageUploading }" @click="triggerImageUpload" :disabled="imageUploading" title="Insert image">
        <UIcon v-if="!imageUploading" name="i-heroicons-photo" />
        <UIcon v-else name="i-heroicons-arrow-path" style="animation:tiptap-spin 1s linear infinite;" />
      </button>
      <input ref="imageInputEl" type="file" accept="image/*" style="display:none;" @change="onImageSelected" />
      <div class="tool-divider"></div>
      <button type="button" class="tool-btn" @click="editor.chain().focus().undo().run()" :disabled="!editor.can().undo()" title="Undo">
        <UIcon name="i-heroicons-arrow-uturn-left" />
      </button>
      <button type="button" class="tool-btn" @click="editor.chain().focus().redo().run()" :disabled="!editor.can().redo()" title="Redo">
        <UIcon name="i-heroicons-arrow-uturn-right" />
      </button>
    </div>
    <EditorContent :editor="editor" class="tiptap-content" />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'

const props = defineProps<{
  modelValue: string
  placeholder?: string
  uploadFolder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const imageInputEl = ref<HTMLInputElement>()
const imageUploading = ref(false)

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Underline,
    Link.configure({ openOnClick: false }),
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Placeholder.configure({ placeholder: props.placeholder || 'Start writing...' }),
    Image.configure({ inline: false, allowBase64: false }),
  ],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
})

watch(() => props.modelValue, (val) => {
  if (editor.value && editor.value.getHTML() !== val) {
    editor.value.commands.setContent(val, false)
  }
})

onBeforeUnmount(() => editor.value?.destroy())

function setLink() {
  const url = window.prompt('URL:', editor.value?.getAttributes('link').href || '')
  if (url === null) return
  if (url === '') {
    editor.value?.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }
  editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

function triggerImageUpload() {
  imageInputEl.value?.click()
}

async function onImageSelected(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  imageUploading.value = true
  try {
    const fd = new FormData()
    fd.append('file', file)
    const folder = props.uploadFolder || 'uploads'
    const { url } = await $fetch<{ url: string }>(`/api/upload?folder=${encodeURIComponent(folder)}`, { method: 'POST', body: fd })
    editor.value?.chain().focus().setImage({ src: url }).run()
  } catch (err) {
    console.error('Image upload failed', err)
  } finally {
    imageUploading.value = false
    if (imageInputEl.value) imageInputEl.value.value = ''
  }
}
</script>

<style>
.tiptap-wrapper {
  border: 2.5px solid var(--ink);
  border-radius: 12px;
  overflow: hidden;
}
.tiptap-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  padding: 8px 10px;
  background: var(--cream-2);
  border-bottom: 2px solid var(--ink);
}
.tool-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1.5px solid transparent;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  font-family: 'Press Start 2P', monospace;
  color: var(--ink);
  transition: background 0.1s;
}
.tool-btn:hover { background: var(--pink); border-color: var(--ink); }
.tool-btn.active { background: var(--magenta); color: white; border-color: var(--magenta); }
.tool-btn.tool-btn-uploading { background: var(--yellow); border-color: var(--ink); }
.tool-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.tool-btn svg { width: 16px; height: 16px; }
.tool-divider { width: 1px; background: color-mix(in oklab, var(--ink) 20%, transparent); margin: 4px 4px; }
.tiptap-content {
  background: white;
  min-height: 300px;
}
.tiptap-content .ProseMirror {
  padding: 20px 24px;
  min-height: 300px;
  outline: none;
  font-family: 'Fraunces', serif;
  font-size: 17px;
  line-height: 1.7;
  color: var(--ink);
}
.tiptap-content .ProseMirror h2 { font-family: 'Titan One', sans-serif; font-size: 2em; margin: 1.5em 0 0.5em; }
.tiptap-content .ProseMirror h3 { font-family: 'Titan One', sans-serif; font-size: 1.5em; margin: 1.2em 0 0.4em; }
.tiptap-content .ProseMirror p { margin: 0.8em 0; }
.tiptap-content .ProseMirror ul, .tiptap-content .ProseMirror ol { padding-left: 2em; margin: 0.8em 0; }
.tiptap-content .ProseMirror blockquote { border-left: 4px solid var(--magenta); padding-left: 1.2em; margin-left: 0; color: color-mix(in oklab, var(--ink) 65%, transparent); font-style: italic; }
.tiptap-content .ProseMirror code { font-family: 'JetBrains Mono', monospace; font-size: 0.875em; background: var(--cream-2); padding: 2px 6px; border-radius: 4px; }
.tiptap-content .ProseMirror pre { background: var(--eggplant); color: var(--cream); padding: 16px 20px; border-radius: 10px; overflow-x: auto; font-family: 'JetBrains Mono', monospace; font-size: 14px; }
.tiptap-content .ProseMirror pre code { background: none; padding: 0; }
.tiptap-content .ProseMirror a { color: var(--magenta); text-decoration: underline; }
.tiptap-content .ProseMirror img {
  max-width: 100%;
  border-radius: 10px;
  border: 2.5px solid var(--ink);
  box-shadow: 4px 4px 0 var(--ink);
  display: block;
  margin: 1.5em auto;
  cursor: pointer;
}
.tiptap-content .ProseMirror img.ProseMirror-selectednode {
  outline: 3px solid var(--magenta);
  outline-offset: 2px;
}
.tiptap-content .ProseMirror p.is-editor-empty:first-child::before { content: attr(data-placeholder); color: color-mix(in oklab, var(--ink) 40%, transparent); pointer-events: none; float: left; height: 0; }
@keyframes tiptap-spin { to { transform: rotate(360deg); } }
</style>
