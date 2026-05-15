import { useDB } from '~~/server/database'
import { team } from '~~/server/database/schema'
import { asc, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const locale = (getQuery(event).locale as string) || 'en'
  const role = getQuery(event).role as string | undefined
  const db = useDB()

  let rows = await db.select().from(team).where(eq(team.isActive, true)).orderBy(asc(team.sortOrder))

  if (role && role !== 'all') {
    rows = rows.filter(r => (r.roles || []).includes(role))
  }

  return rows.map(r => ({
    id: r.id,
    name: r.name,
    bio: locale === 'pl' ? (r.bioPl || r.bioEn) : r.bioEn,
    roles: r.roles || [],
    avatarEmoji: r.avatarEmoji,
    avatarImage: r.avatarImage,
    instagram: r.instagram,
    github: r.github,
    artstation: r.artstation,
    itchio: r.itchio,
    linkedin: r.linkedin,
    twitter: r.twitter,
    youtube: r.youtube,
    tiktok: r.tiktok,
    twitch: r.twitch,
    discord: r.discord,
    bluesky: r.bluesky,
    behance: r.behance,
    website: r.website,
  }))
})

