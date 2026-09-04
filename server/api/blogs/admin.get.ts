import { useDB } from '~~/server/database'
import { blogs } from '~~/server/database/schema'
import { requireAdmin } from '~~/server/utils/auth'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return useDB().select().from(blogs).orderBy(desc(blogs.createdAt))
})

