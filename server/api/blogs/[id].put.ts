import { useDB } from '~~/server/database'
import { blogs } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  const db = useDB()
  const body = await readBody(event)

  const [row] = await db.update(blogs).set({
    slug: body.slug,
    titleEn: body.titleEn,
    titlePl: body.titlePl || '',
    contentEn: body.contentEn || '',
    contentPl: body.contentPl || '',
    excerptEn: body.excerptEn || '',
    excerptPl: body.excerptPl || '',
    author: body.author,
    tags: body.tags || [],
    coverEmoji: body.coverEmoji,
    coverPattern: body.coverPattern,
    coverImage: body.coverImage || null,
    isFeatured: body.isFeatured,
    isPublished: body.isPublished,
    publishedAt: body.isPublished ? new Date() : null,
    updatedAt: new Date(),
  }).where(eq(blogs.id, id)).returning()

  if (!row) throw createError({ statusCode: 404 })
  return row
})
