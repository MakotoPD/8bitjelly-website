<template>
  <div>
    <h1 class="display" style="font-size:40px;margin:0 0 32px;">Bezpieczeństwo</h1>

    <div v-if="loading" style="text-align:center;padding:60px 0;">
      <UIcon name="i-heroicons-arrow-path" style="animation:spin 1s linear infinite;width:32px;height:32px;" />
    </div>

    <div v-else style="display:grid;gap:24px;">

      <!-- Email OTP -->
      <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:28px;box-shadow:5px 5px 0 var(--ink);">
        <div style="display:flex;align-items:flex-start;gap:16px;justify-content:space-between;flex-wrap:wrap;">
          <div>
            <h2 class="display" style="font-size:22px;margin:0 0 8px;">Kod przez email</h2>
            <p style="margin:0;font-size:14px;color:color-mix(in oklab,var(--ink) 65%,transparent);">
              Przy każdym logowaniu dostaniesz 6-cyfrowy kod na email.
            </p>
          </div>
          <button
            class="btn"
            :style="emailOtpEnabled ? 'background:var(--pink);' : ''"
            :disabled="togglingEmail"
            @click="toggleEmail"
          >
            <UIcon v-if="!togglingEmail" :name="emailOtpEnabled ? 'i-heroicons-x-circle' : 'i-heroicons-check-circle'" />
            <UIcon v-else name="i-heroicons-arrow-path" style="animation:spin 1s linear infinite;" />
            {{ emailOtpEnabled ? 'Wyłącz' : 'Włącz' }}
          </button>
        </div>
        <div v-if="emailMsg" style="margin-top:14px;padding:10px 14px;background:#d4f7d4;border:2px solid var(--ink);border-radius:10px;font-size:13px;">
          {{ emailMsg }}
        </div>
      </div>

      <!-- TOTP -->
      <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:16px;padding:28px;box-shadow:5px 5px 0 var(--ink);">
        <div style="display:flex;align-items:flex-start;gap:16px;justify-content:space-between;flex-wrap:wrap;margin-bottom:20px;">
          <div>
            <h2 class="display" style="font-size:22px;margin:0 0 8px;">Aplikacja uwierzytelniająca</h2>
            <p style="margin:0;font-size:14px;color:color-mix(in oklab,var(--ink) 65%,transparent);">
              Google Authenticator, Authy itp. — kod zmienia się co 30 sekund.
            </p>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button v-if="!totpEnabled" class="btn" :disabled="setupLoading" @click="setupTotp">
              <UIcon v-if="!setupLoading" name="i-heroicons-qr-code" />
              <UIcon v-else name="i-heroicons-arrow-path" style="animation:spin 1s linear infinite;" />
              {{ qrData ? 'Odśwież QR' : 'Skonfiguruj' }}
            </button>
            <button v-if="totpEnabled" class="btn" style="background:var(--pink);" @click="showDisable = true">
              <UIcon name="i-heroicons-x-circle" />
              Wyłącz TOTP
            </button>
          </div>
        </div>

        <!-- QR setup flow -->
        <div v-if="qrData && !totpEnabled" style="display:grid;gap:16px;">
          <div style="display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap;">
            <div>
              <p style="margin:0 0 10px;font-size:14px;font-weight:600;">1. Zeskanuj kod QR aplikacją:</p>
              <img :src="qrData" alt="QR kod TOTP" style="width:180px;height:180px;border:2px solid var(--ink);border-radius:8px;" />
            </div>
            <div style="flex:1;min-width:200px;">
              <p style="margin:0 0 10px;font-size:14px;font-weight:600;">Lub wpisz klucz ręcznie:</p>
              <code style="display:block;background:#f0e8e0;padding:10px 14px;border-radius:8px;font-size:13px;word-break:break-all;letter-spacing:2px;">{{ totpSecret }}</code>
            </div>
          </div>
          <div>
            <p style="margin:0 0 10px;font-size:14px;font-weight:600;">2. Wpisz kod z aplikacji, żeby potwierdzić:</p>
            <div style="display:flex;gap:12px;align-items:center;">
              <input
                v-model="confirmCode"
                type="text"
                inputmode="numeric"
                maxlength="6"
                class="input"
                placeholder="000000"
                style="max-width:140px;letter-spacing:4px;font-size:20px;text-align:center;"
              />
              <button class="btn" :disabled="confirmLoading" @click="confirmTotp">
                <UIcon v-if="!confirmLoading" name="i-heroicons-check" />
                <UIcon v-else name="i-heroicons-arrow-path" style="animation:spin 1s linear infinite;" />
                Aktywuj
              </button>
            </div>
            <div v-if="confirmError" style="margin-top:10px;padding:10px 14px;background:var(--pink);border:2px solid var(--ink);border-radius:10px;font-size:13px;">
              {{ confirmError }}
            </div>
          </div>
        </div>

        <div v-if="totpEnabled" style="display:flex;align-items:center;gap:10px;padding:12px 16px;background:#d4f7d4;border:2px solid var(--ink);border-radius:10px;">
          <UIcon name="i-heroicons-shield-check" style="width:20px;height:20px;color:green;" />
          <span style="font-size:14px;font-weight:600;">TOTP jest aktywne</span>
        </div>

        <!-- Disable TOTP dialog -->
        <div v-if="showDisable" style="margin-top:16px;padding:20px;background:#fff3f3;border:2px solid var(--ink);border-radius:12px;">
          <p style="margin:0 0 12px;font-size:14px;">Wpisz aktualny kod z aplikacji, żeby wyłączyć TOTP:</p>
          <div style="display:flex;gap:12px;align-items:center;">
            <input
              v-model="disableCode"
              type="text"
              inputmode="numeric"
              maxlength="6"
              class="input"
              placeholder="000000"
              style="max-width:140px;letter-spacing:4px;font-size:20px;text-align:center;"
            />
            <button class="btn" style="background:var(--pink);" :disabled="disableLoading" @click="disableTotp">
              <UIcon v-if="!disableLoading" name="i-heroicons-x-circle" />
              <UIcon v-else name="i-heroicons-arrow-path" style="animation:spin 1s linear infinite;" />
              Wyłącz
            </button>
            <button class="btn" style="background:transparent;border-color:var(--ink);" @click="showDisable = false">
              Anuluj
            </button>
          </div>
          <div v-if="disableError" style="margin-top:10px;padding:10px 14px;background:var(--pink);border:2px solid var(--ink);border-radius:10px;font-size:13px;">
            {{ disableError }}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'member', middleware: 'member' })

const loading = ref(true)
const totpEnabled = ref(false)
const emailOtpEnabled = ref(false)

const togglingEmail = ref(false)
const emailMsg = ref('')
const setupLoading = ref(false)
const qrData = ref('')
const totpSecret = ref('')
const confirmCode = ref('')
const confirmLoading = ref(false)
const confirmError = ref('')
const showDisable = ref(false)
const disableCode = ref('')
const disableLoading = ref(false)
const disableError = ref('')

onMounted(async () => {
  try {
    const profile = await $fetch<{ totpEnabled: boolean; emailOtpEnabled: boolean }>('/api/member/profile')
    totpEnabled.value = profile.totpEnabled
    emailOtpEnabled.value = profile.emailOtpEnabled
  }
  finally {
    loading.value = false
  }
})

async function toggleEmail() {
  togglingEmail.value = true
  emailMsg.value = ''
  try {
    const res = await $fetch<{ emailOtpEnabled: boolean }>('/api/member/2fa/email-toggle', {
      method: 'PUT',
      body: { enabled: !emailOtpEnabled.value },
    })
    emailOtpEnabled.value = res.emailOtpEnabled
    emailMsg.value = res.emailOtpEnabled ? 'Kod email włączony.' : 'Kod email wyłączony.'
    setTimeout(() => { emailMsg.value = '' }, 3000)
  }
  finally {
    togglingEmail.value = false
  }
}

async function setupTotp() {
  setupLoading.value = true
  try {
    const res = await $fetch<{ secret: string; qrDataUrl: string }>('/api/member/2fa/setup-totp', { method: 'POST' })
    qrData.value = res.qrDataUrl
    totpSecret.value = res.secret
  }
  finally {
    setupLoading.value = false
  }
}

async function confirmTotp() {
  confirmLoading.value = true
  confirmError.value = ''
  try {
    await $fetch('/api/member/2fa/confirm-totp', { method: 'POST', body: { code: confirmCode.value } })
    totpEnabled.value = true
    qrData.value = ''
    totpSecret.value = ''
    confirmCode.value = ''
  }
  catch (e: any) {
    confirmError.value = e?.data?.message || 'Nieprawidłowy kod'
  }
  finally {
    confirmLoading.value = false
  }
}

async function disableTotp() {
  disableLoading.value = true
  disableError.value = ''
  try {
    await $fetch('/api/member/2fa/disable-totp', { method: 'DELETE', body: { code: disableCode.value } })
    totpEnabled.value = false
    showDisable.value = false
    disableCode.value = ''
  }
  catch (e: any) {
    disableError.value = e?.data?.message || 'Nieprawidłowy kod'
  }
  finally {
    disableLoading.value = false
  }
}
</script>

<style scoped>
@keyframes spin { to { transform: rotate(360deg); } }
</style>
