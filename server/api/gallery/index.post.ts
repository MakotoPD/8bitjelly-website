import { useDB } from '~~/server/database'
import { gallery } from '~~/server/database/schema'
import { requireAdmin } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)

  const [row] = await useDB().insert(gallery).values({
    gameTitle: body.gameTitle,
    imageUrl: body.imageUrl,
    altText: body.altText || '',
    sortOrder: body.sortOrder || 0,
  }).returning()

  return row
})

