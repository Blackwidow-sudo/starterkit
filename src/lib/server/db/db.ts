import { DB_DATABASE } from '$env/static/private'
import { defineValidationRules } from '$lib/server/validation/rules'
import { dev } from '$app/environment'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

const sqlite = new Database(DB_DATABASE)
const db = drizzle(sqlite, { logger: dev })

defineValidationRules(db)

export default db
