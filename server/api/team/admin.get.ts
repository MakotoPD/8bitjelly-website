import { useDB } from '~~/server/database'
import { team } from '~~/server/database/schema'
import { requireAdmin } from '~~/server/utils/auth'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return useDB().select().from(team).orderBy(asc(team.sortOrder))
})

