<script lang="ts">
	import { gsap, usesReducedMotion } from '$lib/motion';

	let { url, onclose }: { url: string; onclose: () => void } = $props();

	let overlay: HTMLDivElement;
	let panel: HTMLDivElement;
	let iframeEl: HTMLIFrameElement;
	let loading = $state(true);
	let opened = $state(true);

	$effect(() => {
		if (!overlay || !panel) return;
		const reduced = usesReducedMotion();
		if (reduced) {
			gsap.set(panel, { opacity: 1, scale: 1 });
			gsap.set(overlay, { opacity: 1 });
			return;
		}
		gsap.set(panel, { opacity: 0, scale: 0.94 });
		gsap.set(overlay, { opacity: 0 });
		const tl = gsap.timeline();
		tl.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0)
			.to(panel, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }, '-=0.1');
		return () => { tl.kill(); };
	});

	function close() {
		if (!opened) return;
		opened = false;
		const reduced = usesReducedMotion();
		if (reduced) { onclose(); return; }
		gsap.to(panel, { opacity: 0, scale: 0.94, duration: 0.3, ease: 'power2.in', onComplete: onclose });
		gsap.to(overlay, { opacity: 0, duration: 0.25 });
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}

	function handleOverlayClick(e: MouseEvent) {
		if (e.target === overlay) close();
	}
</script>

<svelte:window onkeydown={handleKey} />

<div
	bind:this={overlay}
	class="fixed inset-0 z-50 flex items-center justify-center p-4"
	style="background-color: rgba(0, 0, 0, 0.85); backdrop-filter: blur(4px);"
	onclick={handleOverlayClick}
	onkeydown={handleKey}
	role="dialog"
	aria-label="Project preview"
	tabindex="-1"
>
	<div
		bind:this={panel}
		class="relative flex h-full w-full flex-col"
		style="max-width: 1200px; max-height: 90vh; background-color: var(--color-bg); border: 1px solid var(--color-border);"
	>
		<div class="flex items-center justify-between px-4 py-3" style="border-bottom: 1px solid var(--color-border);">
			<div class="flex items-center gap-3">
				<a href={url} target="_blank" rel="noopener noreferrer" class="font-mono text-xs uppercase tracking-[0.08em] no-underline" style="color: var(--color-accent);">
					Open in new tab →
				</a>
				{#if loading}
					<div class="font-mono text-xs" style="color: var(--color-fg-muted);">> loading {url} …</div>
				{/if}
			</div>
			<button
				class="font-mono text-xs uppercase tracking-[0.08em] cursor-pointer"
				style="color: var(--color-fg-muted); background: none; border: none;"
				onclick={close}
			>Close [Esc]</button>
		</div>
		<iframe
			bind:this={iframeEl}
			src={url}
			class="h-full w-full"
			style="border: none;"
			title={url}
			onload={() => { loading = false; }}
		></iframe>
	</div>
</div>
