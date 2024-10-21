<script
	lang="ts"
	context="module">
	type ComponentEvents = {
		save: Partial<User> | null
		cancel: void
	}

	type SaveEvent = CustomEvent<Partial<User> | null>

	export type { ComponentEvents, SaveEvent }
</script>

<script lang="ts">
	import { Button } from '$lib/components/ui/button'
	import { createEventDispatcher, onMount } from 'svelte'
	import { Input } from '$lib/components/ui/input'
	import { Label } from '$lib/components/ui/label'
	import { Switch } from '$lib/components/ui/switch'
	import * as Dialog from '$lib/components/ui/dialog'

	import type { User } from '$lib/server/db/schema'

	const dispatch = createEventDispatcher<ComponentEvents>()

	export let open = false
	export let model: User | null = null

	let item = {
		username: '',
		email: '',
		password: '',
		password_confirmation: '',
		is_admin: false
	}

	onMount(() => Object.assign(item, model))

	function onSave() {
		dispatch('save', item)
	}

	function onCancel() {
		dispatch('cancel')
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Edit user</Dialog.Title>
			<Dialog.Description>Edit the user's details</Dialog.Description>
		</Dialog.Header>
		<form
			id="user-form"
			class="flex flex-col gap-4"
			on:submit|preventDefault={onSave}>
			<div class="flex flex-col space-y-1.5">
				<Label for="username">Username</Label>
				<Input
					id="username"
					name="username"
					type="username"
					value={item.username} />
			</div>
			<div class="flex flex-col space-y-1.5">
				<Label for="email">Email</Label>
				<Input
					id="email"
					name="email"
					type="email"
					value={item.email}
					disabled />
			</div>
			<div class="flex flex-col space-y-1.5">
				<Label for="password">New password</Label>
				<Input
					id="password"
					name="password"
					type="password"
					value={item.password} />
			</div>
			<div class="flex flex-col space-y-1.5">
				<Label for="password_confirmation">Confirm new password</Label>
				<Input
					id="password_confirmation"
					name="password_confirmation"
					type="password"
					value={item.password_confirmation} />
			</div>
			<div class="flex items-center space-y-1.5 space-x-2">
				<Label for="isAdmin">Admin</Label>
				<Switch
					id="isAdmin"
					checked={item.is_admin} />
			</div>
		</form>
		<Dialog.Footer>
			<Button
				variant="secondary"
				on:click={onCancel}>Cancel</Button>
			<Button
				type="submit"
				form="user-form">Save</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
