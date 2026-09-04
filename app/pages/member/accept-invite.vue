<template>
  <div style="min-height:100vh;background:var(--eggplant);display:flex;align-items:center;justify-content:center;padding:24px;">
    <div style="width:100%;max-width:440px;">
      <div style="text-align:center;margin-bottom:32px;">
        <div class="logo" style="color:var(--cream);justify-content:center;margin-bottom:16px;font-size:28px;">
          <span class="logo-mark"></span>
          8BitJelly
        </div>
        <p class="pixel" style="color:rgba(255,241,236,0.5);font-size:10px;">Aktywacja konta</p>
      </div>

      <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:22px;padding:36px;box-shadow:10px 10px 0 var(--magenta);">
        <div v-if="loadingInfo" style="text-align:center;padding:24px 0;">
          <UIcon name="i-heroicons-arrow-path" style="animation:spin 1s linear infinite;width:28px;height:28px;" />
        </div>

        <div v-else-if="infoError" style="padding:12px 16px;background:var(--pink);border:2px solid var(--ink);border-radius:10px;font-size:14px;">
          {{ infoError }}
        </div>

        <form v-else @submit.prevent="accept">
          <p style="margin:0 0 20px;font-size:15px;color:var(--ink);">
            Cześć, <strong>{{ inviteInfo?.name || inviteInfo?.email }}</strong>!<br>
            Ustaw hasło do swojego konta 8BitJelly.
          </p>

          <div class="field" style="margin-bottom:20px;">
            <label>Nowe hasło <span class="req">*</span></label>
            <input v-model="password" type="password" class="input" placeholder="Min. 8 znaków" autofocus required minlength="8" />
          </div>
          <div class="field" style="margin-bottom:20px;">
            <label>Powtórz hasło <span class="req">*</span></label>
            <input v-model="passwordConfirm" type="password" class="input" placeholder="••••••••" required />
          </div>

          <div v-if="error" style="padding:12px 16px;background:var(--pink);border:2px solid var(--ink);border-radius:10px;margin-bottom:16px;font-size:14px;">
            {{ error }}
          </div>

          <button type="submit" class="btn large" style="width:100%;" :disabled="loading">
            <UIcon v-if="!loading" name="i-heroicons-check-circle" />
            <UIcon v-else name="i-heroicons-arrow-path" style="animation:spin 1s linear infinite;" />
            {{ loading ? 'Aktywuję...' : 'Aktywuj konto' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const route = useRoute()
const { fetch: refreshSession } = useUserSession()
const token = computed(() => route.query.token as string)

const inviteInfo = ref<{ email: string; name: string | null } | null>(null)
const loadingInfo = ref(true)
const infoError = ref('')
const password = ref('')
const passwordConfirm = ref('')
const loading = ref(false)
const error = ref('')

onMounted(async () => {
  if (!token.value) {
    infoError.value = 'Brak tokenu zaproszenia'
    loadingInfo.value = false
    return
  }
  try {
    inviteInfo.value = await $fetch(`/api/member/auth/invite-info?token=${token.value}`)
  }
  catch (e: any) {
    infoError.value = e?.data?.message || 'Nieprawidłowy lub wygasły link zaproszenia'
  }
  finally {
    loadingInfo.value = false
  }
})

async function accept() {
  if (password.value !== passwordConfirm.value) {
    error.value = 'Hasła się nie zgadzają'
    return
  }
  loading.value = true
  error.value = ''
  try {
    const res = await $fetch<{ role: string }>('/api/member/auth/accept-invite', {
      method: 'POST',
      body: { token: token.value, password: password.value },
    })
    await refreshSession()
    await navigateTo(res.role === 'admin' ? '/admin' : '/member' as any)
  }
  catch (e: any) {
    error.value = e?.data?.message || 'Błąd aktywacji'
  }
  finally {
    loading.value = false
  }
}
</script>

<style scoped>
@keyframes spin { to { transform: rotate(360deg); } }
</style>
