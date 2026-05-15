import { useDB } from '~~/server/database'
import { lookings } from '~~/server/database/schema'
import { requireAdmin } from '~~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const body = await readBody(event)

  const [row] = await useDB().insert(lookings).values({
    titleEn: body.titleEn,
    titlePl: body.titlePl || '',
    isActive: body.isActive ?? true,
    sortOrder: body.sortOrder || 0,
  }).returning()

  return row
})

