<template>
  <div>
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:32px;flex-wrap:wrap;">
      <NuxtLink to="/admin/blog" style="display:inline-flex;align-items:center;gap:8px;font-family:'Press Start 2P',monospace;font-size:9px;text-transform:uppercase;color:color-mix(in oklab,var(--ink) 55%,transparent);">
        <UIcon name="i-heroicons-arrow-left" style="width:14px;height:14px;" />
        Back
      </NuxtLink>
      <h1 class="display" style="font-size:40px;margin:0;">{{ isNew ? 'New Post' : 'Edit Post' }}</h1>
    </div>

    <div style="display:grid;grid-template-columns:1fr 320px;gap:24px;align-items:start;">
      <!-- Main content -->
      <div style="display:grid;gap:24px;">
        <!-- Basic info card -->
        <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:28px;box-shadow:5px 5px 0 var(--ink);">
          <h2 class="display" style="font-size:24px;margin:0 0 20px;">Content (EN)</h2>
          <div class="field" style="margin-bottom:16px;">
            <label>Title (English) <span class="req">*</span></label>
            <input v-model="form.titleEn" class="input" placeholder="Post title in English" />
          </div>
          <div class="field" style="margin-bottom:16px;">
            <label>Excerpt (English)</label>
            <textarea v-model="form.excerptEn" class="input" rows="2" placeholder="Short summary for cards..."></textarea>
          </div>
          <div class="field">
            <label>Content (English)</label>
            <TipTapEditor v-model="form.contentEn" placeholder="Write your post content..." :upload-folder="uploadFolder" />
          </div>
        </div>

        <!-- PL content -->
        <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:28px;box-shadow:5px 5px 0 var(--ink);">
          <h2 class="display" style="font-size:24px;margin:0 0 20px;">Content (PL) <span style="font-size:14px;font-family:'Space Grotesk';font-weight:400;color:color-mix(in oklab,var(--ink) 50%,transparent);">optional</span></h2>
          <div class="field" style="margin-bottom:16px;">
            <label>Title (Polish)</label>
            <input v-model="form.titlePl" class="input" placeholder="Post title in Polish" />
          </div>
          <div class="field" style="margin-bottom:16px;">
            <label>Excerpt (Polish)</label>
            <textarea v-model="form.excerptPl" class="input" rows="2" placeholder="Short summary (PL)..."></textarea>
          </div>
          <div class="field">
            <label>Content (Polish)</label>
            <TipTapEditor v-model="form.contentPl" placeholder="Polish content (optional)..." :upload-folder="uploadFolder" />
          </div>
        </div>
      </div>

      <!-- Sidebar settings -->
      <div style="display:grid;gap:20px;position:sticky;top:20px;">
        <!-- Publish actions -->
        <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:24px;box-shadow:5px 5px 0 var(--ink);">
          <h3 class="display" style="font-size:22px;margin:0 0 16px;">Publish</h3>

          <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;">
            <label style="cursor:pointer;display:flex;align-items:center;gap:10px;">
              <div
                style="width:40px;height:22px;border-radius:999px;border:2px solid var(--ink);position:relative;cursor:pointer;transition:background 0.2s;"
                :style="{ background: form.isPublished ? 'var(--magenta)' : 'var(--cream-2)' }"
                @click="form.isPublished = !form.isPublished"
              >
                <div style="width:14px;height:14px;border-radius:50%;background:white;border:1.5px solid var(--ink);position:absolute;top:2px;transition:left 0.2s;" :style="{ left: form.isPublished ? '21px' : '2px' }"></div>
              </div>
              <span style="font-weight:600;">{{ form.isPublished ? 'Published' : 'Draft' }}</span>
            </label>
          </div>

          <div v-if="saved" style="padding:10px 12px;background:var(--mint);border:2px solid var(--ink);border-radius:8px;margin-bottom:12px;font-size:14px;font-weight:600;">
            ✓ Saved!
          </div>

          <div style="display:grid;gap:10px;">
            <button class="btn" :disabled="saving" @click="save">
              <UIcon v-if="!saving" name="i-heroicons-check" />
              <UIcon v-else name="i-heroicons-arrow-path" style="animation:spin 1s linear infinite;" />
              {{ saving ? 'Saving...' : (form.isPublished ? 'Publish' : 'Save Draft') }}
            </button>
            <NuxtLink v-if="!isNew" :to="`/blog/${form.slug}`" target="_blank" class="btn ghost sm">
              <UIcon name="i-heroicons-eye" />
              Preview
            </NuxtLink>
          </div>
        </div>

        <!-- Meta -->
        <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:24px;box-shadow:5px 5px 0 var(--ink);">
          <h3 class="display" style="font-size:22px;margin:0 0 16px;">Settings</h3>
          <div class="field" style="margin-bottom:12px;">
            <label>Slug <span class="req">*</span></label>
            <input v-model="form.slug" class="input" placeholder="post-url-slug" />
          </div>
          <div class="field" style="margin-bottom:12px;">
            <label>Author</label>
            <select v-model="form.author" class="input select">
              <option value="">— select member —</option>
              <option v-for="m in teamMembers" :key="m.id" :value="m.name">{{ m.name }}</option>
              <option value="8BitJelly">8BitJelly (team)</option>
            </select>
          </div>
          <div class="field" style="margin-bottom:12px;">
            <label>Cover Image</label>
            <ImageUpload v-model="form.coverImage" label="Upload cover image" />
          </div>
          <div class="field" style="margin-bottom:12px;">
            <label>Cover Emoji <span style="opacity:0.5;font-size:11px;">(fallback)</span></label>
            <input v-model="form.coverEmoji" class="input" placeholder="🎮" style="font-size:24px;text-align:center;" />
          </div>
          <div class="field" style="margin-bottom:12px;">
            <label>Cover Pattern <span style="opacity:0.5;font-size:11px;">(fallback)</span></label>
            <select v-model="form.coverPattern" class="select input">
              <option v-for="p in patterns" :key="p" :value="p">{{ p }}</option>
            </select>
          </div>
          <div class="field" style="margin-bottom:12px;">
            <label>Tags (comma separated)</label>
            <input :value="form.tags.join(', ')" class="input" placeholder="gamedev, unity, devlog" @change="form.tags = ($event.target as HTMLInputElement).value.split(',').map(t => t.trim()).filter(Boolean)" />
          </div>
          <div style="display:flex;align-items:center;gap:10px;margin-top:8px;">
            <input type="checkbox" id="featured" v-model="form.isFeatured" style="width:18px;height:18px;cursor:pointer;" />
            <label for="featured" style="cursor:pointer;font-weight:600;">Featured post</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ post: any | null }>()
const emit = defineEmits<{ saved: [] }>()

const isNew = computed(() => !props.post)
const saving = ref(false)
const { data: teamMembers } = await useFetch<any[]>('/api/team', { server: false, default: () => [] })
const uploadFolder = computed(() => props.post?.id ? `blog/${props.post.id}` : 'blog/new')
const saved = ref(false)

const patterns = ['pattern-a', 'pattern-b', 'pattern-c', 'pattern-d', 'pattern-e', 'pattern-f', 'pattern-g', 'pattern-h']

const form = reactive({
  slug: props.post?.slug || '',
  titleEn: props.post?.titleEn || '',
  titlePl: props.post?.titlePl || '',
  contentEn: props.post?.contentEn || '',
  contentPl: props.post?.contentPl || '',
  excerptEn: props.post?.excerptEn || '',
  excerptPl: props.post?.excerptPl || '',
  author: props.post?.author || '8BitJelly',
  tags: props.post?.tags || [],
  coverEmoji: props.post?.coverEmoji || '🎮',
  coverPattern: props.post?.coverPattern || 'pattern-a',
  coverImage: props.post?.coverImage || null,
  isFeatured: props.post?.isFeatured || false,
  isPublished: props.post?.isPublished || false,
})

watch(() => form.titleEn, (val) => {
  if (isNew.value && val) {
    form.slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }
})

async function save() {
  if (!form.titleEn || !form.slug) return
  saving.value = true
  try {
    if (isNew.value) {
      await $fetch('/api/blogs', { method: 'POST', body: form })
    } else {
      await $fetch(`/api/blogs/${props.post.id}`, { method: 'PUT', body: form })
    }
    saved.value = true
    setTimeout(() => { saved.value = false }, 3000)
    if (isNew.value) emit('saved')
  } catch (e) {
    console.error(e)
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
@keyframes spin { to { transform: rotate(360deg); } }
</style>
