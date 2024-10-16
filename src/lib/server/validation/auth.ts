import vine from '@vinejs/vine'
import { schema } from '$lib/server/db'
import { eq } from 'drizzle-orm'

export const registerValidator = vine.compile(
	vine.object({
		username: vine.string().minLength(3).maxLength(50),
		email: vine
			.string()
			.email()
			.unique(async (db, value) => {
				const [user] = await db
					.select()
					.from(schema.userTable)
					.where(eq(schema.userTable.email, value))
				return !user
			}),
		password: vine.string().minLength(8).confirmed()
	})
)

export const loginValidator = vine.compile(
	vine.object({
		email: vine
			.string()
			.email()
			.exists(async (db, value) => {
				const [user] = await db
					.select()
					.from(schema.userTable)
					.where(eq(schema.userTable.email, value))
				return !!user
			}),
		password: vine.string().minLength(8)
	})
)

export const updateUserValidator = vine.compile(
	vine.object({
		user_id: vine.number(),
		username: vine.string().minLength(3).maxLength(50)
	})
)
