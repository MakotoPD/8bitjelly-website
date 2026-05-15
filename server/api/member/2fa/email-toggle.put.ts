import { useDB } from '~~/server/database'
import { eq } from 'drizzle-orm'
import { accountUsers } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const account = await requireMember(event)
  const { enabled } = await readBody<{ enabled: boolean }>(event)

  const db = useDB()
  await db.update(accountUsers).set({ emailOtpEnabled: enabled }).where(eq(accountUsers.id, account.accountId))
  return { ok: true, emailOtpEnabled: enabled }
})
