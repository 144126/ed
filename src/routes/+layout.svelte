<script lang="ts">
	import '@fontsource/geist-mono';
	import '@fontsource/geist-sans';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Lenis from 'lenis';
	import { registerGsap, gsap, ScrollTrigger, usesReducedMotion } from '$lib/motion';
	import DotGrid from '$lib/components/DotGrid.svelte';
	import Cursor from '$lib/components/Cursor.svelte';
	import Preloader from '$lib/components/Preloader.svelte';
	import { introReady } from '$lib/state';

	let { children } = $props();
	let preloaderDone = $state(false);

	$effect(() => {
		const unsub = introReady.subscribe((v) => { preloaderDone = v; });
		return () => unsub();
	});

	function scrollTo(hash: string) {
		const lenis = (window as any).__lenis;
		if (lenis) lenis.scrollTo(hash, { offset: -80 });
		else document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
	}

	$effect(() => {
		registerGsap();
		if (usesReducedMotion()) return;

		const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
		lenis.on('scroll', ScrollTrigger.update);
		const raf = (time: number) => lenis.raf(time * 1000);
		gsap.ticker.add(raf);
		gsap.ticker.lagSmoothing(0);

		(window as any).__lenis = lenis;

		return () => {
			gsap.ticker.remove(raf);
			lenis.destroy();
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Gold Edem Hogan — design & code</title>
	<meta name="description" content="Logos, identities, print and motion by Gold Edem Hogan, plus the SvelteKit, Rust and AI web apps that ship them." />
	<meta property="og:title" content="Gold Edem Hogan — design & code" />
	<meta property="og:description" content="Logos, identities, print and motion, plus SvelteKit, Rust and AI web apps." />
	<meta property="og:type" content="website" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>
{#if !preloaderDone}
	<Preloader />
{/if}
<DotGrid />
<Cursor />
{@render children()}
