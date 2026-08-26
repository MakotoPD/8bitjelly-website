export default defineEventHandler(async (event) => {
  const { password, turnstileToken } = await readBody<{ password: string; turnstileToken?: string }>(event)
  const config = useRuntimeConfig()

  await verifyTurnstile(event, turnstileToken)

  if (!password || password !== config.adminPassword) {
    throw createError({ statusCode: 401, message: 'Invalid password' })
  }

  await setUserSession(event, { user: { isAdmin: true, name: 'Admin' } })
  return { ok: true }
})
