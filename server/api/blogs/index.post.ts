import { useDB } from '~~/server/database'
import { blogs } from '~~/server/database/schema'
import { requireAdmin } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const db = useDB()
  const body = await readBody(event)

  const [row] = await db.insert(blogs).values({
    slug: body.slug,
    titleEn: body.titleEn,
    titlePl: body.titlePl || '',
    contentEn: body.contentEn || '',
    contentPl: body.contentPl || '',
    excerptEn: body.excerptEn || '',
    excerptPl: body.excerptPl || '',
    author: body.author || '8BitJelly',
    tags: body.tags || [],
    coverEmoji: body.coverEmoji || 'đźŽ®',
    coverPattern: body.coverPattern || 'pattern-a',
    coverImage: body.coverImage || null,
    isFeatured: body.isFeatured || false,
    isPublished: body.isPublished || false,
    publishedAt: body.isPublished ? new Date() : null,
  }).returning()

  return row
})

