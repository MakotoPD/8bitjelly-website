import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

const url = process.env.DATABASE_URL!
const client = postgres(url, { max: 1 })
const db = drizzle(client)

await migrate(db, { migrationsFolder: './server/database/migrations' })
await client.end()
console.log('Migrations complete')
