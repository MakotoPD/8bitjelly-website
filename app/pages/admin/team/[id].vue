<template>
  <div>
    <div v-if="pending" style="text-align:center;padding:60px;"><p class="pixel">Loading...</p></div>
    <template v-else-if="member">
      <TeamMemberForm :member="member" @saved="navigateTo('/admin/team')" />

      <!-- Invitation section -->
      <div style="margin-top:32px;background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:28px;box-shadow:5px 5px 0 var(--ink);max-width:760px;">
        <h2 class="display" style="font-size:22px;margin:0 0 20px;">Konto & Zaproszenie</h2>

        <div v-if="accountLoading" style="padding:12px 0;">
          <UIcon name="i-heroicons-arrow-path" style="animation:spin 1s linear infinite;" />
        </div>

        <!-- Has account -->
        <template v-else-if="account">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
            <div :style="`display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:20px;border:2px solid var(--ink);font-size:13px;font-weight:600;background:${account.isPending ? 'var(--yellow,#ffe066)' : account.isActive ? '#d4f7d4' : 'var(--pink)'}`">
              <UIcon :name="account.isPending ? 'i-heroicons-clock' : account.isActive ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" style="width:14px;height:14px;" />
              {{ account.isPending ? 'Zaproszenie oczekuje' : account.isActive ? 'Konto aktywne' : 'Konto nieaktywne' }}
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
            <div>
              <p style="margin:0 0 4px;font-size:12px;font-weight:600;opacity:0.6;">EMAIL</p>
              <p style="margin:0;font-size:14px;">{{ account.email }}</p>
            </div>
            <div>
              <p style="margin:0 0 4px;font-size:12px;font-weight:600;opacity:0.6;">ROLA</p>
              <p style="margin:0;font-size:14px;text-transform:uppercase;font-weight:700;">{{ account.role }}</p>
            </div>
          </div>

          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <button v-if="account.isActive" class="btn" style="background:var(--pink);" :disabled="accountActionLoading" @click="deactivate(account.id)">
              <UIcon name="i-heroicons-x-circle" />
              Dezaktywuj konto
            </button>
          </div>

          <div v-if="accountMsg" style="margin-top:14px;padding:10px 14px;background:#d4f7d4;border:2px solid var(--ink);border-radius:10px;font-size:13px;">
            {{ accountMsg }}
          </div>
        </template>

        <!-- No account yet -->
        <template v-else>
          <p style="margin:0 0 16px;font-size:14px;color:color-mix(in oklab,var(--ink) 65%,transparent);">
            Ten członek nie ma jeszcze konta. Wyślij zaproszenie na email.
          </p>
          <div style="display:grid;grid-template-columns:1fr auto auto;gap:10px;align-items:end;max-width:560px;">
            <div class="field" style="margin:0;">
              <label>Email</label>
              <input v-model="inviteEmail" type="email" class="input" placeholder="czlonek@email.com" />
            </div>
            <div class="field" style="margin:0;">
              <label>Rola</label>
              <select v-model="inviteRole" class="input" style="cursor:pointer;">
                <option value="member">member</option>
                <option value="admin">admin</option>
              </select>
            </div>
            <button class="btn" :disabled="!inviteEmail || inviteSending" @click="sendInvite">
              <UIcon v-if="!inviteSending" name="i-heroicons-envelope" />
              <UIcon v-else name="i-heroicons-arrow-path" style="animation:spin 1s linear infinite;" />
              {{ inviteSending ? 'Wysyłam...' : 'Wyślij' }}
            </button>
          </div>
          <div v-if="inviteError" style="margin-top:12px;padding:10px 14px;background:var(--pink);border:2px solid var(--ink);border-radius:10px;font-size:13px;">
            {{ inviteError }}
          </div>
          <div v-if="inviteSuccess" style="margin-top:12px;padding:10px 14px;background:#d4f7d4;border:2px solid var(--ink);border-radius:10px;font-size:13px;">
            {{ inviteSuccess }}
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const route = useRoute()
const memberId = Number(route.params.id)

const { data: member, pending } = await useFetch(`/api/team/${memberId}`, { server: false })

interface AccountInfo {
  id: number
  email: string
  role: string
  isActive: boolean
  isPending: boolean
  teamMemberId: number | null
}

const account = ref<AccountInfo | null>(null)
const accountLoading = ref(true)
const accountActionLoading = ref(false)
const accountMsg = ref('')
const inviteEmail = ref('')
const inviteRole = ref<'member' | 'admin'>('member')
const inviteSending = ref(false)
const inviteError = ref('')
const inviteSuccess = ref('')

onMounted(async () => {
  try {
    const accounts = await $fetch<AccountInfo[]>('/api/admin/member-invites')
    account.value = accounts.find(a => a.teamMemberId === memberId) ?? null
  }
  finally {
    accountLoading.value = false
  }
})

async function sendInvite() {
  inviteSending.value = true
  inviteError.value = ''
  inviteSuccess.value = ''
  try {
    await $fetch('/api/admin/member-invites', {
      method: 'POST',
      body: { email: inviteEmail.value, teamMemberId: memberId, role: inviteRole.value },
    })
    inviteSuccess.value = `Zaproszenie wysłane na ${inviteEmail.value}!`
    const accounts = await $fetch<AccountInfo[]>('/api/admin/member-invites')
    account.value = accounts.find(a => (a as any).teamMemberId === memberId) ?? null
  }
  catch (e: any) {
    inviteError.value = e?.data?.message || 'Błąd wysyłania zaproszenia'
  }
  finally {
    inviteSending.value = false
  }
}

async function deactivate(id: number) {
  accountActionLoading.value = true
  try {
    await $fetch(`/api/admin/member-invites/${id}`, { method: 'DELETE' })
    if (account.value) account.value.isActive = false
    accountMsg.value = 'Konto dezaktywowane.'
  }
  finally {
    accountActionLoading.value = false
  }
}
</script>

<style scoped>
@keyframes spin { to { transform: rotate(360deg); } }
</style>
