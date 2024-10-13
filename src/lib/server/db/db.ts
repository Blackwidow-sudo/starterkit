import { DATABASE_URL } from '$env/static/private'
import { defineValidationRules } from '$lib/server/validation/rules'
import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'

const pool = new pg.Pool({
  connectionString: DATABASE_URL
})
const db = drizzle(pool)

defineValidationRules(db)

export default db
