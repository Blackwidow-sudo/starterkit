import { eq } from 'drizzle-orm'
import { schema } from '$lib/server/db'
import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
	vine.object({
		username: vine.string().minLength(3).maxLength(50),
		email: vine
			.string()
			.email()
			.unique(async (db, value) => {
				// TODO: use db.query.users.findFirst instead
				const [user] = await db.select().from(schema.users).where(eq(schema.users.email, value))
				return !user
			}),
		password: vine.string().minLength(8).confirmed()
	})
)

export const updateUserValidator = vine.compile(
	vine.object({
		username: vine.string().minLength(3).maxLength(50).optional()
	})
)

export const updatePasswordValidator = vine.compile(
	vine.object({
		password: vine.string().minLength(8),
		newPassword: vine.string().minLength(8).confirmed()
	})
)
