<template>
  <div style="min-height:100vh;background:var(--eggplant);display:flex;align-items:center;justify-content:center;padding:24px;">
    <div style="width:100%;max-width:420px;">
      <div style="text-align:center;margin-bottom:32px;">
        <div class="logo" style="color:var(--cream);justify-content:center;margin-bottom:16px;font-size:28px;">
          <span class="logo-mark"></span>
          8BitJelly
        </div>
        <p class="pixel" style="color:rgba(255,241,236,0.5);font-size:10px;">Weryfikacja 2FA</p>
      </div>

      <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:22px;padding:36px;box-shadow:10px 10px 0 var(--magenta);">
        <p style="margin:0 0 20px;font-size:15px;color:var(--ink);">
          Podaj kod weryfikacyjny z aplikacji lub popro o kod na email.
        </p>

        <form @submit.prevent="verify">
          <div class="field" style="margin-bottom:20px;">
            <label>Kod 6-cyfrowy <span class="req">*</span></label>
            <input
              ref="codeInput"
              v-model="code"
              type="text"
              inputmode="numeric"
              maxlength="6"
              class="input"
              placeholder="000000"
              autofocus
              required
              style="letter-spacing:4px;font-size:22px;text-align:center;"
            />
          </div>

          <div v-if="error" style="padding:12px 16px;background:var(--pink);border:2px solid var(--ink);border-radius:10px;margin-bottom:16px;font-size:14px;">
            {{ error }}
          </div>

          <button type="submit" class="btn large" style="width:100%;margin-bottom:12px;" :disabled="loading">
            <UIcon v-if="!loading" name="i-heroicons-shield-check" />
            <UIcon v-else name="i-heroicons-arrow-path" style="animation:spin 1s linear infinite;" />
            {{ loading ? 'Weryfikuję...' : 'Weryfikuj' }}
          </button>
        </form>

        <button
          class="btn"
          style="width:100%;background:transparent;border-color:var(--ink);"
          :disabled="otpSent || otpLoading"
          @click="requestOtp"
        >
          <UIcon name="i-heroicons-envelope" />
          {{ otpSent ? 'Kod wysłany na email ✓' : otpLoading ? 'Wysyłam...' : 'Wyślij kod na email' }}
        </button>

        <div v-if="otpError" style="margin-top:12px;padding:10px 14px;background:var(--pink);border:2px solid var(--ink);border-radius:10px;font-size:13px;">
          {{ otpError }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const { fetch: refreshSession } = useUserSession()
const code = ref('')
const loading = ref(false)
const error = ref('')
const otpSent = ref(false)
const otpLoading = ref(false)
const otpError = ref('')

async function verify() {
  loading.value = true
  error.value = ''
  try {
    const res = await $fetch<{ role: string }>('/api/member/auth/verify-2fa', {
      method: 'POST',
      body: { code: code.value },
    })
    await refreshSession()
    await navigateTo(res.role === 'admin' ? '/admin' : '/member')
  }
  catch (e: any) {
    error.value = e?.data?.message || 'Nieprawidłowy kod'
    code.value = ''
  }
  finally {
    loading.value = false
  }
}

async function requestOtp() {
  otpLoading.value = true
  otpError.value = ''
  try {
    await $fetch('/api/member/auth/request-otp', { method: 'POST' })
    otpSent.value = true
  }
  catch (e: any) {
    otpError.value = e?.data?.message || 'Błąd wysyłania kodu'
  }
  finally {
    otpLoading.value = false
  }
}
</script>

<style scoped>
@keyframes spin { to { transform: rotate(360deg); } }
</style>
