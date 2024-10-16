<script lang="ts">
	import '../app.css'
	import { routes as allRoutes } from '$lib/routing'
	import Navbar from '$lib/components/Navbar.svelte'

	import type { LayoutData } from './$types'

	export let data: LayoutData

	const routes = allRoutes.filter(({ path }) => {
		const excluded = ['/auth/login', '/auth/register', '/auth/profile']

		return !excluded.includes(path)
	})
</script>

<Navbar
	authenticated={!!data.user}
	{routes} />
<main class="container py-4 mx-auto space-y-2">
	<slot />
</main>
