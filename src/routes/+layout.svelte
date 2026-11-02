<script lang="ts">
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/500.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';
	import '@fontsource/inter/800.css';
	import '@fontsource/barlow-condensed/500.css';
	import '@fontsource/barlow-condensed/600.css';
	import '@fontsource/barlow-condensed/700.css';
	import '$lib/styles/globals.css';
	import '$lib/styles/colors.css';
	import '$lib/styles/tokens.css';
	import orolStavebninyIcon from '$lib/assets/used_orol_logos/orol_white_fill_black_stroke_red_background_round_corners.svg';
	import { onNavigate } from '$app/navigation';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	// Cross-fade between pages via the View Transitions API where supported.
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={orolStavebninyIcon} />
</svelte:head>

<a href="#main" class="skip-link">Preskočiť na obsah</a>
<Header />
<main id="main">{@render children()}</main>
<Footer />
