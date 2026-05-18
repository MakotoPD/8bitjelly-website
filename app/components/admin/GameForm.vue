<template>
  <div>
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:32px;flex-wrap:wrap;">
      <NuxtLink to="/admin/games" style="display:inline-flex;align-items:center;gap:8px;font-family:'Press Start 2P',monospace;font-size:9px;text-transform:uppercase;color:color-mix(in oklab,var(--ink) 55%,transparent);">
        <UIcon name="i-heroicons-arrow-left" style="width:14px;height:14px;" />
        Back
      </NuxtLink>
      <h1 class="display" style="font-size:40px;margin:0;">{{ isNew ? 'Add Game' : 'Edit Game' }}</h1>
    </div>

    <div style="display:grid;grid-template-columns:1fr 320px;gap:24px;align-items:start;">
      <div style="display:grid;gap:24px;">
        <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:28px;box-shadow:5px 5px 0 var(--ink);">
          <h2 class="display" style="font-size:24px;margin:0 0 20px;">Description (EN)</h2>
          <div class="field" style="margin-bottom:16px;">
            <label>Title <span class="req">*</span></label>
            <input v-model="form.title" class="input" placeholder="Game title" />
          </div>
          <div class="field">
            <label>Description (English)</label>
            <textarea v-model="form.descriptionEn" class="input" rows="5" placeholder="Describe the game..."></textarea>
          </div>
        </div>

        <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:28px;box-shadow:5px 5px 0 var(--ink);">
          <h2 class="display" style="font-size:24px;margin:0 0 20px;">Description (PL) <span style="font-size:14px;font-family:'Space Grotesk';font-weight:400;opacity:0.5;">optional</span></h2>
          <div class="field">
            <label>Description (Polish)</label>
            <textarea v-model="form.descriptionPl" class="input" rows="5" placeholder="Opis gry po polsku..."></textarea>
          </div>
        </div>

        <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:28px;box-shadow:5px 5px 0 var(--ink);">
          <h2 class="display" style="font-size:24px;margin:0 0 20px;">Content (EN)</h2>
          <TipTapEditor v-model="form.contentEn" placeholder="Full game description, screenshots, credits..." />
        </div>

        <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:28px;box-shadow:5px 5px 0 var(--ink);">
          <h2 class="display" style="font-size:24px;margin:0 0 20px;">Content (PL) <span style="font-size:14px;font-family:'Space Grotesk';font-weight:400;opacity:0.5;">optional</span></h2>
          <TipTapEditor v-model="form.contentPl" placeholder="Pełny opis gry po polsku..." />
        </div>
      </div>

      <div style="display:grid;gap:20px;position:sticky;top:20px;">
        <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:24px;box-shadow:5px 5px 0 var(--ink);">
          <h3 class="display" style="font-size:22px;margin:0 0 16px;">Save</h3>
          <div v-if="saved" style="padding:10px 12px;background:var(--mint);border:2px solid var(--ink);border-radius:8px;margin-bottom:12px;font-size:14px;font-weight:600;">✓ Saved!</div>
          <button class="btn" style="width:100%;" :disabled="saving" @click="save">
            <UIcon v-if="!saving" name="i-heroicons-check" />
            <UIcon v-else name="i-heroicons-arrow-path" style="animation:spin 1s linear infinite;" />
            {{ saving ? 'Saving...' : 'Save Game' }}
          </button>
        </div>

        <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:24px;box-shadow:5px 5px 0 var(--ink);">
          <h3 class="display" style="font-size:22px;margin:0 0 16px;">Settings</h3>
          <div class="field" style="margin-bottom:12px;">
            <label>Slug <span class="req">*</span></label>
            <div style="display:flex;gap:8px;">
              <input v-model="form.slug" class="input" placeholder="game-slug" style="flex:1;" />
              <button type="button" class="btn sm ghost" title="Generate from title" @click="form.slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')">
                <UIcon name="i-heroicons-arrow-path" style="width:14px;height:14px;" />
              </button>
            </div>
          </div>
          <div class="field" style="margin-bottom:12px;">
            <label>Platform</label>
            <input v-model="form.platform" class="input" placeholder="PC, Mobile, Web..." />
          </div>
          <div class="field" style="margin-bottom:12px;">
            <label>Status</label>
            <select v-model="form.status" class="select input">
              <option value="in-dev">In Development</option>
              <option value="released">Released</option>
              <option value="hiatus">Hiatus</option>
              <option value="cancelled">Cancelled</option>
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
            <input :value="form.tags.join(', ')" class="input" placeholder="RPG, Platformer..." @change="form.tags = ($event.target as HTMLInputElement).value.split(',').map(t => t.trim()).filter(Boolean)" />
          </div>
          <div class="field" style="margin-bottom:12px;">
            <label>itch.io URL</label>
            <input v-model="form.itchioUrl" class="input" placeholder="https://..." />
          </div>
          <div class="field" style="margin-bottom:12px;">
            <label>Steam URL</label>
            <input v-model="form.steamUrl" class="input" placeholder="https://..." />
          </div>
          <div style="display:flex;flex-direction:column;gap:10px;margin-top:8px;">
            <label style="display:flex;align-items:center;gap:10px;cursor:pointer;">
              <input type="checkbox" v-model="form.isFeatured" style="width:18px;height:18px;" />
              <span style="font-weight:600;">Featured</span>
            </label>
            <label style="display:flex;align-items:center;gap:10px;cursor:pointer;">
              <input type="checkbox" v-model="form.isPriority" style="width:18px;height:18px;" />
              <span style="font-weight:600;">Priority (homepage highlight)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ game: any | null }>()
const emit = defineEmits<{ saved: [] }>()

const isNew = computed(() => !props.game)
const saving = ref(false)
const saved = ref(false)
const patterns = ['pattern-a', 'pattern-b', 'pattern-c', 'pattern-d', 'pattern-e', 'pattern-f', 'pattern-g', 'pattern-h']

const form = reactive({
  slug: props.game?.slug || '',
  title: props.game?.title || '',
  descriptionEn: props.game?.descriptionEn || '',
  descriptionPl: props.game?.descriptionPl || '',
  tags: props.game?.tags || [],
  platform: props.game?.platform || 'PC',
  status: props.game?.status || 'in-dev',
  coverEmoji: props.game?.coverEmoji || '🎮',
  coverPattern: props.game?.coverPattern || 'pattern-a',
  coverImage: props.game?.coverImage || null,
  itchioUrl: props.game?.itchioUrl || '',
  steamUrl: props.game?.steamUrl || '',
  isFeatured: props.game?.isFeatured || false,
  isPriority: props.game?.isPriority || false,
  sortOrder: props.game?.sortOrder || 0,
  contentEn: props.game?.contentEn || '',
  contentPl: props.game?.contentPl || '',
})

watch(() => form.title, (val) => {
  if (isNew.value && val) {
    form.slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }
})

async function save() {
  if (!form.title || !form.slug) return
  saving.value = true
  try {
    if (isNew.value) {
      await $fetch('/api/games', { method: 'POST', body: form })
    } else {
      await $fetch(`/api/games/${props.game.id}`, { method: 'PUT', body: form })
    }
    saved.value = true
    setTimeout(() => { saved.value = false }, 3000)
    if (isNew.value) emit('saved')
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
@keyframes spin { to { transform: rotate(360deg); } }
</style>
