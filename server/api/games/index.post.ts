import { useDB } from '~~/server/database'
import { games } from '~~/server/database/schema'
import { requireAdmin } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)
  const now = new Date()

  const [row] = await useDB().insert(games).values({
    slug: body.slug,
    title: body.title,
    descriptionEn: body.descriptionEn || '',
    descriptionPl: body.descriptionPl || '',
    contentEn: body.contentEn || '',
    contentPl: body.contentPl || '',
    tags: body.tags || [],
    platform: body.platform || 'PC',
    status: body.status || 'in-dev',
    coverEmoji: body.coverEmoji || 'đźŽ®',
    coverPattern: body.coverPattern || 'pattern-a',
    coverImage: body.coverImage || null,
    itchioUrl: body.itchioUrl || null,
    steamUrl: body.steamUrl || null,
    isFeatured: body.isFeatured || false,
    isPriority: body.isPriority || false,
    sortOrder: body.sortOrder || 0,
    createdAt: now,
    updatedAt: now,
  }).returning()

  return row
})

