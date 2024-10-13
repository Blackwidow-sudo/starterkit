import { timestamp } from 'drizzle-orm/pg-core'

// https://github.com/drizzle-team/drizzle-orm/issues/956
export const timeStampMixin = {
	createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
		.notNull()
		.defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true })
		.notNull()
		.defaultNow()
		.$onUpdateFn(() => new Date())
}
