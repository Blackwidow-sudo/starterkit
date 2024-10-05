<script lang="ts">
	import { enhance } from '$app/forms'

	import type { PageData, ActionData } from './$types'

	export let data: PageData
	export let form: ActionData
</script>

<h1 class="text-2xl font-semibold text-center">Sign up</h1>
<form
	class="flex flex-col max-w-md gap-2 p-4 mx-auto"
	method="post"
	use:enhance>
	<label for="username">Username</label>
	<input
		class="px-4 py-2 text-black rounded"
		type="text"
		name="username"
		id="username"
		placeholder="Enter your username..."
		required />
	<label for="email">Email</label>
	<input
		class="px-4 py-2 text-black rounded"
		type="email"
		name="email"
		id="email"
		placeholder="Enter your email..."
		required />
	<label for="password">Password</label>
	<input
		class="px-4 py-2 text-black rounded"
		type="password"
		name="password"
		id="password"
		placeholder="Enter your password..."
		required />
	<label for="password_confirmation">Confirm password</label>
	<input
		class="px-4 py-2 text-black rounded"
		type="password"
		name="password_confirmation"
		id="password_confirmation"
		placeholder="Confirm your password..."
		required />
	<button class="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">Continue</button>
</form>
