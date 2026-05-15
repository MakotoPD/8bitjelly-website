import { useDB } from '~~/server/database'
import { blogs, games } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const db = useDB()
  const [blogRows, gameRows] = await Promise.all([
    db.select({ slug: blogs.slug }).from(blogs).where(eq(blogs.isPublished, true)),
    db.select({ slug: games.slug }).from(games),
  ])

  return [
    ...blogRows.map(r => ({ loc: `/blog/${r.slug}`, _i18nTransform: true })),
    ...gameRows.map(r => ({ loc: `/games/${r.slug}`, _i18nTransform: true })),
  ]
})

