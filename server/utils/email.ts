import nodemailer, { type Transporter } from 'nodemailer'
import { Resend } from 'resend'

let _resend: Resend | null = null

function getResend() {
  if (!_resend) {
    const config = useRuntimeConfig()
    _resend = new Resend(config.resendApiKey)
  }
  return _resend
}

export async function sendInvitationEmail(to: string, name: string, inviteUrl: string) {
  const config = useRuntimeConfig()
  const resend = getResend()

  await resend.emails.send({
    from: config.resendFromEmail,
    to,
    subject: 'Zaproszenie do panelu 8BitJelly',
    html: `
      <div style="font-family: 'Space Grotesk', sans-serif; max-width: 520px; margin: 0 auto; background: #FFF1EC; padding: 40px 32px; border-radius: 16px;">
        <h1 style="font-size: 24px; color: #1a1a1a; margin: 0 0 8px;">Cześć, ${name}! 👾</h1>
        <p style="color: #444; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
          Zapraszamy Cię do zarządzania swoim profilem na stronie 8BitJelly.
          Kliknij poniższy przycisk, żeby ustawić hasło i aktywować konto.
        </p>
        <a href="${inviteUrl}" style="display: inline-block; background: #FF6B6B; color: #fff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 15px;">
          Aktywuj konto →
        </a>
        <p style="color: #888; font-size: 13px; margin: 24px 0 0;">
          Link jest ważny przez 7 dni. Jeśli to nie Ty, zignoruj tę wiadomość.
        </p>
      </div>
    `,
  })
}

export async function sendEmailOtp(to: string, code: string) {
  const resend = getResend()
  const config = useRuntimeConfig()

  await resend.emails.send({
    from: config.resendFromEmail,
    to,
    subject: `Kod weryfikacyjny: ${code}`,
    html: `
      <div style="font-family: 'Space Grotesk', sans-serif; max-width: 520px; margin: 0 auto; background: #FFF1EC; padding: 40px 32px; border-radius: 16px;">
        <h1 style="font-size: 24px; color: #1a1a1a; margin: 0 0 8px;">Kod weryfikacyjny</h1>
        <p style="color: #444; font-size: 16px; margin: 0 0 24px;">
          Twój jednorazowy kod logowania do 8BitJelly:
        </p>
        <div style="background: #fff; border-radius: 12px; padding: 24px; text-align: center; letter-spacing: 8px; font-size: 36px; font-weight: 700; color: #1a1a1a; font-family: monospace;">
          ${code}
        </div>
        <p style="color: #888; font-size: 13px; margin: 24px 0 0;">
          Kod jest ważny przez 10 minut. Nie udostępniaj go nikomu.
        </p>
      </div>
    `,
  })
}

let _smtp: Transporter | null = null

function getSmtp() {
  const config = useRuntimeConfig()
  const port = Number(config.smtpPort) || 465
  _smtp ||= nodemailer.createTransport({
    host: config.smtpHost,
    port,
    secure: port === 465,
    auth: { user: config.smtpUser, pass: config.smtpPassword },
  })
  return _smtp
}

type ContactForm = {
  name: string
  email: string
  message: string
  phone?: string
  reason?: string
  position?: string
}

// plain text on purpose — form fields are interpolated raw, so no HTML to escape
export async function sendContactEmail(f: ContactForm) {
  const config = useRuntimeConfig()

  await getSmtp().sendMail({
    from: `"8BitJelly" <${config.smtpUser}>`,
    to: config.contactTo,
    replyTo: `${f.name} <${f.email}>`,
    subject: `[8BitJelly] ${f.reason || 'contact'} — ${f.name}`,
    text: [
      `Imię:       ${f.name}`,
      `Email:      ${f.email}`,
      `Telefon:    ${f.phone || '—'}`,
      `Temat:      ${f.reason || '—'}`,
      `Stanowisko: ${f.position || '—'}`,
      '',
      f.message,
    ].join('\n'),
  })
}
