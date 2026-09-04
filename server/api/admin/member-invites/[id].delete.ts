import { useDB } from '~~/server/database'
import { eq } from 'drizzle-orm'
import { accountUsers } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  if (!id) throw createError({ statusCode: 400, message: 'Nieprawidłowe ID' })

  const db = useDB()
  await db.update(accountUsers).set({ isActive: false }).where(eq(accountUsers.id, id))
  return { ok: true }
})
