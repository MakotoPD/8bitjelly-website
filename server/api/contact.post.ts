export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  await verifyTurnstile(event, body.turnstileToken)

  if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim())
    throw createError({ statusCode: 400, message: 'Missing required fields' })

  await sendContactEmail(body)

  return { success: true }
})
