<script lang="ts">
	import { work } from '$lib/design';
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
	<title>54 · design studio</title>
	<meta name="description" content="54 is a design studio. logos with an idea inside, flyers drafted in 24 hours, websites made for phones. {work.length} designs to look through." />
	<meta property="og:title" content="54 · design studio" />
	<meta property="og:description" content="logos, flyers and websites by 54. first draft in 24 hours. {work.length} designs to look through." />
	<meta property="og:image" content="https://54.apexlinks.org/og.jpg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="a flyer and two logos by 54" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://54.apexlinks.org" />
</svelte:head>

<Cursor />
{@render children()}
