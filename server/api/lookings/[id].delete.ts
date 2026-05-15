import { useDB } from '~~/server/database'
import { lookings } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  await useDB().delete(lookings).where(eq(lookings.id, id))
  return { ok: true }
})
