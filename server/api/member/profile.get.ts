import { useDB } from '~~/server/database'
import { eq } from 'drizzle-orm'
import { accountUsers, team } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const account = await requireMember(event)
  const db = useDB()

  const [acc] = await db
    .select({ totpEnabled: accountUsers.totpEnabled, emailOtpEnabled: accountUsers.emailOtpEnabled })
    .from(accountUsers)
    .where(eq(accountUsers.id, account.accountId))
    .limit(1)

  if (!account.teamMemberId) {
    return { member: null, totpEnabled: acc?.totpEnabled ?? false, emailOtpEnabled: acc?.emailOtpEnabled ?? false }
  }

  const [member] = await db.select().from(team).where(eq(team.id, account.teamMemberId)).limit(1)
  return { member: member ?? null, totpEnabled: acc?.totpEnabled ?? false, emailOtpEnabled: acc?.emailOtpEnabled ?? false }
})
