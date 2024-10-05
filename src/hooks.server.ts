import { lucia, Session } from '$lib/server/auth'
import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import { routes } from '$lib/routing'

/**
 * Validate the session and set the user and session in the event locals
 */
export const handleSession: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName)

	if (!sessionId) {
		event.locals.user = null
		event.locals.session = null

		return resolve(event)
	}

	const { user, session } = await Session.validate(sessionId, event.cookies)

	event.locals.user = user
	event.locals.session = session

	return resolve(event)
}

/**
 * Redirect users that are not logged in to the login page
 */
export const handleProtectedRoutes: Handle = async ({ event, resolve }) => {
	const { user } = event.locals
	const route = routes.find(({ path }) => path === event.url.pathname)

	if (!route?.public && !user) {
		const login = new URL('/auth/login', event.url.origin)
		login.searchParams.set('redirectTo', event.url.toString())

		return redirect(302, login)
	}

	return resolve(event)
}

export const handle = sequence(handleSession, handleProtectedRoutes)
