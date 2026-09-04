import { useDB } from '~~/server/database'
import { blogs, games } from '~~/server/database/schema'
import { eq } from 'drizzle-orm'

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'public, max-age=3600',
  })

  const db = useDB()
  const [allBlogs, allGames] = await Promise.all([
    db.select().from(blogs).where(eq(blogs.isPublished, true)),
    db.select().from(games),
  ])

  const sections: string[] = []

  sections.push(`# 8BitJelly

URL: https://8bitjelly.com

8BitJelly is a Polish hobby game development group. A small, close-knit team of game developers, artists, programmers, and musicians making indie games with love. No publisher pressure, no crunch — just passion, creativity, and community. Based in Poland, bilingual in English and Polish. Email: hello@8bitjelly.com

---`)

  sections.push(`# About the Crew

URL: https://8bitjelly.com/#about

We started as friends who wanted to make games. No publisher pressure, no crunch — just pure love for the craft. Artists, programmers, designers, and musicians working together to bring weird and wonderful games to life. Our three pillars: make cool games, learn together, and have fun.

---`)

  for (const game of allGames) {
    const title = game.title
    const desc = stripHtml(game.descriptionEn || game.descriptionPl || '')
    if (!title || !desc) continue
    sections.push(`# Game: ${title}

URL: https://8bitjelly.com/#games
Status: ${game.status}
Platform: ${game.platform}
Tags: ${(game.tags || []).join(', ')}

${desc}

---`)
  }

  for (const post of allBlogs) {
    const title = post.titleEn || post.titlePl
    const excerpt = post.excerptEn || post.excerptPl || ''
    const content = stripHtml(post.contentEn || post.contentPl || '')
    if (!title) continue
    sections.push(`# Blog: ${title}

URL: https://8bitjelly.com/blog/${post.slug}
Author: ${post.author}
Published: ${post.publishedAt?.toISOString() ?? 'unknown'}
Tags: ${(post.tags || []).join(', ')}

${excerpt ? excerpt + '\n\n' : ''}${content}

---`)
  }

  sections.push(`# Contact

URL: https://8bitjelly.com/contact

Email: hello@8bitjelly.com

Ways to reach 8BitJelly: join the crew (open positions for artists, programmers, designers, and musicians), propose a collaboration, discuss sponsorship, or just say hello.

---`)

  return sections.join('\n')
})
