<script
	lang="ts"
	context="module">
	type ComponentEvents = {
		confirm: void
	}

	type ConfirmEvent = CustomEvent<void>

	export type { ComponentEvents, ConfirmEvent }
</script>

<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher<ComponentEvents>()

	export let open = false

	function onConfirm() {
		dispatch('confirm')
	}
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>
				<slot name="title" />
			</AlertDialog.Title>
			<AlertDialog.Description>
				<slot />
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action on:click={onConfirm}>Confirm</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
