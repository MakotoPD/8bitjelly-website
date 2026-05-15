import { useDB } from '~~/server/database'
import { games } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody(event)
  const now = new Date()

  const [row] = await useDB().update(games).set({
    slug: body.slug,
    title: body.title,
    descriptionEn: body.descriptionEn || '',
    descriptionPl: body.descriptionPl || '',
    tags: body.tags || [],
    platform: body.platform,
    status: body.status,
    coverEmoji: body.coverEmoji,
    coverPattern: body.coverPattern,
    coverImage: body.coverImage || null,
    itchioUrl: body.itchioUrl || null,
    steamUrl: body.steamUrl || null,
    isFeatured: body.isFeatured,
    isPriority: body.isPriority,
    sortOrder: body.sortOrder || 0,
    updatedAt: now,
  }).where(eq(games.id, id)).returning()

  if (!row) throw createError({ statusCode: 404 })
  return row
})
