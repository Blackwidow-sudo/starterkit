import { db, schema } from '$lib/server/db'
import { eq } from 'drizzle-orm'
import { fail, redirect } from '@sveltejs/kit'
import { loginValidator } from '$lib/server/validation'
import { rateLimiter } from '$lib/server/ratelimiter'
import { Password, Session } from '$lib/server/auth'

import type { PageServerLoad, Actions } from './$types'
import { localUrl } from '$lib/server/validation/utils'

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
			const user = await db.query.users.findFirst({
				where: eq(schema.users.email, data.email)
			})

			if (!user) {
				return fail(400, { credentials: 'Invalid credentials' })
			}

			const validPassword = await Password.verify(user.passwordHash, data.password)

			if (!validPassword) {
				return fail(400, { credentials: 'Invalid credentials' })
			}

			await Session.create(user.id, cookies)
		} catch (error) {
			return fail(500, { error })
		}

		// TODO: Check security implications of redirecting to arbitrary URLs
		const redirectTo = url.searchParams.get('redirectTo') || '/'
		const safeRedirectUrl = localUrl(redirectTo, url.origin)

		return redirect(302, safeRedirectUrl)
	}
} satisfies Actions
