export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  const res = await $fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: {
      access_key: config.public.web3formsKey,
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      message: body.message,
      subject: body.subject || 'Contact from 8BitJelly',
      reason: body.reason || '',
      position: body.position || '',
    },
  })

  return res
})
