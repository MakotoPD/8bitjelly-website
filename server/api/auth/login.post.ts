export default defineEventHandler(async (event) => {
  const { password } = await readBody<{ password: string }>(event)
  const config = useRuntimeConfig()

  if (!password || password !== config.adminPassword) {
    throw createError({ statusCode: 401, message: 'Invalid password' })
  }

  await setUserSession(event, { user: { isAdmin: true, name: 'Admin' } })
  return { ok: true }
})
