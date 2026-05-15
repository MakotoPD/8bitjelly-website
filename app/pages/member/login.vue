<template>
  <div style="min-height:100vh;background:var(--eggplant);display:flex;align-items:center;justify-content:center;padding:24px;">
    <div style="width:100%;max-width:420px;">
      <div style="text-align:center;margin-bottom:32px;">
        <div class="logo" style="color:var(--cream);justify-content:center;margin-bottom:16px;font-size:28px;">
          <span class="logo-mark"></span>
          8BitJelly
        </div>
        <p class="pixel" style="color:rgba(255,241,236,0.5);font-size:10px;">Panel członka</p>
      </div>

      <div style="background:var(--cream);border:2.5px solid var(--ink);border-radius:22px;padding:36px;box-shadow:10px 10px 0 var(--magenta);">
        <form @submit.prevent="login">
          <div class="field" style="margin-bottom:20px;">
            <label>Email <span class="req">*</span></label>
            <input v-model="email" type="email" class="input" placeholder="twoj@email.com" autofocus required />
          </div>
          <div class="field" style="margin-bottom:20px;">
            <label>Hasło <span class="req">*</span></label>
            <input v-model="password" type="password" class="input" placeholder="••••••••" required />
          </div>

          <div v-if="error" style="padding:12px 16px;background:var(--pink);border:2px solid var(--ink);border-radius:10px;margin-bottom:16px;font-size:14px;">
            {{ error }}
          </div>

          <button type="submit" class="btn large" style="width:100%;" :disabled="loading">
            <UIcon v-if="!loading" name="i-heroicons-arrow-right-circle" />
            <UIcon v-else name="i-heroicons-arrow-path" style="animation:spin 1s linear infinite;" />
            {{ loading ? 'Loguję...' : 'Zaloguj się' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const { fetch: refreshSession } = useUserSession()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function login() {
  loading.value = true
  error.value = ''
  try {
    const res = await $fetch<{ requiresTwoFactor: boolean; role?: string }>('/api/member/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })
    await refreshSession()
    if (res.requiresTwoFactor) {
      await navigateTo('/member/verify-2fa')
    }
    else {
      await navigateTo(res.role === 'admin' ? '/admin' : '/member')
    }
  }
  catch (e: any) {
    error.value = e?.data?.message || 'Błąd logowania'
  }
  finally {
    loading.value = false
  }
}
</script>

<style scoped>
@keyframes spin { to { transform: rotate(360deg); } }
</style>
