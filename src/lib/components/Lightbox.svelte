<script lang="ts">
	import { gsap, usesReducedMotion } from '$lib/motion';
	import type { piece } from '$lib/design';
	import { p } from '$lib/data';

	let { list, at = $bindable(), from, onclose }: { list: piece[]; at: number; from: DOMRect | null; onclose: () => void } = $props();

	let n = $state(0);
	let stage: HTMLElement;
	let shell: HTMLDivElement;
	let down_x = 0;

	const pc = $derived(list[at]);
	const order = $derived(pc.o ?? pc.i.map((_, j) => j));
	const slides = $derived([...order.map((j) => ({ src: `/work/${pc.s}-${j}.webp`, w: pc.i[j][0], h: pc.i[j][1] })), ...(pc.v ? [{ src: pc.v, w: 1920, h: 1080, v: true }] : [])]);
	const slide = $derived(slides[n]);

	$effect(() => {
		const lenis = (window as any).__lenis;
		lenis?.stop();
		document.documentElement.style.overflow = 'hidden';
		const img = stage.querySelector('img,video') as HTMLElement;
		if (!usesReducedMotion()) {
			gsap.from(shell, { opacity: 0, duration: 0.4, ease: 'power2.out' });
			if (from && img) {
				const to = img.getBoundingClientRect();
				gsap.from(img, {
					x: from.left + from.width / 2 - (to.left + to.width / 2),
					y: from.top + from.height / 2 - (to.top + to.height / 2),
					scale: from.width / to.width,
					duration: 0.9,
					ease: 'expo.out'
				});
			}
			gsap.from('[data-lb-text]', { y: 24, opacity: 0, duration: 0.7, stagger: 0.06, delay: 0.25, ease: 'expo.out' });
		}
		return () => {
			lenis?.start();
			document.documentElement.style.overflow = '';
		};
	});

	function show(dir: number) {
		let next = n + dir;
		if (next < 0 || next >= slides.length) {
			at = (at + dir + list.length) % list.length;
			next = dir > 0 ? 0 : (list[at].o ?? list[at].i).length - 1 + (list[at].v ? 1 : 0);
		}
		n = next;
		if (usesReducedMotion()) return;
		requestAnimationFrame(() => {
			gsap.fromTo(stage.querySelector('img,video'), { x: dir * 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'expo.out' });
		});
	}

	function close() {
		if (usesReducedMotion()) return onclose();
		gsap.to(shell, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: onclose });
	}

	function key(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
		if (e.key === 'ArrowRight') show(1);
		if (e.key === 'ArrowLeft') show(-1);
	}
</script>

<svelte:window onkeydown={key} />

<div bind:this={shell} class="lb fixed inset-0 z-[60] flex flex-col" role="dialog" aria-modal="true" aria-label={pc.t}>
	<div class="flex items-center justify-between px-4 md:px-8 py-4 text-sm" style="color: var(--color-fg-muted);">
		<span>{at + 1} / {list.length}</span>
		<button class="cursor-pointer rounded-full border px-4 py-2" style="color: var(--color-fg-secondary);" onclick={close}>close (esc)</button>
	</div>

	<div
		bind:this={stage}
		class="relative flex-1 min-h-0 flex items-center justify-center px-4 md:px-20 select-none"
		role="presentation"
		onpointerdown={(e) => (down_x = e.clientX)}
		onpointerup={(e) => { const dx = e.clientX - down_x; if (Math.abs(dx) > 50) show(dx < 0 ? 1 : -1); }}
	>
		{#key slide.src}
			{#if 'v' in slide}
				<video src={slide.src} class="max-w-full max-h-full rounded-2xl" autoplay loop muted playsinline controls></video>
			{:else}
				<img src={slide.src} alt="{pc.t}, {n + 1} of {slides.length}" width={slide.w} height={slide.h} class="max-w-full max-h-full w-auto h-auto rounded-2xl" draggable="false" />
			{/if}
		{/key}
		<button class="nav-btn left-2 md:left-6" aria-label="previous" onclick={() => show(-1)}>←</button>
		<button class="nav-btn right-2 md:right-6" aria-label="next" onclick={() => show(1)}>→</button>
	</div>

	<div class="grid md:grid-cols-12 gap-4 md:gap-8 items-end px-4 md:px-8 pt-6 pb-6 md:pb-8">
		<div class="md:col-span-7 overflow-hidden">
			<h3 data-lb-text class="font-medium leading-[1] tracking-[-0.04em]" style="font-size: clamp(1.75rem, 4vw, 3.25rem); color: var(--color-fg);">{pc.t}</h3>
			<p data-lb-text class="mt-3 max-w-xl" style="color: var(--color-fg-secondary); line-height: 1.6;">{pc.d}</p>
		</div>
		<div data-lb-text class="md:col-span-5 flex flex-col md:items-end gap-4">
			<a href="{p.whatsapp}?text={encodeURIComponent(`hi gold, i found you on ed.apexlinks.org. i want something like "${pc.t}" for my business.`)}" target="_blank" rel="noopener noreferrer" class="pill pill-gold self-start md:self-end">want one like this? →</a>
			<div class="flex md:justify-end gap-2 flex-wrap">
			{#each slides as s, j}
				<button class="dot cursor-pointer" class:on={j === n} aria-label="view {j + 1}" onclick={() => (n = j)}>
					{#if 'v' in s}<span class="font-mono text-[0.625rem]">▶</span>{:else}<img src={s.src} alt="" loading="lazy" />{/if}
				</button>
			{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.lb {
		background: rgba(11, 10, 8, 0.97);
		backdrop-filter: blur(10px);
	}
	.nav-btn {
		position: absolute;
		top: 50%;
		translate: 0 -50%;
		width: 44px;
		height: 44px;
		font-family: var(--font-mono);
		color: var(--color-fg-secondary);
		border: 1px solid var(--color-border);
		background: rgba(11, 10, 8, 0.6);
		border-radius: 999px;
		cursor: pointer;
		transition: border-color 0.3s var(--ease-out), color 0.3s var(--ease-out);
	}
	.nav-btn:hover {
		border-color: var(--color-accent);
		color: var(--color-accent);
	}
	.dot {
		width: 48px;
		height: 48px;
		border: 1px solid var(--color-border);
		overflow: hidden;
		opacity: 0.45;
		border-radius: 0.75rem;
		display: grid;
		place-items: center;
		color: var(--color-fg);
		transition: opacity 0.3s var(--ease-out), border-color 0.3s var(--ease-out);
	}
	.dot img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.dot.on,
	.dot:hover {
		opacity: 1;
		border-color: var(--color-accent);
	}
</style>
