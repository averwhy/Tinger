<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Button } from '$lib/components/ui/button/index.js';
	import SunMoon from '@lucide/svelte/icons/sun-moon';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="bg-background min-h-screen text-foreground">
	<div class="absolute top-4 right-4">
		<Button variant="ghost" size="icon">
			<SunMoon />
		</Button>
	</div>
	{@render children()}
</div>
