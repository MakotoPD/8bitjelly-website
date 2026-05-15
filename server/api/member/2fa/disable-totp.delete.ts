import { useDB } from '~~/server/database'
import { eq } from 'drizzle-orm'
import { verifyTotp } from '~~/server/utils/totp'
import { accountUsers } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const account = await requireMember(event)
  const { code } = await readBody<{ code: string }>(event)
  if (!code) throw createError({ statusCode: 400, message: 'Kod jest wymagany' })

  const db = useDB()
  const [acc] = await db.select().from(accountUsers).where(eq(accountUsers.id, account.accountId)).limit(1)
  if (!acc?.totpSecret || !acc.totpEnabled) throw createError({ statusCode: 400, message: 'TOTP nie jest włączone' })

  if (!verifyTotp(acc.totpSecret, code)) throw createError({ statusCode: 401, message: 'Nieprawidłowy kod' })

  await db.update(accountUsers).set({ totpEnabled: false, totpSecret: null }).where(eq(accountUsers.id, account.accountId))
  return { ok: true }
})
