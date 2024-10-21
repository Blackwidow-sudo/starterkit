import { db, schema } from '$lib/server/db'
import { fail, redirect } from '@sveltejs/kit'
import { Password, Session } from '$lib/server/auth'
import { registerValidator } from '$lib/server/validation'

import type { PageServerLoad, Actions } from './$types'

export const load = (async () => {
	return {}
}) satisfies PageServerLoad

export const actions = {
	default: async ({ request, cookies }) => {
		const payload = Object.fromEntries(await request.formData())
		const [err, data] = await registerValidator.tryValidate(payload)

		if (err) {
			return fail(400, err.messages)
		}

		const passwordHash = await Password.hash(data.password)

		try {
			const [user] = await db
				.insert(schema.users)
				.values({ ...data, passwordHash })
				.returning({ id: schema.users.id })

			await Session.create(user.id, cookies)
		} catch (error) {
			return fail(500, { error })
		}

		return redirect(302, '/')
	}
} satisfies Actions
