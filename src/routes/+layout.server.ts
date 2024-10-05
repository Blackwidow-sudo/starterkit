import type { LayoutServerLoad } from './$types'

export const load = (async ({ locals }) => {
	const { user } = locals

	if (user) {
		return { user }
	}

	return {}
}) satisfies LayoutServerLoad
