<script lang="ts">
	let ring: HTMLDivElement;
	let dot: HTMLDivElement;
	let label: HTMLDivElement;

	$effect(() => {
		if (window.matchMedia('(hover: none)').matches) return;
		let rx = innerWidth / 2, ry = innerHeight / 2, mx = rx, my = ry, id = 0;
		let currentLabel = '';

		const move = (e: PointerEvent) => {
			mx = e.clientX;
			my = e.clientY;
			dot.style.transform = `translate(${mx}px,${my}px)`;
		};

		const loop = () => {
			rx += (mx - rx) * 0.15;
			ry += (my - ry) * 0.15;
			ring.style.transform = `translate(${rx}px,${ry}px)`;
			id = requestAnimationFrame(loop);
		};

		const over = (e: Event) => {
			const t = (e.target as HTMLElement).closest('a,button,[data-cursor]');
			const isHit = !!t;
			ring.classList.toggle('is-active', isHit);
			const lbl = t?.getAttribute('data-cursor-label') || '';
			if (lbl !== currentLabel) {
				currentLabel = lbl;
				label.textContent = lbl;
			}
			label.style.display = lbl ? '' : 'none';
			dot.style.opacity = isHit ? '0' : '1';
		};

		window.addEventListener('pointermove', move);
		document.addEventListener('pointerover', over);
		loop();

		return () => {
			cancelAnimationFrame(id);
			window.removeEventListener('pointermove', move);
			document.removeEventListener('pointerover', over);
		};
	});
</script>

<div bind:this={ring} class="cursor-ring">
	<div bind:this={label} class="cursor-label"></div>
</div>
<div bind:this={dot} class="cursor-dot"></div>

<style>
	.cursor-ring, .cursor-dot {
		position: fixed;
		top: 0;
		left: 0;
		pointer-events: none;
		z-index: 9999;
	}
	.cursor-ring {
		width: 28px;
		height: 28px;
		margin-left: -14px;
		margin-top: -14px;
		border: 1px solid var(--color-accent);
		border-radius: 50%;
		mix-blend-mode: difference;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: width 0.2s, height 0.2s, background-color 0.2s;
	}
	.cursor-ring:global(.is-active) {
		width: 60px;
		height: 60px;
		margin-left: -30px;
		margin-top: -30px;
		background-color: rgba(226,182,92,0.12);
	}
	.cursor-label {
		font-size: 0.6875rem;
		letter-spacing: 0.08em;
		color: var(--color-accent);
		display: none;
		white-space: nowrap;
	}
	.cursor-dot {
		width: 5px;
		height: 5px;
		margin-left: -2.5px;
		margin-top: -2.5px;
		background: var(--color-accent);
		border-radius: 50%;
	}
	@media (hover: none), (prefers-reduced-motion: reduce) {
		.cursor-ring, .cursor-dot { display: none; }
	}
</style>
