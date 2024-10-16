import { pgTable, text, serial, varchar, boolean, timestamp, integer } from 'drizzle-orm/pg-core'
import { timeStampMixin } from './mixins'

export const userTable = pgTable('users', {
	id: serial('id').primaryKey(),
	username: varchar('username', { length: 256 }).notNull(),
	email: varchar('email', { length: 256 }).notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	emailVerified: boolean('email_verified').notNull().default(false),
	...timeStampMixin
})

export const sessionTable = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});


export type User = typeof userTable.$inferSelect // return type when queried
export type InsertUser = typeof userTable.$inferInsert // insert type
