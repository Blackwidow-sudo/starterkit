import { lucia } from './lucia'

import type { Cookie } from 'lucia'
import type { Cookies } from '@sveltejs/kit'

/**
 * Manage user sessions.
 */
export class Session {
	/**
	 * Create a new session for the user and return the session cookie.
	 */
	public static async create(userId: number, cookies: Cookies) {
		const session = await lucia.createSession(userId, {})

		const cookie = lucia.createSessionCookie(session.id)
		Session.setCookie(cookies, cookie)
	}

	/**
	 * Validate the session and return the session and user.
	 */
	public static async validate(sessionId: string, cookies: Cookies) {
		const { session, user } = await lucia.validateSession(sessionId)

		if (session && session.fresh) {
			const cookie = lucia.createSessionCookie(session.id)
			Session.setCookie(cookies, cookie)
		}

		if (!session) {
			const cookie = lucia.createBlankSessionCookie()
			Session.setCookie(cookies, cookie)
		}

		return { session, user }
	}

	/**
	 * Invalidate the session and return a blank session cookie.
	 */
	public static async invalidate(sessionId: string, cookies: Cookies) {
		await lucia.invalidateSession(sessionId)

		const cookie = lucia.createBlankSessionCookie()
		Session.setCookie(cookies, cookie)
	}

	/**
	 * Set the session cookie in the response.
	 */
	public static setCookie(cookies: Cookies, cookie: Cookie) {
		console.log('cookie', cookie)
		cookies.set(cookie.name, cookie.value, {
			path: '.',
			...cookie.attributes
		})
	}
}
