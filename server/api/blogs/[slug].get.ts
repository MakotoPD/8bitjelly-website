import { useDB } from '~~/server/database'
import { blogs } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')!
  const locale = (getQuery(event).locale as string) || 'en'
  const db = useDB()

  const [row] = await db.select().from(blogs).where(eq(blogs.slug, slug))
  if (!row || !row.isPublished) throw createError({ statusCode: 404, message: 'Not found' })

  return {
    id: row.id,
    slug: row.slug,
    title: locale === 'pl' ? (row.titlePl || row.titleEn) : row.titleEn,
    content: locale === 'pl' ? (row.contentPl || row.contentEn) : row.contentEn,
    excerpt: locale === 'pl' ? (row.excerptPl || row.excerptEn) : row.excerptEn,
    author: row.author,
    tags: row.tags,
    coverEmoji: row.coverEmoji,
    coverPattern: row.coverPattern,
    coverImage: row.coverImage,
    publishedAt: row.publishedAt,
    createdAt: row.createdAt,
  }
})
