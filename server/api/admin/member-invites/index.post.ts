import { useDB } from '~~/server/database'
import { eq } from 'drizzle-orm'
import { randomUUID } from 'uncrypto'
import { accountUsers, team } from '~~/server/database/schema'
import { sendInvitationEmail } from '~~/server/utils/email'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const { email, teamMemberId, role } = await readBody<{
    email: string
    teamMemberId?: number
    role: 'member' | 'admin'
  }>(event)

  if (!email || !role) throw createError({ statusCode: 400, message: 'email i role są wymagane' })
  if (!['member', 'admin'].includes(role)) throw createError({ statusCode: 400, message: 'Nieprawidłowa rola' })

  const db = useDB()

  const existing = await db.select().from(accountUsers).where(eq(accountUsers.email, email)).limit(1)
  if (existing.length > 0) throw createError({ statusCode: 409, message: 'Konto z tym emailem już istnieje' })

  const config = useRuntimeConfig()
  const inviteToken = randomUUID()
  const inviteExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  let memberName = email.split('@')[0]
  if (teamMemberId) {
    const member = await db.select({ name: team.name }).from(team).where(eq(team.id, teamMemberId)).limit(1)
    if (member.length > 0) memberName = member[0].name
  }

  const [created] = await db.insert(accountUsers).values({
    email,
    teamMemberId: teamMemberId ?? null,
    role,
    inviteToken,
    inviteExpiresAt,
  }).returning()

  const inviteUrl = `${config.appUrl}/member/accept-invite?token=${inviteToken}`
  await sendInvitationEmail(email, memberName, inviteUrl)

  return { id: created.id, email: created.email, role: created.role }
})
