<script lang="ts">
	import '../app.css'
	import { Button } from '$lib/components/ui/button'
	import { env } from '$env/dynamic/public'
	import { ModeWatcher, toggleMode, mode } from 'mode-watcher'
	import { page } from '$app/stores'
	import { routes as allRoutes } from '$lib/routing'
	import { Toaster } from '$lib/components/ui/sonner'
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu'
	import * as Sheet from '$lib/components/ui/sheet'
	import * as Tooltip from '$lib/components/ui/tooltip'
	import Menu from 'lucide-svelte/icons/menu'
	import Moon from 'lucide-svelte/icons/moon'
	import Navigation from '$lib/components/Navigation.svelte'
	import Package from 'lucide-svelte/icons/package'
	import Sun from 'lucide-svelte/icons/sun'
	import UserRound from 'lucide-svelte/icons/user-round'

	import type { LayoutData } from './$types'

	export let data: LayoutData

	let navOpen = false

	$: authenticated = !!data.user

	const routes = allRoutes.filter(({ path }) => {
		const excluded = ['/auth/login', '/auth/register', '/profile']

		return !excluded.includes(path)
	})

	function onNavigate() {
		navOpen = false
	}
</script>

<div class="flex flex-col w-full h-full overflow-hidden bg-muted/40">
	<header
		class="flex items-center justify-between flex-none gap-4 px-4 py-2 border-b lg:px-6 lg:h-16 h-14 bg-background">
		<div class="flex gap-6">
			<Sheet.Root bind:open={navOpen}>
				<Sheet.Trigger
					asChild
					let:builder>
					<Button
						class="flex md:hidden"
						variant="outline"
						size="icon"
						builders={[builder]}>
						<Menu />
					</Button>
				</Sheet.Trigger>
				<Sheet.Content
					class="sm:max-w-xs"
					side="left">
					<Sheet.Header>
						<Sheet.Title asChild>
							<a
								class="flex items-center flex-none gap-4 p-2 text-lg font-bold text-foreground"
								href="/">
								<Package class="size-6" />
								<span>{env.PUBLIC_APP_NAME}</span>
							</a>
						</Sheet.Title>
					</Sheet.Header>
					<Navigation
						{routes}
						on:navigate={onNavigate} />
				</Sheet.Content>
			</Sheet.Root>
			<a
				class="flex items-center justify-center gap-3 text-lg font-bold text-foreground"
				href="/">
				<Package class="size-6" />
				<span class="hidden sm:block">
					{env.PUBLIC_APP_NAME}
				</span>
			</a>
		</div>
		<div class="flex gap-6 px-2">
			<Tooltip.Root>
				<Tooltip.Trigger
					asChild
					let:builder>
					<Button
						class="overflow-hidden rounded-full"
						variant="ghost"
						size="icon"
						builders={[builder]}
						on:click={toggleMode}>
						<svelte:component
							this={$mode === 'light' ? Moon : Sun}
							class="size-5" />
						<span class="sr-only">Toggle theme</span>
					</Button>
					<Tooltip.Content side="bottom">
						{$mode === 'light' ? 'Dark mode' : 'Light mode'}
					</Tooltip.Content>
				</Tooltip.Trigger>
			</Tooltip.Root>
			{#if authenticated}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger
						asChild
						let:builder>
						<Button
							variant="outline"
							size="icon"
							class="overflow-hidden rounded-full"
							builders={[builder]}>
							<UserRound class="size-5" />
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						<DropdownMenu.Label>My Account</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>
							<a
								class="flex-auto"
								href="/profile">Profile</a>
						</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>
							<form
								class="flex-auto"
								action="/auth/logout"
								method="post">
								<button
									class="block w-full text-left"
									type="submit">Logout</button>
							</form>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<nav
					class="flex items-center justify-center gap-6 text-lg font-medium md:text-sm flex-nowrap text-muted-foreground">
					<a
						class="block transition-colors hover:text-foreground text-nowrap"
						class:text-foreground={$page.url.pathname === '/auth/register'}
						href="/auth/register">Sign Up</a>
					<a
						class="block transition-colors hover:text-foreground text-nowrap"
						class:text-foreground={$page.url.pathname === '/auth/login'}
						href="/auth/login">Log In</a>
				</nav>
			{/if}
		</div>
	</header>
	<div class="flex flex-auto w-full h-full overflow-hidden">
		<aside
			class="flex-none hidden overflow-x-hidden overflow-y-auto border-r lg:w-auto bg-background md:block">
			<Navigation {routes} />
		</aside>
		<div class="flex flex-col flex-1 overflow-x-hidden scroll-smooth">
			<main class="container flex-auto">
				<slot />
			</main>
			<footer class="flex items-center justify-center flex-none my-6">
				<small>(footer)</small>
			</footer>
		</div>
	</div>
	<ModeWatcher />
	<Toaster
		expand
		position="bottom-center"
		richColors />
</div>
