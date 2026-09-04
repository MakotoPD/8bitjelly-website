import postgres from 'postgres'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(process.cwd(), '.env') })

const url = process.env.DATABASE_URL
if (!url) {
  console.error('DATABASE_URL not set')
  process.exit(1)
}

const sql = postgres(url)

await sql`
  CREATE TABLE IF NOT EXISTS "account_users" (
    "id" serial PRIMARY KEY NOT NULL,
    "email" text NOT NULL,
    "password_hash" text,
    "team_member_id" integer REFERENCES "team"("id") ON DELETE SET NULL,
    "role" text DEFAULT 'member' NOT NULL,
    "is_active" boolean DEFAULT true NOT NULL,
    "invite_token" text,
    "invite_expires_at" timestamp with time zone,
    "totp_secret" text,
    "totp_enabled" boolean DEFAULT false NOT NULL,
    "email_otp_enabled" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT "account_users_email_unique" UNIQUE("email"),
    CONSTRAINT "account_users_invite_token_unique" UNIQUE("invite_token")
  )
`
console.log('✓ account_users table ready')

await sql`
  CREATE TABLE IF NOT EXISTS "otp_codes" (
    "id" serial PRIMARY KEY NOT NULL,
    "account_user_id" integer NOT NULL REFERENCES "account_users"("id") ON DELETE CASCADE,
    "code" text NOT NULL,
    "type" text NOT NULL,
    "expires_at" timestamp with time zone NOT NULL,
    "used_at" timestamp with time zone
  )
`
console.log('✓ otp_codes table ready')

await sql`
  CREATE INDEX IF NOT EXISTS "account_users_email_idx" ON "account_users" ("email")
`
console.log('✓ index ready')

await sql.end()
console.log('Done!')
