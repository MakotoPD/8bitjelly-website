import { useDB } from '~~/server/database'
import { blogs } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'
import { requireAdmin } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  await useDB().delete(blogs).where(eq(blogs.id, id))
  return { ok: true }
})
