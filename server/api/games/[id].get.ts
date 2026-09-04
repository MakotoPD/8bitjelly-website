import { useDB } from '~~/server/database'
import { games } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  const [row] = await useDB().select().from(games).where(eq(games.id, id))
  if (!row) throw createError({ statusCode: 404 })
  return row
})
