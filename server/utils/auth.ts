import type { H3Event } from 'h3'

export async function requireAdmin(event: H3Event) {
  const session = await getUserSession(event)
  const user = session?.user as Record<string, unknown> | undefined
  if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })
  // Legacy single-password admin OR invited account with role 'admin'
  if (!user.isAdmin && user.role !== 'admin') {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
  return user
}

export async function requireMember(event: H3Event) {
  const session = await getUserSession(event)
  const user = session?.user as Record<string, unknown> | undefined
  if (!user?.accountId) throw createError({ statusCode: 401, message: 'Unauthorized' })
  if (user.pendingTwoFactor) throw createError({ statusCode: 403, message: '2FA required' })
  return user as { accountId: number; name: string; email: string; role: string; teamMemberId: number | null; twoFactorVerified: boolean }
}
