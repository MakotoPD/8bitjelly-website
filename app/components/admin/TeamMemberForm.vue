<template>
  <div>
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:32px;flex-wrap:wrap;">
      <NuxtLink to="/admin/team" style="display:inline-flex;align-items:center;gap:8px;font-family:'Press Start 2P',monospace;font-size:9px;text-transform:uppercase;color:color-mix(in oklab,var(--ink) 55%,transparent);">
        <UIcon name="i-heroicons-arrow-left" style="width:14px;height:14px;" />
        Back
      </NuxtLink>
      <h1 class="display" style="font-size:40px;margin:0;">{{ isNew ? 'Add Member' : 'Edit Member' }}</h1>
    </div>

    <div style="display:grid;grid-template-columns:1fr 320px;gap:24px;align-items:start;">
      <div style="display:grid;gap:24px;">

        <!-- Bio -->
        <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:28px;box-shadow:5px 5px 0 var(--ink);">
          <h2 class="display" style="font-size:24px;margin:0 0 20px;">Bio</h2>
          <div class="field" style="margin-bottom:16px;">
            <label>Name <span class="req">*</span></label>
            <input v-model="form.name" class="input" placeholder="Full name" />
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div class="field">
              <label>Bio (English)</label>
              <textarea v-model="form.bioEn" class="input" rows="4" placeholder="Short bio..."></textarea>
            </div>
            <div class="field">
              <label>Bio (Polish) <span style="opacity:0.5;font-size:11px;">optional</span></label>
              <textarea v-model="form.bioPl" class="input" rows="4" placeholder="Krótkie bio..."></textarea>
            </div>
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
                <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:13px;color:color-mix(in oklab,var(--ink) 40%,transparent);pointer-events:none;white-space:nowrap;">
                  {{ s.prefix }}
                </span>
                <input
                  :value="form.socials[s.key]"
                  :placeholder="s.placeholder"
                  class="input"
                  :style="`padding-left:${s.prefix ? s.prefix.length * 7.5 + 16 : 12}px`"
                  @input="form.socials[s.key] = ($event.target as HTMLInputElement).value"
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Sidebar -->
      <div style="display:grid;gap:20px;position:sticky;top:20px;">

        <!-- Save -->
        <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:24px;box-shadow:5px 5px 0 var(--ink);">
          <h3 class="display" style="font-size:22px;margin:0 0 16px;">Save</h3>
          <div v-if="saved" style="padding:10px 12px;background:var(--mint);border:2px solid var(--ink);border-radius:8px;margin-bottom:12px;font-size:14px;font-weight:600;">✓ Saved!</div>
          <button class="btn" style="width:100%;" :disabled="saving || !form.name" @click="save">
            {{ saving ? 'Saving...' : 'Save Member' }}
          </button>
        </div>

        <!-- Avatar -->
        <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:24px;box-shadow:5px 5px 0 var(--ink);">
          <h3 class="display" style="font-size:22px;margin:0 0 16px;">Avatar</h3>
          <ImageUpload v-model="form.avatarImage" label="Upload avatar photo" style="margin-bottom:16px;" />
          <div class="field">
            <label>Fallback Emoji</label>
            <input v-model="form.avatarEmoji" class="input" placeholder="🎮" style="font-size:28px;text-align:center;" />
          </div>
        </div>

        <!-- Roles -->
        <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:24px;box-shadow:5px 5px 0 var(--ink);">
          <h3 class="display" style="font-size:22px;margin:0 0 6px;">Roles</h3>
          <p style="font-size:12px;opacity:0.55;margin:0 0 14px;">Kolejność ma znaczenie — pojawią się z "&" między nimi</p>

          <!-- Tag input hybrid -->
          <div class="role-input-wrap" :class="{ focused: roleInputFocused }">
            <div class="role-tags">
              <span
                v-for="(role, i) in form.roles"
                :key="role"
                class="role-tag"
                draggable="true"
                @dragstart="dragStart(i)"
                @dragover.prevent="dragOver(i)"
                @dragend="dragEnd"
              >
                {{ role }}
                <button type="button" @click="removeRole(i)">×</button>
              </span>
              <div style="position:relative;flex:1;min-width:120px;">
                <input
                  ref="roleInputEl"
                  v-model="roleSearch"
                  class="role-bare-input"
                  placeholder="Dodaj rolę..."
                  @focus="roleInputFocused = true"
                  @blur="onRoleBlur"
                  @keydown.enter.prevent="addRole(roleSearch)"
                  @keydown.backspace="onBackspace"
                  @keydown.escape="roleInputFocused = false"
                  @input="roleInputFocused = true"
                />
                <!-- Suggestions dropdown -->
                <div v-if="roleInputFocused && filteredRoles.length" class="role-suggestions">
                  <button
                    v-for="r in filteredRoles"
                    :key="r"
                    type="button"
                    class="role-suggestion-item"
                    :class="{ new: !allRoles.includes(r) }"
                    @mousedown.prevent="addRole(r)"
                  >
                    <UIcon v-if="!allRoles.includes(r)" name="i-heroicons-plus-circle" style="width:13px;height:13px;opacity:0.6;" />
                    {{ r }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Preview -->
          <div v-if="form.roles.length" style="margin-top:10px;padding:8px 12px;background:var(--eggplant);border-radius:8px;color:var(--cream);font-size:13px;font-weight:600;">
            {{ form.roles.join(' & ') }}
          </div>
        </div>

        <!-- Settings -->
        <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:24px;box-shadow:5px 5px 0 var(--ink);">
          <h3 class="display" style="font-size:22px;margin:0 0 16px;">Settings</h3>
          <label style="display:flex;align-items:center;gap:10px;cursor:pointer;">
            <input type="checkbox" v-model="form.isActive" style="width:18px;height:18px;" />
            <span style="font-weight:600;">Active (show on site)</span>
          </label>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ member: any | null }>()
const emit = defineEmits<{ saved: [] }>()

const isNew = computed(() => !props.member)
const saving = ref(false)
const saved = ref(false)

const allRoles = ['2D', '3D', 'Concept', 'Programmer', 'Gamedesign', 'Web', 'Audio', 'Music', 'SFX', 'Writer', 'Producer']

const socials = [
  { key: 'instagram', label: 'Instagram', icon: 'i-simple-icons-instagram', prefix: 'instagram.com/', placeholder: 'username' },
  { key: 'twitter', label: 'X / Twitter', icon: 'i-simple-icons-x', prefix: 'x.com/', placeholder: 'username' },
  { key: 'github', label: 'GitHub', icon: 'i-simple-icons-github', prefix: 'github.com/', placeholder: 'username' },
  { key: 'youtube', label: 'YouTube', icon: 'i-simple-icons-youtube', prefix: '@', placeholder: 'handle' },
  { key: 'artstation', label: 'ArtStation', icon: 'i-simple-icons-artstation', prefix: 'artstation.com/', placeholder: 'username' },
  { key: 'tiktok', label: 'TikTok', icon: 'i-simple-icons-tiktok', prefix: '@', placeholder: 'username' },
  { key: 'itchio', label: 'itch.io', icon: 'i-simple-icons-itchdotio', prefix: '', placeholder: 'username.itch.io' },
  { key: 'twitch', label: 'Twitch', icon: 'i-simple-icons-twitch', prefix: 'twitch.tv/', placeholder: 'username' },
  { key: 'linkedin', label: 'LinkedIn', icon: 'i-simple-icons-linkedin', prefix: 'linkedin.com/in/', placeholder: 'username' },
  { key: 'discord', label: 'Discord', icon: 'i-simple-icons-discord', prefix: '', placeholder: 'user#0000 or server link' },
  { key: 'bluesky', label: 'Bluesky', icon: 'i-simple-icons-bluesky', prefix: '@', placeholder: 'handle.bsky.social' },
  { key: 'behance', label: 'Behance', icon: 'i-simple-icons-behance', prefix: 'behance.net/', placeholder: 'username' },
  { key: 'website', label: 'Website', icon: 'i-heroicons-globe-alt', prefix: 'https://', placeholder: 'yoursite.com' },
]

const initSocials = () => Object.fromEntries(socials.map(s => [
  s.key,
  props.member?.[s.key] || ''
]))

const form = reactive({
  name: props.member?.name || '',
  bioEn: props.member?.bioEn || '',
  bioPl: props.member?.bioPl || '',
  roles: [...(props.member?.roles || [])],
  avatarEmoji: props.member?.avatarEmoji || '🎮',
  avatarImage: props.member?.avatarImage || null,
  isActive: props.member?.isActive ?? true,
  sortOrder: props.member?.sortOrder || 0,
  socials: initSocials(),
})

// Role tag input logic
const roleInputEl = ref<HTMLInputElement>()
const roleInputFocused = ref(false)
const roleSearch = ref('')
let dragIdx = -1

const filteredRoles = computed(() => {
  const q = roleSearch.value.trim().toLowerCase()
  const existing = new Set(form.roles)
  const suggestions = allRoles.filter(r => !existing.has(r) && (!q || r.toLowerCase().includes(q)))
  if (q && !allRoles.some(r => r.toLowerCase() === q) && !existing.has(roleSearch.value.trim())) {
    suggestions.push(roleSearch.value.trim())
  }
  return suggestions.slice(0, 8)
})

function addRole(val: string) {
  const v = val.trim()
  if (v && !form.roles.includes(v)) {
    form.roles.push(v)
  }
  roleSearch.value = ''
  roleInputEl.value?.focus()
}

function removeRole(i: number) {
  form.roles.splice(i, 1)
}

function onBackspace() {
  if (!roleSearch.value && form.roles.length) {
    form.roles.pop()
  }
}

function onRoleBlur() {
  setTimeout(() => { roleInputFocused.value = false }, 150)
}

function dragStart(i: number) { dragIdx = i }
function dragOver(i: number) {
  if (dragIdx === i) return
  const roles = [...form.roles]
  const [moved] = roles.splice(dragIdx, 1)
  roles.splice(i, 0, moved)
  form.roles.splice(0, form.roles.length, ...roles)
  dragIdx = i
}
function dragEnd() { dragIdx = -1 }

async function save() {
  if (!form.name) return
  saving.value = true
  try {
    const body = { ...form, ...form.socials }
    if (isNew.value) {
      await $fetch('/api/team', { method: 'POST', body })
    } else {
      await $fetch(`/api/team/${props.member.id}`, { method: 'PUT', body })
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
.role-input-wrap {
  border: 2.5px solid var(--ink);
  border-radius: 10px;
  background: white;
  padding: 6px 8px;
  cursor: text;
  transition: box-shadow 0.15s;
}
.role-input-wrap.focused {
  box-shadow: 3px 3px 0 var(--ink);
}

.role-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.role-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--eggplant);
  color: var(--cream);
  border-radius: 6px;
  padding: 3px 8px 3px 10px;
  font-size: 12px;
  font-weight: 600;
  cursor: grab;
  user-select: none;
}
.role-tag:active { cursor: grabbing; }
.role-tag button {
  background: none;
  border: none;
  color: inherit;
  opacity: 0.6;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  padding: 0 2px;
}
.role-tag button:hover { opacity: 1; }

.role-bare-input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  font-family: 'Space Grotesk', sans-serif;
  padding: 4px 6px;
  color: var(--ink);
}

.role-suggestions {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: var(--cream);
  border: 2.5px solid var(--ink);
  border-radius: 10px;
  box-shadow: 4px 4px 0 var(--ink);
  z-index: 50;
  overflow: hidden;
}

.role-suggestion-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: none;
  text-align: left;
  font-size: 13px;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  cursor: pointer;
  color: var(--ink);
}
.role-suggestion-item:hover { background: var(--yellow); }
.role-suggestion-item.new { color: var(--magenta); }
</style>
