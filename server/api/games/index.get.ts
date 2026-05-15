import { useDB } from '~~/server/database'
import { games } from '~~/server/database/schema'
import { asc, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const db = useDB()
  const locale = (getQuery(event).locale as string) || 'en'
  const priorityOnly = getQuery(event).priority === 'true'

  let q = db.select().from(games).$dynamic()
  if (priorityOnly) q = q.where(eq(games.isPriority, true))

  const rows = await q.orderBy(asc(games.sortOrder))

  return rows.map(r => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: locale === 'pl' ? (r.descriptionPl || r.descriptionEn) : r.descriptionEn,
    tags: r.tags || [],
    platform: r.platform,
    status: r.status,
    coverEmoji: r.coverEmoji,
    coverPattern: r.coverPattern,
    coverImage: r.coverImage,
    itchioUrl: r.itchioUrl,
    steamUrl: r.steamUrl,
    isFeatured: r.isFeatured,
    isPriority: r.isPriority,
  }))
})

