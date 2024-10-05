import { db, schema } from '$lib/server/db'
import { eq } from 'drizzle-orm'
import { fail, redirect } from '@sveltejs/kit'
import { updateUserValidator } from '$lib/server/validation'

import type { PageServerLoad, Actions } from './$types'

export const load = (async ({ locals }) => {
	if (!locals.user) redirect(302, '/login')

	return {}
}) satisfies PageServerLoad

export const actions = {
	default: async ({ request }) => {
		const payload = Object.fromEntries(await request.formData())
		const [err, data] = await updateUserValidator.tryValidate(payload)

		if (err) {
			return fail(400, err.messages)
		}

		const [user] = await db
			.update(schema.userTable)
			.set({ username: data.username })
			.where(eq(schema.userTable.id, data.user_id))
			.returning({
				id: schema.userTable.id,
				username: schema.userTable.username,
				email: schema.userTable.email
			})

		return { success: true, user }
	}
} satisfies Actions
