import { useDB } from '~~/server/database'
import { gallery } from '~~/server/database/schema'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const rows = await useDB().select().from(gallery).orderBy(asc(gallery.gameTitle), asc(gallery.sortOrder))

  const grouped: Record<string, typeof rows> = {}
  for (const row of rows) {
    if (!grouped[row.gameTitle]) grouped[row.gameTitle] = []
    grouped[row.gameTitle].push(row)
  }
  return grouped
})

