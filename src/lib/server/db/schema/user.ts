import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { timeStampMixin } from './mixins'

export const userTable = sqliteTable('users', {
	id: integer('id', { mode: 'number' }).primaryKey(),
	username: text('username').notNull(),
	email: text('email').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	emailVerified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
	...timeStampMixin
})

export const sessionTable = sqliteTable('sessions', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer('expires_at').notNull()
})

export type User = typeof userTable.$inferSelect // return type when queried
export type InsertUser = typeof userTable.$inferInsert // insert type
