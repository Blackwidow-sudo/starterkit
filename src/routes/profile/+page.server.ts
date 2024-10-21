import { db, schema } from '$lib/server/db'
import { eq } from 'drizzle-orm'
import { fail, redirect } from '@sveltejs/kit'
import { Password } from '$lib/server/auth'
import { updatePasswordValidator } from '$lib/server/validation'

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
		const [err, data] = await updatePasswordValidator.tryValidate(payload)

		if (err) {
			return fail(400, err.messages)
		}

		const dbUser = await db.query.users.findFirst({ where: eq(schema.users.id, user.id) })

		if (!dbUser || !(await Password.verify(dbUser.passwordHash, data.password))) {
			return fail(401, { message: 'Unauthorized' })
		}

		const passwordHash = await Password.hash(data.newPassword)

		await db.update(schema.users).set({ passwordHash }).where(eq(schema.users.id, dbUser.id))

		return { success: true }
	}
} satisfies Actions
