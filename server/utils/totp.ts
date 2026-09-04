import * as OTPAuth from 'otpauth'

export function verifyTotp(secret: string, token: string): boolean {
  const totp = new OTPAuth.TOTP({
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(secret),
  })
  const delta = totp.validate({ token, window: 1 })
  return delta !== null
}
