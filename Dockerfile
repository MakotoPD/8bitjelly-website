# ── Stage 1: dependencies ────────────────────────────────────────────────────
FROM node:22-alpine AS deps

RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile


# ── Stage 2: build ───────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@9.15.9 --activate

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .


RUN pnpm build


# ── Stage 3: production image ─────────────────────────────────────────────────
FROM node:22-alpine AS runner

RUN apk add --no-cache dumb-init

RUN addgroup -g 1001 -S nodejs && adduser -S nuxtjs -u 1001

WORKDIR /app

# Only copy the built output — no source, no dev deps
COPY --from=builder --chown=nuxtjs:nodejs /app/.output ./.output

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Runtime secrets — pass via docker run -e or hosting platform env vars:
#   DATABASE_URL
#   ADMIN_PASSWORD
#   NUXT_SESSION_PASSWORD
#   R2_ACCOUNT_ID
#   R2_ACCESS_KEY_ID
#   R2_SECRET_ACCESS_KEY
#   R2_BUCKET
#   R2_PUBLIC_URL
#   NUXT_TURNSTILE_SECRET_KEY        <- server secret, MUST be NUXT_-prefixed
#   NUXT_PUBLIC_TURNSTILE_SITE_KEY
#   NUXT_SMTP_HOST / NUXT_SMTP_PORT / NUXT_SMTP_USER / NUXT_SMTP_PASSWORD
#   NUXT_CONTACT_TO

USER nuxtjs

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", ".output/server/index.mjs"]
