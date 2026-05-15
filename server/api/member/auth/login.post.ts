import { useDB } from '~~/server/database'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { accountUsers, team } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody<{ email: string; password: string }>(event)
  if (!email || !password) throw createError({ statusCode: 400, message: 'email i password są wymagane' })

  const db = useDB()
  const [account] = await db.select().from(accountUsers).where(eq(accountUsers.email, email.toLowerCase())).limit(1)

  if (!account || !account.passwordHash || !account.isActive) {
    throw createError({ statusCode: 401, message: 'Nieprawidłowy email lub hasło' })
  }
  if (account.inviteToken) {
    throw createError({ statusCode: 403, message: 'Konto nie zostało jeszcze aktywowane' })
  }

  const valid = await bcrypt.compare(password, account.passwordHash)
  if (!valid) throw createError({ statusCode: 401, message: 'Nieprawidłowy email lub hasło' })

  const needs2FA = account.totpEnabled || account.emailOtpEnabled

  let memberName = account.email.split('@')[0]
  if (account.teamMemberId) {
    const [m] = await db.select({ name: team.name }).from(team).where(eq(team.id, account.teamMemberId)).limit(1)
    if (m) memberName = m.name
  }

  if (needs2FA) {
    await setUserSession(event, { user: { accountId: account.id, pendingTwoFactor: true } })
    return { requiresTwoFactor: true, totpEnabled: account.totpEnabled, emailOtpEnabled: account.emailOtpEnabled }
  }

  await setUserSession(event, {
    user: {
      accountId: account.id,
      name: memberName,
      email: account.email,
      role: account.role,
      teamMemberId: account.teamMemberId,
      twoFactorVerified: false,
    },
  })

  return { requiresTwoFactor: false, role: account.role }
})
