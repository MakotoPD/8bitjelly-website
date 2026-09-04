/**
 * Seed script: imports all data from Strapi CMS to local PostgreSQL
 * Run: DATABASE_URL=postgres://... npx tsx scripts/seed-from-strapi.ts
 */

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../server/database/schema'

const STRAPI = 'https://api.8bitjelly.com'
const url = process.env.DATABASE_URL!
if (!url) throw new Error('DATABASE_URL is required')

const client = postgres(url, { max: 1 })
const db = drizzle(client, { schema })

async function createTables() {
  console.log('Creating tables...')
  await client.unsafe(`
    CREATE TABLE IF NOT EXISTS blogs (
      id SERIAL PRIMARY KEY, slug TEXT NOT NULL UNIQUE,
      title_en TEXT NOT NULL DEFAULT '', title_pl TEXT NOT NULL DEFAULT '',
      content_en TEXT NOT NULL DEFAULT '', content_pl TEXT NOT NULL DEFAULT '',
      excerpt_en TEXT NOT NULL DEFAULT '', excerpt_pl TEXT NOT NULL DEFAULT '',
      author TEXT NOT NULL DEFAULT '8BitJelly', tags TEXT[] NOT NULL DEFAULT '{}',
      cover_emoji TEXT NOT NULL DEFAULT '🎮', cover_pattern TEXT NOT NULL DEFAULT 'pattern-a',
      cover_image TEXT, is_featured BOOLEAN NOT NULL DEFAULT false,
      is_published BOOLEAN NOT NULL DEFAULT false, published_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
  await client.unsafe(`
    CREATE TABLE IF NOT EXISTS games (
      id SERIAL PRIMARY KEY, slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL DEFAULT '',
      description_en TEXT NOT NULL DEFAULT '', description_pl TEXT NOT NULL DEFAULT '',
      tags TEXT[] NOT NULL DEFAULT '{}', platform TEXT NOT NULL DEFAULT 'PC',
      status TEXT NOT NULL DEFAULT 'in-dev',
      cover_emoji TEXT NOT NULL DEFAULT '🎮', cover_pattern TEXT NOT NULL DEFAULT 'pattern-a',
      cover_image TEXT, itchio_url TEXT, steam_url TEXT,
      is_featured BOOLEAN NOT NULL DEFAULT false, is_priority BOOLEAN NOT NULL DEFAULT false,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
  await client.unsafe(`
    CREATE TABLE IF NOT EXISTS team (
      id SERIAL PRIMARY KEY, name TEXT NOT NULL DEFAULT '',
      bio_en TEXT NOT NULL DEFAULT '', bio_pl TEXT NOT NULL DEFAULT '',
      roles TEXT[] NOT NULL DEFAULT '{}',
      avatar_emoji TEXT NOT NULL DEFAULT '🎮', avatar_image TEXT,
      instagram TEXT, github TEXT, artstation TEXT, itchio TEXT, linkedin TEXT,
      is_active BOOLEAN NOT NULL DEFAULT true, sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
  await client.unsafe(`
    CREATE TABLE IF NOT EXISTS gallery (
      id SERIAL PRIMARY KEY, game_title TEXT NOT NULL DEFAULT '',
      image_url TEXT NOT NULL DEFAULT '', alt_text TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
  await client.unsafe(`
    CREATE TABLE IF NOT EXISTS blog_tags (
      id SERIAL PRIMARY KEY, name TEXT NOT NULL UNIQUE
    )
  `)
  await client.unsafe(`
    CREATE TABLE IF NOT EXISTS lookings (
      id SERIAL PRIMARY KEY, title_en TEXT NOT NULL DEFAULT '',
      title_pl TEXT NOT NULL DEFAULT '', is_active BOOLEAN NOT NULL DEFAULT true,
      sort_order INTEGER NOT NULL DEFAULT 0
    )
  `)
  console.log('  ✓ Tables ready')
}

async function fetchStrapi(path: string) {
  const res = await fetch(`${STRAPI}${path}`)
  if (!res.ok) throw new Error(`Strapi fetch failed: ${path}`)
  return res.json()
}

async function seedBlogs() {
  console.log('Seeding blogs...')
  const { data } = await fetchStrapi('/api/blogs?locale[0]=en&populate=author,tags&pagination[limit]=100')
  const { data: dataPl } = await fetchStrapi('/api/blogs?locale[0]=pl&pagination[limit]=100')

  const plMap = new Map(dataPl.map((p: any) => [p.attributes.slug, p.attributes]))

  for (const item of data) {
    const a = item.attributes
    const pl = plMap.get(a.slug) || {}
    const tags = a.tags?.data?.map((t: any) => t.attributes.name) || []

    try {
      await db.insert(schema.blogs).values({
        slug: a.slug,
        titleEn: a.title || '',
        titlePl: pl.title || '',
        contentEn: a.content || '',
        contentPl: pl.content || '',
        excerptEn: a.excerpt || (a.content || '').replace(/<[^>]+>/g, '').substring(0, 200),
        excerptPl: pl.excerpt || '',
        author: a.author?.data?.attributes?.name || '8BitJelly',
        tags,
        isPublished: true,
        publishedAt: a.publishedAt ? new Date(a.publishedAt) : new Date(),
      }).onConflictDoNothing()
    } catch (e) {
      console.warn(`Blog skip: ${a.slug}`, e)
    }
  }

  // Seed blog tags
  const { data: tagData } = await fetchStrapi('/api/blog-tags?pagination[limit]=100')
  for (const t of tagData) {
    await db.insert(schema.blogTags).values({ name: t.attributes.name }).onConflictDoNothing()
  }

  console.log(`  ✓ ${data.length} blogs`)
}

async function seedGames() {
  console.log('Seeding games...')
  const { data } = await fetchStrapi('/api/games?locale[0]=en&pagination[limit]=100')
  const { data: dataPl } = await fetchStrapi('/api/games?locale[0]=pl&pagination[limit]=100')
  const { data: priority } = await fetchStrapi('/api/priority-games?populate=game&pagination[limit]=10')

  const plMap = new Map(dataPl.map((g: any) => [g.attributes.slug || g.id, g.attributes]))
  const prioritySlugs = new Set(priority.map((p: any) => p.attributes.game?.data?.attributes?.slug))

  let order = 0
  for (const item of data) {
    const a = item.attributes
    const pl = plMap.get(a.slug || item.id) || {}
    const tags = a.tags?.split(',').map((t: string) => t.trim()).filter(Boolean) || []

    try {
      await db.insert(schema.games).values({
        slug: a.slug || `game-${item.id}`,
        title: a.title || a.name || '',
        descriptionEn: a.description || '',
        descriptionPl: pl.description || '',
        tags,
        platform: a.platform || 'PC',
        status: a.status || 'in-dev',
        isFeatured: a.featured || false,
        isPriority: prioritySlugs.has(a.slug),
        sortOrder: order++,
      }).onConflictDoNothing()
    } catch (e) {
      console.warn(`Game skip: ${a.slug}`, e)
    }
  }
  console.log(`  ✓ ${data.length} games`)
}

async function seedTeam() {
  console.log('Seeding team...')
  const { data } = await fetchStrapi('/api/osobies?populate=avatar&pagination[limit]=100')

  let order = 0
  for (const item of data) {
    const a = item.attributes
    const roles = [a.rola || a.role || ''].filter(Boolean)
    const avatarUrl = a.avatar?.data?.attributes?.formats?.small?.url
      ? `${STRAPI}${a.avatar.data.attributes.formats.small.url}`
      : null

    try {
      await db.insert(schema.team).values({
        name: a.imie || a.name || '',
        bioEn: a.bio || '',
        roles,
        avatarImage: avatarUrl,
        instagram: a.instagram || null,
        github: a.github || null,
        artstation: a.artstation || null,
        itchio: a.itchio || null,
        sortOrder: order++,
      }).onConflictDoNothing()
    } catch (e) {
      console.warn(`Team skip: ${a.name}`, e)
    }
  }
  console.log(`  ✓ ${data.length} team members`)
}

async function seedGallery() {
  console.log('Seeding gallery...')
  const { data } = await fetchStrapi('/api/galerias?populate=zdjecia&pagination[limit]=100')

  for (const item of data) {
    const a = item.attributes
    const gameTitle = a.tytul_gry || a.game_title || 'Unknown'
    const photos = a.zdjecia?.data || []

    let order = 0
    for (const photo of photos) {
      const imgUrl = photo.attributes?.url
      if (!imgUrl) continue
      try {
        await db.insert(schema.gallery).values({
          gameTitle,
          imageUrl: imgUrl.startsWith('http') ? imgUrl : `${STRAPI}${imgUrl}`,
          altText: photo.attributes?.alternativeText || gameTitle,
          sortOrder: order++,
        })
      } catch (e) {
        console.warn(`Gallery skip`, e)
      }
    }
  }
  console.log(`  ✓ Gallery done`)
}

async function seedLookings() {
  console.log('Seeding lookings...')
  const { data } = await fetchStrapi('/api/lookings?locale[0]=en&pagination[limit]=50')
  const { data: dataPl } = await fetchStrapi('/api/lookings?locale[0]=pl&pagination[limit]=50')
  const plMap = new Map(dataPl.map((l: any) => [l.id, l.attributes]))

  let order = 0
  for (const item of data) {
    const a = item.attributes
    const pl = plMap.get(item.id) || {}
    await db.insert(schema.lookings).values({
      titleEn: a.stanowisko || a.title || '',
      titlePl: pl.stanowisko || pl.title || '',
      isActive: true,
      sortOrder: order++,
    }).onConflictDoNothing()
  }
  console.log(`  ✓ ${data.length} lookings`)
}

async function main() {
  console.log('🌱 Seeding from Strapi...\n')
  await createTables()
  await seedBlogs()
  await seedGames()
  await seedTeam()
  await seedGallery()
  await seedLookings()
  console.log('\n✅ Seed complete!')
  await client.end()
}

main().catch((e) => { console.error(e); process.exit(1) })
