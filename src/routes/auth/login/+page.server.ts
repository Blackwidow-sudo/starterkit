import { db, schema } from '$lib/server/db'
import { eq } from 'drizzle-orm'
import { fail, redirect } from '@sveltejs/kit'
import { loginValidator } from '$lib/server/validation'
import { Password, Session } from '$lib/server/auth'

import type { PageServerLoad, Actions } from './$types'

export const load = (async () => {
	return {}
}) satisfies PageServerLoad

export const actions = {
	default: async ({ request, cookies, url }) => {
		const payload = Object.fromEntries(await request.formData())
		const [err, data] = await loginValidator.tryValidate(payload)

		if (err) {
			return fail(400, err.messages)
		}

		try {
			const [user] = await db
				.select({ id: schema.userTable.id, passwordHash: schema.userTable.passwordHash })
				.from(schema.userTable)
				.where(eq(schema.userTable.email, data.email))

			const validPassword = await Password.verify(user.passwordHash, data.password)

			if (!validPassword) {
				return fail(400, { credentials: 'Invalid credentials' })
			}

			await Session.create(user.id, cookies)
		} catch (error) {
			return fail(500, { error })
		}

		// TODO: Check security implications of redirecting to arbitrary URLs
		if (url.searchParams.has('redirectTo')) {
			const redirectTo = url.searchParams.get('redirectTo') || '/'

			try {
				// Only use the pathname to avoid malicious redirects
				const pathName = new URL(redirectTo)
				const redirectUrl = new URL(pathName.pathname, url.origin)

				return redirect(302, redirectUrl)
			} catch {
				return redirect(302, '/')
			}
		}

		return redirect(302, '/')
	}
} satisfies Actions
