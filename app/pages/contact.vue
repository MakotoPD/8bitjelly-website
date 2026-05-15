<template>
  <div>
    <div class="page-hero" style="background:var(--cream);border-bottom:2px solid var(--ink);">
      <div class="wrap page-hero-grid">
        <div>
          <span class="eyebrow">8BitJelly</span>
          <h1 class="display">{{ $t('contact.title') }} <em>{{ $t('contact.titleEm') }}</em></h1>
          <p>{{ $t('contact.subtitle') }}</p>
        </div>
        <div class="whale-side">
          <div class="whale-side-disc"></div>
          <img src="/whale.png" alt="Whale mascot" class="whale-side-img" />
          <div class="speech">{{ $t('contact.whale') }}</div>
        </div>
      </div>
    </div>

    <section style="padding:40px 0 100px;background:var(--cream);">
      <div class="wrap" style="display:grid;grid-template-columns:1.5fr 1fr;gap:40px;align-items:start;">

        <!-- Form -->
        <div class="form-card" ref="formCard">
          <!-- Step 1: Topic -->
          <div class="form-step">
            <div class="step-label">
              <div class="step-num pixel">01</div>
              <div class="step-title display">{{ $t('contact.topic') }}</div>
            </div>
            <div class="topics">
              <label v-for="topic in topics" :key="topic.value" class="topic">
                <input type="radio" v-model="form.reason" :value="topic.value" />
                <div class="topic-body">
                  <div class="ic">{{ topic.icon }}</div>
                  <div>
                    <h4>{{ topic.title }}</h4>
                    <p>{{ topic.desc }}</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <!-- Step 2: Info -->
          <div class="form-step">
            <div class="step-label">
              <div class="step-num pixel">02</div>
              <div class="step-title display">{{ $t('contact.yourInfo') }}</div>
            </div>

            <div class="fields">
              <div class="row-2">
                <div class="field">
                  <label>{{ $t('contact.name') }} <span class="req">*</span></label>
                  <input v-model="form.name" class="input" :placeholder="$t('contact.namePlaceholder')" required />
                </div>
                <div class="field">
                  <label>{{ $t('contact.email') }} <span class="req">*</span></label>
                  <input v-model="form.email" type="email" class="input" :placeholder="$t('contact.emailPlaceholder')" required />
                </div>
              </div>

              <div class="field">
                <label>{{ $t('contact.phone') }}</label>
                <input v-model="form.phone" class="input" :placeholder="$t('contact.phonePlaceholder')" />
              </div>

              <div v-if="form.reason === 'join' && lookings && lookings.length" class="field">
                <label>{{ $t('contact.position') }}</label>
                <select v-model="form.position" class="select input">
                  <option value="">— {{ $t('contact.position') }} —</option>
                  <option v-for="l in lookings" :key="l.id" :value="l.title">{{ l.title }}</option>
                </select>
              </div>

              <div class="field">
                <label>{{ $t('contact.message') }} <span class="req">*</span></label>
                <textarea v-model="form.message" class="input" :placeholder="$t('contact.messagePlaceholder')" rows="5" required></textarea>
              </div>
            </div>
          </div>

          <!-- Alert -->
          <div v-if="alert" :style="`padding:14px 16px;border-radius:10px;margin-bottom:20px;border:2px solid var(--ink);background:${alert.type === 'success' ? 'var(--mint)' : 'var(--pink)' };`">
            {{ alert.text }}
          </div>

          <button class="btn large" :disabled="sending" @click="submit">
            <UIcon v-if="!sending" name="i-heroicons-paper-airplane" />
            <UIcon v-else name="i-heroicons-arrow-path" style="animation:spin 1s linear infinite;" />
            {{ sending ? $t('contact.sending') : $t('contact.send') }}
          </button>
        </div>

        <!-- Sidebar info -->
        <div style="display:grid;gap:16px;">
          <div style="border:2.5px solid var(--ink);border-radius:18px;padding:24px;box-shadow:6px 6px 0 var(--ink);background:var(--yellow);">
            <h3 class="display" style="font-size:28px;margin:0 0 12px;">Discord</h3>
            <p style="font-size:14px;color:color-mix(in oklab,var(--ink) 75%,transparent);">Join our community for the fastest response.</p>
          </div>
          <div style="border:2.5px solid var(--ink);border-radius:18px;padding:24px;box-shadow:6px 6px 0 var(--ink);background:var(--mint);">
            <h3 class="display" style="font-size:28px;margin:0 0 12px;">Email</h3>
            <p style="font-size:14px;">hello@8bitjelly.com</p>
          </div>
          <div style="border:2.5px solid var(--ink);border-radius:18px;padding:24px;box-shadow:6px 6px 0 var(--ink);background:var(--pink);">
            <h3 class="display" style="font-size:28px;margin:0 0 12px;">Socials</h3>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">
              <a href="https://instagram.com/8bitjelly" target="_blank" class="btn sm ghost">Instagram</a>
              <a href="https://github.com/8bitjelly" target="_blank" class="btn sm ghost">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })
const { t, locale } = useI18n()

useSeoMeta({ title: 'Contact — 8BitJelly', description: 'Get in touch with the 8BitJelly crew.' })

const { data: lookings } = await useFetch('/api/lookings', { query: computed(() => ({ locale: locale.value })) })

const form = reactive({
  reason: 'hello',
  name: '',
  email: '',
  phone: '',
  position: '',
  message: '',
})
const sending = ref(false)
const alert = ref<{ type: 'success' | 'error', text: string } | null>(null)

const topics = computed(() => [
  { value: 'join', icon: '🎮', title: t('contact.topic1Title'), desc: t('contact.topic1Desc') },
  { value: 'sponsor', icon: '💰', title: t('contact.topic2Title'), desc: t('contact.topic2Desc') },
  { value: 'collab', icon: '🤝', title: t('contact.topic3Title'), desc: t('contact.topic3Desc') },
  { value: 'hello', icon: '👋', title: t('contact.topic4Title'), desc: t('contact.topic4Desc') },
])

async function submit() {
  if (!form.name || !form.email || !form.message) return
  sending.value = true
  alert.value = null

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form, subject: `[8BitJelly] ${form.reason} from ${form.name}` },
    })
    alert.value = { type: 'success', text: t('contact.success') }
    Object.assign(form, { name: '', email: '', phone: '', position: '', message: '', reason: 'hello' })
  } catch {
    alert.value = { type: 'error', text: t('contact.error') }
  } finally {
    sending.value = false
  }
}
</script>

<style scoped>
.whale-side {
  position: relative; height: 320px;
  display: flex; align-items: center; justify-content: center;
}
.whale-side-disc {
  position: absolute; width: 260px; height: 260px; border-radius: 50%;
  background: var(--yellow); border: 3px solid var(--ink); box-shadow: 8px 8px 0 var(--ink);
}
.whale-side-img { position: relative; width: 280px; z-index: 2; filter: drop-shadow(0 14px 22px rgba(27,11,46,.25)); }
.speech {
  position: absolute; top: 10px; left: -10px;
  background: var(--cream); border: 2.5px solid var(--ink);
  padding: 10px 14px; border-radius: 14px;
  font-family: 'Bagel Fat One', sans-serif; font-size: 18px;
  box-shadow: 4px 4px 0 var(--ink); z-index: 3;
  transform: rotate(-6deg);
}
.speech::after {
  content: ''; position: absolute; bottom: -10px; left: 30px;
  width: 14px; height: 14px; background: var(--cream);
  border-right: 2.5px solid var(--ink); border-bottom: 2.5px solid var(--ink);
  transform: rotate(45deg);
}
.form-card {
  background: var(--cream);
  border: 2.5px solid var(--ink);
  border-radius: 22px;
  padding: 36px;
  box-shadow: 10px 10px 0 var(--ink);
}
.form-step { margin-bottom: 32px; }
.step-label { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.step-num {
  background: var(--ink); color: var(--cream);
  width: 32px; height: 32px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center; flex: none;
}
.step-title { font-size: 24px; line-height: 1; }
.topics { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.topic {
  position: relative;
  border: 2.5px solid var(--ink); background: var(--cream);
  border-radius: 16px; padding: 18px;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s, background 0.15s;
  display: flex; gap: 14px; align-items: flex-start;
}
.topic:hover { transform: translate(-2px,-2px); box-shadow: 4px 4px 0 var(--ink); }
.topic input { position: absolute; opacity: 0; pointer-events: none; }
.topic:has(input:checked) { background: var(--magenta); color: white; box-shadow: 5px 5px 0 var(--ink); transform: translate(-2px,-2px); }
.topic:has(input:checked) p { color: rgba(255,255,255,0.85); }
.ic {
  width: 44px; height: 44px;
  border: 2.5px solid var(--ink); border-radius: 12px;
  background: var(--cream);
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; flex: none;
}
.topic h4 { margin: 0 0 4px; font-size: 16px; font-weight: 700; }
.topic p { margin: 0; font-size: 13px; line-height: 1.4; }
.fields { display: grid; gap: 18px; }
.row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 1000px) {
  .wrap > div[style*="grid-template-columns:1.5fr"] { grid-template-columns: 1fr !important; }
  .page-hero-grid { grid-template-columns: 1fr !important; }
  .whale-side { display: none; }
}
@media (max-width: 600px) {
  .topics { grid-template-columns: 1fr; }
  .row-2 { grid-template-columns: 1fr; }
}
</style>
