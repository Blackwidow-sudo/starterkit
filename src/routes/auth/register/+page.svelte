<script lang="ts">
	import { Button } from '$lib/components/ui/button'
	import { enhance } from '$app/forms'
	import { Input } from '$lib/components/ui/input'
	import { Label } from '$lib/components/ui/label'
	import * as Card from '$lib/components/ui/card'

	import type { PageData, ActionData } from './$types'

	export let data: PageData
	export let form: ActionData
</script>

<div class="p-4">
	<Card.Root class="max-w-md mx-auto">
		<Card.Header>
			<Card.Title>Sign Up</Card.Title>
		</Card.Header>
		<Card.Content>
			<form
				id="register-form"
				class="flex flex-col gap-4"
				method="post"
				use:enhance>
				<div class="flex flex-col space-y-1.5">
					<Label for="username">Username</Label>
					<Input
						id="username"
						name="username"
						type="text"
						autocomplete="nickname"
						placeholder="Enter your username..."
						required />
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label for="email">Email</Label>
					<Input
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						placeholder="Enter your email..."
						required />
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label for="password">Password</Label>
					<Input
						id="password"
						name="password"
						type="password"
						placeholder="Enter your password..."
						required />
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label for="password_confirmation">Confirm password</Label>
					<Input
						id="password_confirmation"
						name="password_confirmation"
						type="password"
						placeholder="Confirm your password..."
						required />
				</div>
			</form>
		</Card.Content>
		<Card.Footer>
			<Button
				class="mx-auto"
				type="submit"
				form="register-form">Sign Up</Button>
		</Card.Footer>
	</Card.Root>
</div>
