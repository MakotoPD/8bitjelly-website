<template>
  <section class="team" id="team" ref="sectionEl">
    <div class="wrap">
      <div class="section-head">
        <div>
          <span class="eyebrow eyebrow-dark">{{ $t('team.eyebrow') }}</span>
          <h2 class="section-title display">{{ $t('team.title') }} <em>{{ $t('team.titleEm') }}</em></h2>
        </div>
        <p class="section-kicker">{{ $t('team.kicker') }}</p>
      </div>

      <div class="filter-bar">
        <button
          v-for="role in allRoles"
          :key="role.value"
          class="chip chip-dark"
          :class="{ active: activeRole === role.value }"
          @click="activeRole = role.value"
        >
          {{ role.label }}
        </button>
      </div>

      <TransitionGroup name="members" tag="div" class="team-grid">
        <div v-for="member in filteredMembers" :key="member.id" class="member">
          <div class="member-photo">
            <NuxtImg
              v-if="member.avatarImage"
              :src="member.avatarImage"
              :alt="member.name"
              style="width:100%;height:100%;object-fit:cover;"
            />
            <div v-else class="avatar-emoji">{{ member.avatarEmoji }}</div>
          </div>
          <div class="member-body">
            <div class="member-name display">{{ member.name }}</div>
            <div class="member-role pixel">{{ member.roles.join(' & ') }}</div>
            <p v-if="member.bio" class="member-bio">{{ member.bio }}</p>
            <div class="member-socials">
              <a v-for="s in memberSocials(member)" :key="s.key" :href="s.url" target="_blank" rel="noopener" class="soc" :aria-label="s.label">
                <UIcon :name="s.icon" style="width:12px;height:12px;" />
              </a>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t, locale } = useI18n()
const sectionEl = ref<HTMLElement>()
const activeRole = ref('all')

const { data: members } = await useFetch('/api/team', {
  query: computed(() => ({ locale: locale.value })),
  watch: [locale],
})

const allRoles = computed(() => [
  { value: 'all', label: t('team.filterAll') },
  { value: '2D', label: t('team.roles.2D') },
  { value: '3D', label: t('team.roles.3D') },
  { value: 'Concept', label: t('team.roles.Concept') },
  { value: 'Programmer', label: t('team.roles.Programmer') },
  { value: 'Gamedesign', label: t('team.roles.Gamedesign') },
  { value: 'Web', label: t('team.roles.Web') },
  { value: 'Audio', label: t('team.roles.Audio') },
])

const filteredMembers = computed(() => {
  if (!members.value) return []
  if (activeRole.value === 'all') return members.value
  return members.value.filter((m: any) => m.roles.includes(activeRole.value))
})

function memberSocials(m: any) {
  return [
    { key: 'instagram', url: `https://instagram.com/${m.instagram}`, icon: 'i-simple-icons-instagram', label: 'Instagram' },
    { key: 'twitter', url: `https://x.com/${m.twitter}`, icon: 'i-simple-icons-x', label: 'X/Twitter' },
    { key: 'github', url: `https://github.com/${m.github}`, icon: 'i-simple-icons-github', label: 'GitHub' },
    { key: 'youtube', url: `https://youtube.com/@${m.youtube}`, icon: 'i-simple-icons-youtube', label: 'YouTube' },
    { key: 'artstation', url: `https://artstation.com/${m.artstation}`, icon: 'i-simple-icons-artstation', label: 'ArtStation' },
    { key: 'tiktok', url: `https://tiktok.com/@${m.tiktok}`, icon: 'i-simple-icons-tiktok', label: 'TikTok' },
    { key: 'itchio', url: `https://${m.itchio}.itch.io`, icon: 'i-simple-icons-itchdotio', label: 'itch.io' },
    { key: 'twitch', url: `https://twitch.tv/${m.twitch}`, icon: 'i-simple-icons-twitch', label: 'Twitch' },
    { key: 'linkedin', url: `https://linkedin.com/in/${m.linkedin}`, icon: 'i-simple-icons-linkedin', label: 'LinkedIn' },
    { key: 'discord', url: m.discord, icon: 'i-simple-icons-discord', label: 'Discord' },
    { key: 'bluesky', url: `https://bsky.app/profile/${m.bluesky}`, icon: 'i-simple-icons-bluesky', label: 'Bluesky' },
    { key: 'behance', url: `https://behance.net/${m.behance}`, icon: 'i-simple-icons-behance', label: 'Behance' },
    { key: 'website', url: m.website?.startsWith('http') ? m.website : `https://${m.website}`, icon: 'i-heroicons-globe-alt', label: 'Website' },
  ].filter(s => !!m[s.key])
}

onMounted(() => {
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger)
    gsap.from('.team .section-head', {
      y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: sectionEl.value, start: 'top 80%', once: true },
    })
  }
})
</script>

<style scoped>
.team {
  padding: 90px 0;
  background: var(--eggplant);
  color: var(--cream);
  border-top: 2px solid var(--ink);
  border-bottom: 2px solid var(--ink);
}
.filter-bar { display: flex; gap: 8px; flex-wrap: wrap; margin: 28px 0 32px; }
.team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
.member {
  background: var(--cream); color: var(--ink);
  border: 2.5px solid var(--ink);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 5px 5px 0 var(--magenta);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.member:hover { transform: translate(-3px,-3px); box-shadow: 8px 8px 0 var(--magenta); }
.member-photo {
  aspect-ratio: 1;
  background: var(--pink);
  display: flex; align-items: flex-end; justify-content: center;
  overflow: hidden;
  border-bottom: 2.5px solid var(--ink);
}
.avatar-emoji {
  font-size: 90px; line-height: 1;
  margin-bottom: 10px;
}
.member-body { padding: 14px 16px 18px; }
.member-name { font-size: 24px; line-height: 1; }
.member-role { font-size: 9px; color: var(--magenta-2); margin-top: 6px; letter-spacing: 0.05em; }
.member-bio {
  margin-top: 10px; font-size: 13px; line-height: 1.45;
  color: color-mix(in oklab, var(--ink) 75%, transparent);
  display: -webkit-box; -webkit-box-orient: vertical;
}
.member-socials { display: flex; gap: 6px; margin-top: 12px; }
.soc {
  width: 26px; height: 26px;
  border: 2px solid var(--ink); border-radius: 7px;
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--cream); font-size: 11px;
  transition: background 0.15s;
}
.soc:hover { background: var(--yellow); }

.members-enter-active, .members-leave-active { transition: all 0.3s ease; }
.members-enter-from, .members-leave-to { opacity: 0; transform: scale(0.9); }

@media (max-width: 1000px) { .team-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .team-grid { grid-template-columns: 1fr; } }
</style>
