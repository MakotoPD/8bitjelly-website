import { useDB } from '~~/server/database'
import { team } from '~~/server/database/schema'
import { requireAdmin } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)

  const [row] = await useDB().insert(team).values({
    name: body.name,
    bioEn: body.bioEn || '',
    bioPl: body.bioPl || '',
    roles: body.roles || [],
    avatarEmoji: body.avatarEmoji || 'đźŽ®',
    avatarImage: body.avatarImage || null,
    instagram: body.instagram || null,
    github: body.github || null,
    artstation: body.artstation || null,
    itchio: body.itchio || null,
    linkedin: body.linkedin || null,
    twitter: body.twitter || null,
    youtube: body.youtube || null,
    tiktok: body.tiktok || null,
    twitch: body.twitch || null,
    discord: body.discord || null,
    bluesky: body.bluesky || null,
    behance: body.behance || null,
    website: body.website || null,
    isActive: body.isActive ?? true,
    sortOrder: body.sortOrder || 0,
  }).returning()

  return row
})

