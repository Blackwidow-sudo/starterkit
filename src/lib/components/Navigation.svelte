<script
	lang="ts"
	context="module">
	import type { Route } from '$lib/routing'

	type ComponentEvents = {
		navigate: Route
	}

	type NavigateEvent = CustomEvent<Route>

	export type { ComponentEvents, NavigateEvent }
</script>

<script lang="ts">
	import { page } from '$app/stores'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher<{ navigate: Route }>()

	export let routes: Route[]

	function onClick(route: Route) {
		dispatch('navigate', route)
	}
</script>

<nav
	class="grid items-start gap-2 my-4 text-lg font-semibold md:my-2 md:gap-0 md:text-sm md:px-2 lg:px-4 text-muted-foreground md:min-w-52">
	{#each routes as route (route.path)}
		<a
			class="flex items-center gap-4 px-3 py-2 -mx-3 transition-colors md:m-0 md:gap-3 hover:text-foreground md:hover:text-primary rounded-xl md:rounded-lg"
			class:text-foreground={$page.url.pathname === route.path}
			class:bg-muted={$page.url.pathname === route.path}
			href={route.path}
			on:click={() => onClick(route)}>
			{route.name}
		</a>
	{/each}
</nav>
