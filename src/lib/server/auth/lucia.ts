import { db, schema } from '$lib/server/db'
import { dev } from '$app/environment'
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import { Lucia } from 'lucia'

const adapter = new DrizzlePostgreSQLAdapter(db, schema.sessions, schema.users)

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
		email: attrs.email,
		isAdmin: attrs.isAdmin,
		createdAt: attrs.createdAt
	})
})

interface DatabaseUserAttributes {
	username: string
	email: string
	isAdmin: boolean
	createdAt: Date
}

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia
		DatabaseUserAttributes: DatabaseUserAttributes
		UserId: number
	}
}
