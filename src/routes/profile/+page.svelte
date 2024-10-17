<script lang="ts">
	import * as Card from '$lib/components/ui/card'
	import type { PageData } from './$types'

	export let data: PageData

	const { user } = data
</script>

<div class="p-4">
	{#if user}
		<Card.Root class="max-w-lg mx-auto">
			<Card.Header>
				<Card.Title>
					{user.username}
				</Card.Title>
				<Card.Description>
					Account created at: {user.createdAt.toLocaleString()}
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<p>Email: {user.email}</p>
			</Card.Content>
		</Card.Root>
	{/if}
</div>
