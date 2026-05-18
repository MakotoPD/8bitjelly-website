import { useDB } from '~~/server/database'
import { games } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const locale = (getQuery(event).locale as string) || 'en'

  const rows = await useDB().select().from(games).where(eq(games.slug, slug!)).limit(1)
  if (!rows[0]) throw createError({ statusCode: 404, message: 'Game not found' })

  const g = rows[0]
  return {
    id: g.id,
    slug: g.slug,
    title: g.title,
    description: locale === 'pl' ? (g.descriptionPl || g.descriptionEn) : g.descriptionEn,
    content: locale === 'pl' ? (g.contentPl || g.contentEn) : g.contentEn,
    tags: g.tags,
    platform: g.platform,
    status: g.status,
    coverEmoji: g.coverEmoji,
    coverPattern: g.coverPattern,
    coverImage: g.coverImage,
    itchioUrl: g.itchioUrl,
    steamUrl: g.steamUrl,
    isFeatured: g.isFeatured,
    isPriority: g.isPriority,
  }
})
