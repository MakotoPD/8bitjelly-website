import { useDB } from '~~/server/database'
import { gallery } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) throw createError({ statusCode: 400, statusMessage: 'Invalid id' })
  const body = await readBody(event)

  const [row] = await useDB().update(gallery).set({
    gameTitle: body.gameTitle,
    altText: body.altText || '',
    sortOrder: Number(body.sortOrder) || 0,
  }).where(eq(gallery.id, id)).returning()

  if (!row) throw createError({ statusCode: 404 })
  return row
})
