import { Argon2id } from 'oslo/password'

const argon = new Argon2id({
	memorySize: 19456,
	iterations: 2,
	tagLength: 32,
	parallelism: 1
})

export class Password {
	public static async hash(password: string) {
		return await argon.hash(password)
	}

	public static async verify(hashed: string, password: string) {
		return await argon.verify(hashed, password)
	}
}
