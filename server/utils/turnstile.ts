import type { H3Event } from 'h3'

export async function verifyTurnstile(event: H3Event, token?: string) {
  const secret = useRuntimeConfig(event).turnstileSecretKey
  if (!secret) {
    if (import.meta.dev) return
    throw createError({ statusCode: 500, message: 'Turnstile is not configured' })
  }

  const res = await $fetch<{ success: boolean }>('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({
      secret,
      response: token || '',
      remoteip: getRequestIP(event, { xForwardedFor: true }) || '',
    }),
  })

  if (!res.success) throw createError({ statusCode: 400, message: 'Weryfikacja captcha nie powiodła się' })
}
