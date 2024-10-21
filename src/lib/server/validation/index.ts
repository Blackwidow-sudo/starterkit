import type { FieldContext } from '@vinejs/vine/types'
import type { NodePgDatabase } from 'drizzle-orm/node-postgres'

/**
 * Extending VineJS schema types
 */
declare module '@vinejs/vine' {
	interface VineLucidBindings {
		/**
		 * Ensure the value is unique inside the database by self
		 * executing a query.
		 *
		 * - The callback must return `true`, if the value is unique (does not exist).
		 * - The callback must return `false`, if the value is not unique (already exists).
		 */
		unique(
			callback: (db: NodePgDatabase, value: string, field: FieldContext) => Promise<boolean>
		): this

		/**
		 * Ensure the value is exists inside the database by self
		 * executing a query.
		 *
		 * - The callback must return `false`, if the value exists.
		 * - The callback must return `true`, if the value does not exist.
		 */
		exists(
			callback: (db: NodePgDatabase, value: string, field: FieldContext) => Promise<boolean>
		): this
	}

	/* eslint-disable @typescript-eslint/no-empty-object-type */
	interface VineNumber extends VineLucidBindings {}
	interface VineString extends VineLucidBindings {}
}

export * from './auth'
export * from './user'
