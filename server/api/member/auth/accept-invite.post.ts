import { useDB } from '~~/server/database'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { accountUsers, team } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const { token, password } = await readBody<{ token: string; password: string }>(event)
  if (!token || !password) throw createError({ statusCode: 400, message: 'token i password są wymagane' })
  if (password.length < 8) throw createError({ statusCode: 400, message: 'Hasło musi mieć co najmniej 8 znaków' })

  const db = useDB()
  const [account] = await db.select().from(accountUsers).where(eq(accountUsers.inviteToken, token)).limit(1)

  if (!account) throw createError({ statusCode: 404, message: 'Nieprawidłowy token' })
  if (account.inviteExpiresAt && account.inviteExpiresAt < new Date()) {
    throw createError({ statusCode: 410, message: 'Token wygasł' })
  }

  const passwordHash = await bcrypt.hash(password, 12)
  await db.update(accountUsers).set({
    passwordHash,
    inviteToken: null,
    inviteExpiresAt: null,
    updatedAt: new Date(),
  }).where(eq(accountUsers.id, account.id))

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
