import { useDB } from '~~/server/database'
import { blogs } from '~~/server/database/schema'
import { desc, eq, sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const db = useDB()
  const query = getQuery(event)
  const tag = query.tag as string | undefined
  const locale = (query.locale as string) || 'en'
  const limit = Number(query.limit) || 20
  const offset = Number(query.offset) || 0

  let q = db.select().from(blogs).where(eq(blogs.isPublished, true)).$dynamic()

  if (tag) {
    q = q.where(sql`${blogs.tags} @> ARRAY[${tag}]::text[]`)
  }

  const rows = await q.orderBy(desc(blogs.publishedAt)).limit(limit).offset(offset)

  return rows.map(r => ({
    id: r.id,
    slug: r.slug,
    title: locale === 'pl' ? (r.titlePl || r.titleEn) : r.titleEn,
    excerpt: locale === 'pl' ? (r.excerptPl || r.excerptEn) : r.excerptEn,
    author: r.author,
    tags: r.tags,
    coverEmoji: r.coverEmoji,
    coverPattern: r.coverPattern,
    coverImage: r.coverImage,
    isFeatured: r.isFeatured,
    publishedAt: r.publishedAt,
    createdAt: r.createdAt,
  }))
})

