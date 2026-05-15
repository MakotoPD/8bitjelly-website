export default defineNuxtRouteMiddleware(async () => {
  const { loggedIn, user } = useUserSession()
  if (!loggedIn.value) return navigateTo('/admin/login')
  const u = user.value as Record<string, unknown> | null
  if (u && !u.isAdmin && u.role !== 'admin') {
    return navigateTo('/member')
  }
})
