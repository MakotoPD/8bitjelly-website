import { useDB } from '~~/server/database'
import { blogs } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const db = useDB()
  const blogRows = await db
    .select({ slug: blogs.slug, updatedAt: blogs.updatedAt })
    .from(blogs)
    .where(eq(blogs.isPublished, true))

  return blogRows.map(r => ({
    loc: `/blog/${r.slug}`,
    lastmod: r.updatedAt,
    changefreq: 'monthly',
    priority: 0.7,
    _i18nTransform: true,
  }))
})
