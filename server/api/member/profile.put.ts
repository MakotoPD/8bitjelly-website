import { useDB } from '~~/server/database'
import { eq } from 'drizzle-orm'
import { team } from '~~/server/database/schema'

const ALLOWED_FIELDS = [
  'name', 'bioEn', 'bioPl', 'avatarEmoji', 'avatarImage',
  'instagram', 'github', 'artstation', 'itchio', 'linkedin',
  'twitter', 'youtube', 'tiktok', 'twitch', 'discord',
  'bluesky', 'behance', 'website',
]

export default defineEventHandler(async (event) => {
  const account = await requireMember(event)
  if (!account.teamMemberId) throw createError({ statusCode: 400, message: 'Konto nie jest powiązane z profilem' })

  const body = await readBody<Record<string, unknown>>(event)
  const updates: Record<string, unknown> = {}
  for (const key of ALLOWED_FIELDS) {
    if (key in body) updates[key] = body[key]
  }

  if (Object.keys(updates).length === 0) throw createError({ statusCode: 400, message: 'Brak pól do aktualizacji' })

  const db = useDB()
  const [updated] = await db.update(team).set(updates).where(eq(team.id, account.teamMemberId)).returning()
  return updated
})
