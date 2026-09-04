import { useDB } from '~~/server/database'
import { eq, and, gt } from 'drizzle-orm'
import { accountUsers, otpCodes } from '~~/server/database/schema'
import { sendEmailOtp } from '~~/server/utils/email'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const user = session?.user as Record<string, unknown> | undefined
  if (!user?.accountId || !user.pendingTwoFactor) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const db = useDB()
  const accountId = user.accountId as number

  const [account] = await db.select().from(accountUsers).where(eq(accountUsers.id, accountId)).limit(1)
  if (!account || !account.emailOtpEnabled) {
    throw createError({ statusCode: 400, message: 'Email OTP nie jest włączone' })
  }

  // Rate limit: one code per minute
  const recent = await db.select().from(otpCodes)
    .where(and(
      eq(otpCodes.accountUserId, accountId),
      eq(otpCodes.type, 'email_2fa'),
      gt(otpCodes.expiresAt, new Date()),
    ))
    .limit(1)
  if (recent.length > 0) {
    throw createError({ statusCode: 429, message: 'Kod już wysłany, poczekaj chwilę' })
  }

  const code = String(Math.floor(100000 + Math.random() * 900000))
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

  await db.insert(otpCodes).values({ accountUserId: accountId, code, type: 'email_2fa', expiresAt })
  await sendEmailOtp(account.email, code)

  return { ok: true }
})
