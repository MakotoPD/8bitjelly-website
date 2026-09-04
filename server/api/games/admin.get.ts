import { useDB } from '~~/server/database'
import { games } from '~~/server/database/schema'
import { requireAdmin } from '~~/server/utils/auth'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const rows = await useDB().select().from(games).orderBy(asc(games.sortOrder))
  return rows
})

