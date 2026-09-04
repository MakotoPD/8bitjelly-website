import { useDB } from '~~/server/database'
import { eq } from 'drizzle-orm'
import { accountUsers, team } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const token = getQuery(event).token as string
  if (!token) throw createError({ statusCode: 400, message: 'Brak tokenu' })

  const db = useDB()
  const [account] = await db
    .select({
      email: accountUsers.email,
      inviteExpiresAt: accountUsers.inviteExpiresAt,
      memberName: team.name,
    })
    .from(accountUsers)
    .leftJoin(team, eq(accountUsers.teamMemberId, team.id))
    .where(eq(accountUsers.inviteToken, token))
    .limit(1)

  if (!account) throw createError({ statusCode: 404, message: 'Nieprawidłowy token zaproszenia' })
  if (account.inviteExpiresAt && account.inviteExpiresAt < new Date()) {
    throw createError({ statusCode: 410, message: 'Token zaproszenia wygasł' })
  }

  return { email: account.email, name: account.memberName }
})
