import { pgTable, text, serial, varchar, boolean, timestamp, integer } from 'drizzle-orm/pg-core'
import { timeStampMixin, softDeleteMixin } from './mixins'

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	username: varchar('username', { length: 256 }).notNull(),
	email: varchar('email', { length: 256 }).notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	emailVerified: boolean('email_verified').notNull().default(false),
	isAdmin: boolean('is_admin').notNull().default(false),
	...timeStampMixin,
	...softDeleteMixin
})

export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
})

export type User = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert
