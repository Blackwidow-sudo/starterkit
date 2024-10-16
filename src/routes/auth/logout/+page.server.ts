import { fail, redirect } from '@sveltejs/kit'
import { Session } from '$lib/server/auth'

import type { PageServerLoad, Actions } from './$types'

export const load = (async () => {
	return {}
}) satisfies PageServerLoad

export const actions = {
	default: async ({ locals, cookies }) => {
		if (!locals.session) {
			return fail(401)
		}

		await Session.invalidate(locals.session.id, cookies)

		return redirect(302, '/auth/login')
	}
} satisfies Actions
