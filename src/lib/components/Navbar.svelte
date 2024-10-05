<script lang="ts">
	import { enhance } from '$app/forms'
	import type { Route } from '$lib/routing'
	import { page } from '$app/stores'

	export let routes: Route[]
	export let authenticated: boolean = false
</script>

<nav class="flex items-center justify-between text-white bg-blue-600 flex-nowrap">
	<ul class="flex">
		{#each routes as route}
			<li>
				<a
					class="block px-4 py-2 hover:bg-blue-700"
					class:bg-blue-700={$page.url.pathname === route.path}
					href={route.path}>
					{route.name}
				</a>
			</li>
		{/each}
	</ul>
	{#if authenticated}
		<ul class="flex">
			<li>
				<a
					class="block px-4 py-2 hover:bg-blue-700"
					class:bg-blue-700={$page.url.pathname === '/profile'}
					href="/profile">Profile</a>
			</li>
			<li>
				<form
					action="/auth/logout"
					method="post"
					use:enhance>
					<button class="block px-4 py-2 hover:bg-blue-700">Logout</button>
				</form>
			</li>
		</ul>
	{:else}
		<ul class="flex">
			<li>
				<a
					class="block px-4 py-2 hover:bg-blue-700"
					class:bg-blue-700={$page.url.pathname === '/auth/register'}
					href="/auth/register">Register</a>
			</li>
			<li>
				<a
					class="block px-4 py-2 hover:bg-blue-700"
					class:bg-blue-700={$page.url.pathname === '/auth/login'}
					href="/auth/login">Login</a>
			</li>
		</ul>
	{/if}
</nav>
