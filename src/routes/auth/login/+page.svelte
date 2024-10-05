<script lang="ts">
	import { enhance } from '$app/forms'

	import type { PageData, ActionData } from './$types'

	export let data: PageData
	export let form: ActionData
</script>

<h1 class="text-2xl font-semibold text-center">Sign in</h1>
<form
	class="flex flex-col max-w-md gap-2 p-4 mx-auto rounded-md dark:bg-slate-700 bg-slate-200"
	method="post"
	use:enhance>
	<label for="email">Email</label>
	<input
		class="px-4 py-2 text-black border border-gray-400 rounded"
		type="email"
		name="email"
		id="email"
		placeholder="Enter your email..."
		required />
	<label for="password">Password</label>
	<input
		class="px-4 py-2 text-black border border-gray-400 rounded"
		type="password"
		name="password"
		id="password"
		placeholder="Enter your password..."
		required />
	<button class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Continue</button>
</form>
