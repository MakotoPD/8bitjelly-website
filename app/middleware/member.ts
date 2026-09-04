export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn, user } = useUserSession()
  if (!loggedIn.value) return navigateTo('/member/login')

  const u = user.value as Record<string, unknown> | null
  if (!u?.accountId) return navigateTo('/member/login')

  // If user needs 2FA, redirect there (unless already on verify page)
  if (u.pendingTwoFactor && to.path !== '/member/verify-2fa') {
    return navigateTo('/member/verify-2fa')
  }
})
