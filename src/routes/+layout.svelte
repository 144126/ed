<script lang="ts">
	import '@fontsource/geist-sans/400.css';
	import '@fontsource/geist-sans/500.css';
	import '@fontsource/geist-sans/600.css';
	import '@fontsource/geist-mono/400.css';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Lenis from 'lenis';
	import { registerGsap, gsap, ScrollTrigger, usesReducedMotion } from '$lib/motion';
	import Cursor from '$lib/components/Cursor.svelte';

	let { children } = $props();

	$effect(() => {
		registerGsap();
		if (usesReducedMotion()) return;

		const lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: { offset: -88 } });
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
	<title>gold hogan · flyers, posters & logos in 24 hours</title>
	<meta name="description" content="flyers, posters, logos and brand kits by gold hogan. first draft in 24 hours, cheap flyers, print-ready files you own. 41 real designs to look through." />
	<meta property="og:title" content="gold hogan · flyers, posters & logos in 24 hours" />
	<meta property="og:description" content="first draft in 24 hours. flyers, posters and logos at small-business prices. 41 real designs to look through." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://ed.apexlinks.org" />
</svelte:head>

<Cursor />
{@render children()}
