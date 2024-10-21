<script lang="ts">
	import { Button } from '$lib/components/ui/button'
	import { enhance } from '$app/forms'
	import { Input } from '$lib/components/ui/input'
	import { Label } from '$lib/components/ui/label'
	import { onMount } from 'svelte'
	import * as Accordion from '$lib/components/ui/accordion'
	import * as Card from '$lib/components/ui/card'

	import type { ActionData, PageData } from './$types'

	export let data: PageData
	export let form: ActionData

	const { user } = data
</script>

<div class="p-4">
	{#if user}
		<Card.Root class="max-w-xl mx-auto">
			<Card.Header>
				<Card.Title>Account</Card.Title>
				<Card.Description>
					{user.email} registered since {user.createdAt.toLocaleDateString()}
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<Accordion.Root>
					<Accordion.Item value="change-password">
						<Accordion.Trigger>Change password</Accordion.Trigger>
						<Accordion.Content>
							<form
								class="flex flex-col gap-4 p-2"
								method="post"
								use:enhance>
								<div class="flex flex-col gap-2">
									<Label for="password">Current password</Label>
									<Input
										id="password"
										name="password"
										type="password"
										placeholder="Enter your current password..."
										minlength={8}
										required />
								</div>
								<div class="flex flex-col gap-2">
									<Label for="newPassword">New password</Label>
									<Input
										id="newPassword"
										name="newPassword"
										type="password"
										placeholder="Enter your new password..."
										minlength={8}
										required />
								</div>
								<div class="flex flex-col gap-2">
									<Label for="newPassword_confirmation">Confirm new password</Label>
									<Input
										id="newPassword_confirmation"
										name="newPassword_confirmation"
										type="password"
										placeholder="Confirm new password..."
										minlength={8}
										required />
								</div>
								<Button type="submit">Save</Button>
							</form>
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			</Card.Content>
		</Card.Root>
	{/if}
</div>
