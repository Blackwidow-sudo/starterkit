import { db, schema } from '$lib/server/db'
import { dev } from '$app/environment'
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle'
import { Lucia } from 'lucia'

const adapter = new DrizzleSQLiteAdapter(db, schema.sessionTable, schema.userTable)

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
	getUserAttributes: attrs => ({
		// attributes has the type of DatabaseUserAttributes
		username: attrs.username,
		email: attrs.email
	})
})

interface DatabaseUserAttributes {
	username: string
	email: string
}

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia
		DatabaseUserAttributes: DatabaseUserAttributes
		UserId: number
	}
}
