import { pgTable, text, integer, boolean, serial, timestamp, index } from 'drizzle-orm/pg-core'

export const blogs = pgTable('blogs', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  titleEn: text('title_en').notNull(),
  titlePl: text('title_pl').notNull().default(''),
  contentEn: text('content_en').notNull().default(''),
  contentPl: text('content_pl').notNull().default(''),
  excerptEn: text('excerpt_en').notNull().default(''),
  excerptPl: text('excerpt_pl').notNull().default(''),
  author: text('author').notNull().default('8BitJelly'),
  tags: text('tags').array().notNull().default([]),
  coverEmoji: text('cover_emoji').notNull().default('🎮'),
  coverPattern: text('cover_pattern').notNull().default('pattern-a'),
  coverImage: text('cover_image'),
  isFeatured: boolean('is_featured').notNull().default(false),
  isPublished: boolean('is_published').notNull().default(false),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, t => [index('blogs_slug_idx').on(t.slug)])

export const games = pgTable('games', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  descriptionEn: text('description_en').notNull().default(''),
  descriptionPl: text('description_pl').notNull().default(''),
  contentEn: text('content_en').notNull().default(''),
  contentPl: text('content_pl').notNull().default(''),
  tags: text('tags').array().notNull().default([]),
  platform: text('platform').notNull().default('PC'),
  status: text('status').notNull().default('in-dev'),
  coverEmoji: text('cover_emoji').notNull().default('🎮'),
  coverPattern: text('cover_pattern').notNull().default('pattern-a'),
  coverImage: text('cover_image'),
  itchioUrl: text('itchio_url'),
  steamUrl: text('steam_url'),
  isFeatured: boolean('is_featured').notNull().default(false),
  isPriority: boolean('is_priority').notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const team = pgTable('team', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  bioEn: text('bio_en').notNull().default(''),
  bioPl: text('bio_pl').notNull().default(''),
  roles: text('roles').array().notNull().default([]),
  avatarEmoji: text('avatar_emoji').notNull().default('🎮'),
  avatarImage: text('avatar_image'),
  instagram: text('instagram'),
  github: text('github'),
  artstation: text('artstation'),
  itchio: text('itchio'),
  linkedin: text('linkedin'),
  twitter: text('twitter'),
  youtube: text('youtube'),
  tiktok: text('tiktok'),
  twitch: text('twitch'),
  discord: text('discord'),
  bluesky: text('bluesky'),
  behance: text('behance'),
  website: text('website'),
  isActive: boolean('is_active').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const gallery = pgTable('gallery', {
  id: serial('id').primaryKey(),
  gameTitle: text('game_title').notNull(),
  imageUrl: text('image_url').notNull(),
  altText: text('alt_text').notNull().default(''),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const blogTags = pgTable('blog_tags', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
})

export const lookings = pgTable('lookings', {
  id: serial('id').primaryKey(),
  titleEn: text('title_en').notNull(),
  titlePl: text('title_pl').notNull().default(''),
  isActive: boolean('is_active').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
})

export const accountUsers = pgTable('account_users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash'),
  teamMemberId: integer('team_member_id').references(() => team.id, { onDelete: 'set null' }),
  role: text('role').notNull().default('member'), // 'member' | 'admin'
  isActive: boolean('is_active').notNull().default(true),
  inviteToken: text('invite_token').unique(),
  inviteExpiresAt: timestamp('invite_expires_at', { withTimezone: true }),
  totpSecret: text('totp_secret'),
  totpEnabled: boolean('totp_enabled').notNull().default(false),
  emailOtpEnabled: boolean('email_otp_enabled').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, t => [index('account_users_email_idx').on(t.email)])

export const otpCodes = pgTable('otp_codes', {
  id: serial('id').primaryKey(),
  accountUserId: integer('account_user_id').notNull().references(() => accountUsers.id, { onDelete: 'cascade' }),
  code: text('code').notNull(),
  type: text('type').notNull(), // 'email_2fa'
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  usedAt: timestamp('used_at', { withTimezone: true }),
})

export type Blog = typeof blogs.$inferSelect
export type BlogInsert = typeof blogs.$inferInsert
export type Game = typeof games.$inferSelect
export type GameInsert = typeof games.$inferInsert
export type TeamMember = typeof team.$inferSelect
export type TeamMemberInsert = typeof team.$inferInsert
export type GalleryItem = typeof gallery.$inferSelect
export type Looking = typeof lookings.$inferSelect
export type AccountUser = typeof accountUsers.$inferSelect
export type AccountUserInsert = typeof accountUsers.$inferInsert
