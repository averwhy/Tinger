<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import SunMoon from "@lucide/svelte/icons/sun-moon";
	import TriangleAlert from "@lucide/svelte/icons/triangle-alert";
	import github from "$lib/assets/github.svg";
	import { toggleMode, mode } from "mode-watcher";

	function handleToggleMode(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		toggleMode();
		console.log("changed mode");
	}

	let { children } = $props();
	const sourceUrl = "https://github.com/averwhy/Tinger";
	let warningDialogOpen = $state(false);

	$effect(() => {
		const htmlEl = document.documentElement;
		if (mode.current === "light") {
			htmlEl.className = "light";
		} else if (mode.current === "dark") {
			htmlEl.className = "dark";
		}
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="bg-background min-h-screen text-foreground">
	<div class="absolute top-4 right-4">
		<Button
			variant="ghost"
			size="icon"
			onclick={() => window.open(sourceUrl)}
			aria-label="Open GitHub source repository"
		>
			<img src={github} alt="GitHub" class="w-3.5 h-3.5 dark:invert" />
		</Button>
		<Button
			variant="ghost"
			size="icon"
			onclick={handleToggleMode}
			aria-label="Toggle dark/light mode button"
		>
			<SunMoon />
		</Button>
	</div>
	<div class="absolute bottom-4 left-4">
		<Button
			variant="ghost"
			size="icon"
			aria-label="View disclaimer about use button"
			onclick={() => (warningDialogOpen = true)}
		>
			<TriangleAlert />
		</Button>
	</div>
	{@render children()}
</div>

<Dialog.Root bind:open={warningDialogOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>disclaimer</Dialog.Title>
			<Dialog.Description>
				tinger or its developer(s) are not responsible for any
				punishments in twitch chats or on your account that may result
				from using this tool. by using tinger, the end user (you) agrees
				to use it responsibly and at their own risk.
				<br /> <br />
				additionally, this site stores the channel name you input as well
				as your name you input into local storage for convenience purposes.
				no data is stored in any server.
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
