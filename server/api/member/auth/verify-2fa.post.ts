import { useDB } from '~~/server/database'
import { eq, and, gt, isNull } from 'drizzle-orm'
import { verifyTotp } from '~~/server/utils/totp'
import { accountUsers, otpCodes, team } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const user = session?.user as Record<string, unknown> | undefined
  if (!user?.accountId || !user.pendingTwoFactor) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { code } = await readBody<{ code: string }>(event)
  if (!code) throw createError({ statusCode: 400, message: 'Kod jest wymagany' })

  const db = useDB()
  const accountId = user.accountId as number

  const [account] = await db.select().from(accountUsers).where(eq(accountUsers.id, accountId)).limit(1)
  if (!account) throw createError({ statusCode: 401, message: 'Unauthorized' })

  let verified = false

  if (account.totpEnabled && account.totpSecret) {
    verified = verifyTotp(account.totpSecret, code)
  }

  if (!verified && account.emailOtpEnabled) {
    const [otp] = await db.select().from(otpCodes).where(
      and(
        eq(otpCodes.accountUserId, accountId),
        eq(otpCodes.code, code),
        eq(otpCodes.type, 'email_2fa'),
        gt(otpCodes.expiresAt, new Date()),
        isNull(otpCodes.usedAt),
      ),
    ).limit(1)

    if (otp) {
      verified = true
      await db.update(otpCodes).set({ usedAt: new Date() }).where(eq(otpCodes.id, otp.id))
    }
  }

  if (!verified) throw createError({ statusCode: 401, message: 'Nieprawidłowy kod' })

  let memberName = account.email.split('@')[0]
  if (account.teamMemberId) {
    const [m] = await db.select({ name: team.name }).from(team).where(eq(team.id, account.teamMemberId)).limit(1)
    if (m) memberName = m.name
  }

  await setUserSession(event, {
    user: {
      accountId: account.id,
      name: memberName,
      email: account.email,
      role: account.role,
      teamMemberId: account.teamMemberId,
      twoFactorVerified: true,
    },
  })

  return { ok: true, role: account.role }
})
