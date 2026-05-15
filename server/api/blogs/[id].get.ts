import { useDB } from '~~/server/database'
import { blogs } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const param = getRouterParam(event, 'id')!
  const locale = (getQuery(event).locale as string) || 'en'
  const db = useDB()

  // numeric ID → admin-only, return full row
  if (/^\d+$/.test(param)) {
    await requireAdmin(event)
    const [row] = await db.select().from(blogs).where(eq(blogs.id, Number(param)))
    if (!row) throw createError({ statusCode: 404 })
    return row
  }

  // slug → public, return locale-mapped content
  const [row] = await db.select().from(blogs).where(eq(blogs.slug, param))
  if (!row || !row.isPublished) throw createError({ statusCode: 404 })

  return {
    id: row.id,
    slug: row.slug,
    title: locale === 'pl' ? (row.titlePl || row.titleEn) : row.titleEn,
    content: locale === 'pl' ? (row.contentPl || row.contentEn) : row.contentEn,
    excerpt: locale === 'pl' ? (row.excerptPl || row.excerptEn) : row.excerptEn,
    author: row.author,
    tags: row.tags || [],
    coverImage: row.coverImage,
    coverEmoji: row.coverEmoji,
    coverPattern: row.coverPattern,
    isFeatured: row.isFeatured,
    publishedAt: row.publishedAt,
  }
})
