import { useDB } from '~~/server/database'
import { lookings } from '~~/server/database/schema'
import { eq, asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const locale = (getQuery(event).locale as string) || 'en'
  const rows = await useDB().select().from(lookings).where(eq(lookings.isActive, true)).orderBy(asc(lookings.sortOrder))

  return rows.map(r => ({
    id: r.id,
    title: locale === 'pl' ? (r.titlePl || r.titleEn) : r.titleEn,
  }))
})

