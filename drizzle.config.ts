import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	dialect: 'sqlite', // "mysql" | "sqlite" | "postgresql"
	schema: './src/lib/server/db/schema',
	out: './.drizzle',
	dbCredentials: {
		url: process.env.DB_DATABASE || ''
	}
})
