import { useDB } from '~~/server/database'
import { team } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const { ids } = await readBody<{ ids: number[] }>(event)
  if (!Array.isArray(ids)) throw createError({ statusCode: 400, message: 'ids must be an array' })

  await Promise.all(ids.map((id, index) =>
    useDB().update(team).set({ sortOrder: index + 1 }).where(eq(team.id, id))
  ))

  return { ok: true }
})
