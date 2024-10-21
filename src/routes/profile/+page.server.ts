import { db, schema } from '$lib/server/db'
import { eq } from 'drizzle-orm'
import { fail, redirect } from '@sveltejs/kit'
import { updateUserValidator } from '$lib/server/validation'

import type { PageServerLoad, Actions } from './$types'

export const load = (async ({ locals }) => {
	if (!locals.user) {
		return redirect(302, '/login')
	}

	return {}
}) satisfies PageServerLoad

export const actions = {
	default: async ({ locals, request }) => {
		const { user } = locals

		if (!user) {
			return fail(401, { message: 'Unauthorized' })
		}

		const payload = Object.fromEntries(await request.formData())
		const [err, data] = await updateUserValidator.tryValidate(payload)

		if (err) {
			return fail(400, err.messages)
		}

		await db.update(schema.users).set(data).where(eq(schema.users.id, user.id))

		return { success: true }
	}
} satisfies Actions
