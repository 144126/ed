<script lang="ts">
	import { gsap } from 'gsap';
	import { usesReducedMotion } from '$lib/motion';

	let { items = ['SvelteKit', 'Rust', 'TypeScript', 'Python', 'Qdrant', 'ONNX', 'ccxt', 'Cloudflare', 'WASM', 'MQL5'] }: { items?: string[] } = $props();

	let row1: HTMLDivElement;
	let row2: HTMLDivElement;

	function getRowHTML(offset = 0) {
		const arr = [...items, ...items];
		return arr.map((t, i) =>
			`<span class="marquee-item${(i + offset) % 2 === 0 ? ' is-gold' : ''}">${t}</span>`
		).join('');
	}

	$effect(() => {
		if (!row1 || !row2) return;
		const reduced = usesReducedMotion();
		if (reduced) return;
		const dur = 20;

		gsap.set(row2, { xPercent: -50 });
		const tween1 = gsap.to(row1, { xPercent: -50, repeat: -1, duration: dur, ease: 'none' });
		const tween2 = gsap.to(row2, { xPercent: 0, repeat: -1, duration: dur, ease: 'none' });

		const resume1 = () => tween1.resume();
		const resume2 = () => tween2.resume();
		const pause1 = () => tween1.pause();
		const pause2 = () => tween2.pause();

		row1.addEventListener('pointerenter', pause1);
		row1.addEventListener('pointerleave', resume1);
		row2.addEventListener('pointerenter', pause2);
		row2.addEventListener('pointerleave', resume2);

		return () => {
			tween1.kill();
			tween2.kill();
			row1.removeEventListener('pointerenter', pause1);
			row1.removeEventListener('pointerleave', resume1);
			row2.removeEventListener('pointerenter', pause2);
			row2.removeEventListener('pointerleave', resume2);
		};
	});
</script>

<div class="marquee-wrap" data-reveal>
	<div class="marquee-row" bind:this={row1}>
		{@html getRowHTML(0)}
	</div>
	<div class="marquee-row marquee-row-reverse" bind:this={row2}>
		{@html getRowHTML(1)}
	</div>
</div>

<style>
	.marquee-wrap {
		border-top: 1px solid var(--color-border);
		border-bottom: 1px solid var(--color-border);
		padding: 1rem 0;
		margin: 0;
		overflow: hidden;
		width: 100%;
	}
	.marquee-row {
		display: flex;
		gap: 2rem;
		white-space: nowrap;
		width: fit-content;
		font-weight: 500;
		letter-spacing: -0.04em;
		font-size: clamp(2rem, 6vw, 4.5rem);
		line-height: 1.2;
		padding: 0.25rem 0;
	}
	.marquee-row-reverse {
		direction: rtl;
	}
	:global(.marquee-item) {
		color: var(--color-fg);
		flex-shrink: 0;
	}
	:global(.marquee-item.is-gold) {
		color: var(--color-accent);
	}
	@media (prefers-reduced-motion: reduce) {
		.marquee-wrap {
			border: 0;
			padding: 1.5rem 0;
		}
		.marquee-row {
			flex-wrap: wrap;
			justify-content: center;
			font-size: clamp(1rem, 3vw, 1.5rem);
		}
		.marquee-row-reverse { display: none; }
	}
</style>
