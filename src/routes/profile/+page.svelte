<script lang="ts">
	import type { PageData, ActionData } from './$types'

	export let data: PageData
	export let form: ActionData

	const { user } = data
</script>

<h1 class="text-2xl font-semibold text-center">My profile</h1>
{#if user}
	<ul>
		{#each Object.entries(user) as [key, val]}
			<li>{key}: {val}</li>
		{/each}
	</ul>
{/if}
