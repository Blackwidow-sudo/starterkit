import { sql } from 'drizzle-orm'
import { text } from 'drizzle-orm/sqlite-core'

const now = () => sql`(datetime('now'))`

export const timeStampMixin = {
	createdAt: text('created_at').notNull().$defaultFn(now),
	updatedAt: text('updated_at').notNull().$defaultFn(now).$onUpdateFn(now)
}
