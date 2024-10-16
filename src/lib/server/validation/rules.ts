import vine, { VineNumber, VineString } from '@vinejs/vine'

import type { NodePgDatabase } from 'drizzle-orm/node-postgres'

/**
 * Defines the "unique" and "exists" validation rules with
 * VineJS.
 */
export function defineValidationRules(db: NodePgDatabase) {
	const uniqueRule = vine.createRule<Parameters<VineString['unique'] | VineNumber['unique']>[0]>(
		async (value, checker, field) => {
			if (!field.isValid) {
				return
			}

			const isUnique = await checker(db, value as string, field)
			if (!isUnique) {
				field.report('The {{ field }} has already been taken', 'database.unique', field)
			}
		}
	)

	const existsRule = vine.createRule<Parameters<VineString['exists'] | VineNumber['exists']>[0]>(
		async (value, checker, field) => {
			if (!field.isValid) {
				return
			}

			const exists = await checker(db, value as string, field)
			if (!exists) {
				field.report('The selected {{ field }} is invalid', 'database.exists', field)
			}
		}
	)

	VineString.macro('unique', function (this: VineString, checker) {
		return this.use(uniqueRule(checker))
	})
	VineString.macro('exists', function (this: VineString, checker) {
		return this.use(existsRule(checker))
	})
	VineNumber.macro('unique', function (this: VineNumber, checker) {
		return this.use(uniqueRule(checker))
	})
	VineNumber.macro('exists', function (this: VineNumber, checker) {
		return this.use(existsRule(checker))
	})
}
