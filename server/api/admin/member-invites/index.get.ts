import { useDB } from '~~/server/database'
import { eq } from 'drizzle-orm'
import { accountUsers, team } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const db = useDB()

  const accounts = await db
    .select({
      id: accountUsers.id,
      email: accountUsers.email,
      role: accountUsers.role,
      isActive: accountUsers.isActive,
      totpEnabled: accountUsers.totpEnabled,
      emailOtpEnabled: accountUsers.emailOtpEnabled,
      inviteToken: accountUsers.inviteToken,
      inviteExpiresAt: accountUsers.inviteExpiresAt,
      createdAt: accountUsers.createdAt,
      teamMemberId: accountUsers.teamMemberId,
      memberName: team.name,
    })
    .from(accountUsers)
    .leftJoin(team, eq(accountUsers.teamMemberId, team.id))
    .orderBy(accountUsers.createdAt)

  return accounts.map(a => ({
    ...a,
    isPending: !!a.inviteToken,
  }))
})
