<template>
  <div>
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:32px;flex-wrap:wrap;">
      <h1 class="display" style="font-size:40px;margin:0;">Mój profil</h1>
      <div style="flex:1;" />
      <button class="btn" :disabled="saving" @click="save">
        <UIcon v-if="!saving" name="i-heroicons-check" />
        <UIcon v-else name="i-heroicons-arrow-path" style="animation:spin 1s linear infinite;" />
        {{ saving ? 'Zapisuję...' : 'Zapisz zmiany' }}
      </button>
    </div>

    <div v-if="loading" style="text-align:center;padding:60px 0;">
      <UIcon name="i-heroicons-arrow-path" style="animation:spin 1s linear infinite;width:32px;height:32px;" />
    </div>

    <div v-else-if="!profile?.member" style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:32px;box-shadow:5px 5px 0 var(--ink);">
      <p>Twoje konto nie jest powiązane z profilem członka. Skontaktuj się z adminem.</p>
    </div>

    <div v-else style="display:grid;gap:24px;">
      <div v-if="saved" style="padding:14px 20px;background:#d4f7d4;border:2px solid var(--ink);border-radius:12px;font-weight:600;">
        Zmiany zapisane!
      </div>
      <div v-if="saveError" style="padding:14px 20px;background:var(--pink);border:2px solid var(--ink);border-radius:12px;">
        {{ saveError }}
      </div>

      <!-- Bio -->
      <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:28px;box-shadow:5px 5px 0 var(--ink);">
        <h2 class="display" style="font-size:24px;margin:0 0 20px;">Bio</h2>
        <div class="field" style="margin-bottom:16px;">
          <label>Imię / Nick <span class="req">*</span></label>
          <input v-model="form.name" class="input" placeholder="Twoje imię lub nick" />
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <div class="field">
            <label>Bio (English)</label>
            <textarea v-model="form.bioEn" class="input" rows="4" placeholder="Short bio..." />
          </div>
          <div class="field">
            <label>Bio (Polski)</label>
            <textarea v-model="form.bioPl" class="input" rows="4" placeholder="Krótkie bio..." />
          </div>
        </div>
      </div>

      <!-- Avatar -->
      <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:28px;box-shadow:5px 5px 0 var(--ink);">
        <h2 class="display" style="font-size:24px;margin:0 0 20px;">Avatar</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <div class="field">
            <label>Emoji (fallback)</label>
            <input v-model="form.avatarEmoji" class="input" placeholder="🎮" maxlength="2" />
          </div>
          <div class="field">
            <label>URL zdjęcia</label>
            <input v-model="form.avatarImage" class="input" placeholder="https://..." />
          </div>
        </div>
        <div v-if="form.avatarImage || form.avatarEmoji" style="margin-top:16px;display:flex;align-items:center;gap:12px;">
          <div style="width:60px;height:60px;border-radius:50%;overflow:hidden;border:2px solid var(--ink);display:flex;align-items:center;justify-content:center;font-size:28px;background:var(--pink);">
            <img v-if="form.avatarImage" :src="form.avatarImage" style="width:100%;height:100%;object-fit:cover;" alt="avatar" />
            <span v-else>{{ form.avatarEmoji }}</span>
          </div>
          <span style="font-size:14px;color:color-mix(in oklab,var(--ink) 60%,transparent);">Podgląd</span>
        </div>
      </div>

      <!-- Social media -->
      <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:28px;box-shadow:5px 5px 0 var(--ink);">
        <h2 class="display" style="font-size:24px;margin:0 0 20px;">Social Media</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div v-for="s in socials" :key="s.key" class="field" style="margin:0;">
            <label style="display:flex;align-items:center;gap:6px;">
              <UIcon :name="s.icon" style="width:14px;height:14px;flex:none;" />
              {{ s.label }}
            </label>
            <div style="position:relative;">
              <span v-if="s.prefix" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:13px;color:color-mix(in oklab,var(--ink) 40%,transparent);pointer-events:none;white-space:nowrap;">
                {{ s.prefix }}
              </span>
              <input
                v-model="form.socials[s.key]"
                :placeholder="s.placeholder"
                class="input"
                :style="`padding-left:${s.prefix ? s.prefix.length * 7.5 + 16 : 12}px`"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'member', middleware: 'member' })

interface ProfileData {
  member: Record<string, any> | null
  totpEnabled: boolean
  emailOtpEnabled: boolean
}

const loading = ref(true)
const saving = ref(false)
const saved = ref(false)
const saveError = ref('')
const profile = ref<ProfileData | null>(null)

const form = reactive({
  name: '',
  bioEn: '',
  bioPl: '',
  avatarEmoji: '',
  avatarImage: '',
  socials: {} as Record<string, string>,
})

const socials = [
  { key: 'instagram', label: 'Instagram', icon: 'i-simple-icons-instagram', prefix: 'instagram.com/', placeholder: 'username' },
  { key: 'github', label: 'GitHub', icon: 'i-simple-icons-github', prefix: 'github.com/', placeholder: 'username' },
  { key: 'artstation', label: 'ArtStation', icon: 'i-simple-icons-artstation', prefix: 'artstation.com/', placeholder: 'username' },
  { key: 'itchio', label: 'itch.io', icon: 'i-simple-icons-itchdotio', prefix: 'itch.io/', placeholder: 'username' },
  { key: 'linkedin', label: 'LinkedIn', icon: 'i-simple-icons-linkedin', prefix: 'linkedin.com/in/', placeholder: 'username' },
  { key: 'twitter', label: 'X / Twitter', icon: 'i-simple-icons-x', prefix: 'x.com/', placeholder: 'username' },
  { key: 'youtube', label: 'YouTube', icon: 'i-simple-icons-youtube', prefix: '', placeholder: 'https://youtube.com/@...' },
  { key: 'tiktok', label: 'TikTok', icon: 'i-simple-icons-tiktok', prefix: 'tiktok.com/@', placeholder: 'username' },
  { key: 'twitch', label: 'Twitch', icon: 'i-simple-icons-twitch', prefix: 'twitch.tv/', placeholder: 'username' },
  { key: 'discord', label: 'Discord', icon: 'i-simple-icons-discord', prefix: '', placeholder: 'username lub link' },
  { key: 'bluesky', label: 'Bluesky', icon: 'i-simple-icons-bluesky', prefix: 'bsky.app/profile/', placeholder: 'handle' },
  { key: 'behance', label: 'Behance', icon: 'i-simple-icons-behance', prefix: 'behance.net/', placeholder: 'username' },
  { key: 'website', label: 'Strona WWW', icon: 'i-heroicons-globe-alt', prefix: '', placeholder: 'https://...' },
]

onMounted(async () => {
  try {
    profile.value = await $fetch<ProfileData>('/api/member/profile')
    const m = profile.value?.member
    if (m) {
      form.name = m.name ?? ''
      form.bioEn = m.bioEn ?? ''
      form.bioPl = m.bioPl ?? ''
      form.avatarEmoji = m.avatarEmoji ?? ''
      form.avatarImage = m.avatarImage ?? ''
      for (const s of socials) {
        form.socials[s.key] = m[s.key] ?? ''
      }
    }
  }
  finally {
    loading.value = false
  }
})

async function save() {
  saving.value = true
  saved.value = false
  saveError.value = ''
  try {
    await $fetch('/api/member/profile', {
      method: 'PUT',
      body: {
        name: form.name,
        bioEn: form.bioEn,
        bioPl: form.bioPl,
        avatarEmoji: form.avatarEmoji,
        avatarImage: form.avatarImage,
        ...form.socials,
      },
    })
    saved.value = true
    setTimeout(() => { saved.value = false }, 3000)
  }
  catch (e: any) {
    saveError.value = e?.data?.message || 'Błąd zapisu'
  }
  finally {
    saving.value = false
  }
}
</script>

<style scoped>
@keyframes spin { to { transform: rotate(360deg); } }
</style>
