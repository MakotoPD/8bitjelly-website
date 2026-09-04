import { useDB } from '~~/server/database'
import { eq } from 'drizzle-orm'
import * as OTPAuth from 'otpauth'
import QRCode from 'qrcode'
import { accountUsers } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const account = await requireMember(event)
  const db = useDB()

  const [acc] = await db.select().from(accountUsers).where(eq(accountUsers.id, account.accountId)).limit(1)
  if (!acc) throw createError({ statusCode: 404, message: 'Konto nie znalezione' })

  const secret = new OTPAuth.Secret()
  const secretBase32 = secret.base32

  const totp = new OTPAuth.TOTP({
    issuer: '8BitJelly',
    label: account.email,
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret,
  })

  const qrDataUrl = await QRCode.toDataURL(totp.toString())

  await db.update(accountUsers).set({ totpSecret: secretBase32 }).where(eq(accountUsers.id, account.accountId))

  return { secret: secretBase32, qrDataUrl }
})
