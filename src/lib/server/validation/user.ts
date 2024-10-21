import vine from '@vinejs/vine'

export const updateUserValidator = vine.compile(
	vine.object({
		username: vine.string().minLength(3).maxLength(50).optional(),
		password: vine.string().minLength(8).confirmed().optional()
	})
)
