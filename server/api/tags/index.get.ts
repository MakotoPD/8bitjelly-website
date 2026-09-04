import { useDB } from '~~/server/database'
import { blogTags } from '~~/server/database/schema'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async () => {
  return useDB().select().from(blogTags).orderBy(asc(blogTags.name))
})

