<div align="center">

<img src="https://8bitjelly.com/logo_white.png" alt="8BitJelly" width="220">

# 8BitJelly

**[8bitjelly.com](https://8bitjelly.com)** — website of a hobby game development group.

Nuxt 4 · Vue 3 · Nuxt UI 4 · Tailwind CSS 4 · Drizzle ORM · PostgreSQL

</div>

---

## What this is

The full 8BitJelly site: a landing page built from sections (hero, games, team, blog, stats,
recruitment), a blog, a gallery, game pages and a contact form — plus a custom CMS backend
(`/admin`) and a team member area (`/member`) with invites and 2FA. Bilingual: EN (default) and PL.

## Stack

| Layer | What's used |
|---|---|
| Framework | [Nuxt 4](https://nuxt.com) (SSR, Nitro), Vue 3, TypeScript |
| UI | [@nuxt/ui](https://ui.nuxt.com) 4, [Tailwind CSS](https://tailwindcss.com) 4, Heroicons + Simple Icons |
| Animation | [GSAP](https://gsap.com) |
| State | [Pinia](https://pinia.vuejs.org), [VueUse](https://vueuse.org) |
| i18n | [@nuxtjs/i18n](https://i18n.nuxtjs.org) — `en` / `pl`, `prefix_except_default` strategy |
| Database | [PostgreSQL](https://www.postgresql.org) + [Drizzle ORM](https://orm.drizzle.team) (`postgres.js`) |
| Auth | [nuxt-auth-utils](https://github.com/atinux/nuxt-auth-utils), bcryptjs, TOTP via [otpauth](https://github.com/hectorm/otpauth) + QR codes |
| Content editor | [Tiptap](https://tiptap.dev) 3 (link, image, underline, text-align, code block + lowlight) |
| Media | [@nuxt/image](https://image.nuxt.com), Cloudflare R2 via `@aws-sdk/client-s3` |
| Email | [Resend](https://resend.com) (invites, OTP) and SMTP via [Nodemailer](https://nodemailer.com) (contact form) |
| Anti-spam | [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) |
| SEO | [@nuxtjs/sitemap](https://nuxtseo.com/sitemap), `robots.txt`, `llms.txt`, OG tags, PWA manifest |
| Analytics | [nuxt-gtag](https://github.com/johannschopplich/nuxt-gtag) (GA4 with consent mode) + [Umami](https://umami.is) |
| Fonts | Google Fonts: Titan One, Space Grotesk, Press Start 2P, JetBrains Mono, Fraunces |
| Deployment | Docker (multi-stage, `node:22-alpine`, `dumb-init`, non-root user) |

## Structure

```
app/
  components/         AppNav, AppFooter, Lightbox, CookieBanner, Turnstile
    sections/         Hero, Games, Team, Blog, Stats, About, Join
    admin/            CMS panel components
  layouts/            default, admin, member
  middleware/         admin, member
  pages/              /, blog, games/[slug], gallery, contact, privacy, terms, admin/*, member/*
i18n/lang/            en.json, pl.json
server/
  api/                blogs, games, gallery, team, lookings, contact, auth, member/*, admin/*
  database/           schema.ts (Drizzle) + migrations
  utils/              auth, email, totp, turnstile
public/               logo, icons, og.png, manifest, robots.txt, llms.txt
scripts/              seed-from-strapi.ts (data migration from the old Strapi CMS)
```

### Data model

`blogs`, `blog_tags`, `games`, `team`, `gallery`, `lookings` (open roles),
`account_users`, `otp_codes`.

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Database:

```bash
pnpm db:generate  # generate migrations from schema.ts
pnpm db:migrate   # apply them
pnpm db:studio    # Drizzle Studio
```

Production:

```bash
pnpm build && pnpm preview
```

Docker:

```bash
docker build -t 8bitjelly . && docker run -p 3000:3000 --env-file .env 8bitjelly
```

## Environment variables

```
DATABASE_URL
ADMIN_PASSWORD
NUXT_SESSION_PASSWORD
R2_ACCOUNT_ID / R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY / R2_BUCKET / R2_PUBLIC_URL
RESEND_API_KEY / RESEND_FROM_EMAIL
NUXT_TURNSTILE_SECRET_KEY / NUXT_PUBLIC_TURNSTILE_SITE_KEY
NUXT_SMTP_HOST / NUXT_SMTP_PORT / NUXT_SMTP_USER / NUXT_SMTP_PASSWORD
NUXT_CONTACT_TO
APP_URL
```

Server-side secrets must be `NUXT_`-prefixed — Nitro maps them onto `runtimeConfig`.
