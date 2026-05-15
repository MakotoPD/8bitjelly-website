# ── Stage 1: dependencies ────────────────────────────────────────────────────
FROM node:22-alpine AS deps

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --no-frozen-lockfile


# ── Stage 2: build ───────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build args for public runtime config baked at build time
ARG NUXT_PUBLIC_HCAPTCHA_SITE_KEY
ARG NUXT_PUBLIC_WEB3FORMS_KEY

RUN pnpm build


# ── Stage 3: production image ─────────────────────────────────────────────────
FROM node:22-alpine AS runner

RUN apk add --no-cache dumb-init

WORKDIR /app

# Only copy the built output — no source, no dev deps
COPY --from=builder /app/.output ./output

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

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "output/server/index.mjs"]
