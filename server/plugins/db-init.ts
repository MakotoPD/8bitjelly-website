import { useDB } from '~~/server/database'
import { blogs, games, team, blogTags, lookings } from '~~/server/database/schema'
import { sql } from 'drizzle-orm'

export default defineNitroPlugin(async () => {
  try {
    const db = useDB()

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        title_en TEXT NOT NULL,
        title_pl TEXT NOT NULL DEFAULT '',
        content_en TEXT NOT NULL DEFAULT '',
        content_pl TEXT NOT NULL DEFAULT '',
        excerpt_en TEXT NOT NULL DEFAULT '',
        excerpt_pl TEXT NOT NULL DEFAULT '',
        author TEXT NOT NULL DEFAULT '8BitJelly',
        tags TEXT[] NOT NULL DEFAULT '{}',
        cover_emoji TEXT NOT NULL DEFAULT 'đźŽ®',
        cover_pattern TEXT NOT NULL DEFAULT 'pattern-a',
        cover_image TEXT,
        is_featured BOOLEAN NOT NULL DEFAULT false,
        is_published BOOLEAN NOT NULL DEFAULT false,
        published_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `)

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS games (
        id SERIAL PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        description_en TEXT NOT NULL DEFAULT '',
        description_pl TEXT NOT NULL DEFAULT '',
        tags TEXT[] NOT NULL DEFAULT '{}',
        platform TEXT NOT NULL DEFAULT 'PC',
        status TEXT NOT NULL DEFAULT 'in-dev',
        cover_emoji TEXT NOT NULL DEFAULT 'đźŽ®',
        cover_pattern TEXT NOT NULL DEFAULT 'pattern-a',
        cover_image TEXT,
        itchio_url TEXT,
        steam_url TEXT,
        is_featured BOOLEAN NOT NULL DEFAULT false,
        is_priority BOOLEAN NOT NULL DEFAULT false,
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `)

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS team (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        bio_en TEXT NOT NULL DEFAULT '',
        bio_pl TEXT NOT NULL DEFAULT '',
        roles TEXT[] NOT NULL DEFAULT '{}',
        avatar_emoji TEXT NOT NULL DEFAULT 'đźŽ®',
        avatar_image TEXT,
        instagram TEXT,
        github TEXT,
        artstation TEXT,
        itchio TEXT,
        linkedin TEXT,
        is_active BOOLEAN NOT NULL DEFAULT true,
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `)

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS gallery (
        id SERIAL PRIMARY KEY,
        game_title TEXT NOT NULL,
        image_url TEXT NOT NULL,
        alt_text TEXT NOT NULL DEFAULT '',
        sort_order INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `)

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS blog_tags (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE
      )
    `)

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS lookings (
        id SERIAL PRIMARY KEY,
        title_en TEXT NOT NULL,
        title_pl TEXT NOT NULL DEFAULT '',
        is_active BOOLEAN NOT NULL DEFAULT true,
        sort_order INTEGER NOT NULL DEFAULT 0
      )
    `)

    // Add new social columns if they don't exist yet
    for (const col of ['twitter', 'youtube', 'tiktok', 'twitch', 'discord', 'bluesky', 'behance', 'website']) {
      await db.execute(sql.raw(`ALTER TABLE team ADD COLUMN IF NOT EXISTS ${col} TEXT`))
    }

    console.log('[db] Tables initialized')
  } catch (err) {
    console.error('[db] Init error:', err)
  }
})

