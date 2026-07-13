<script lang="ts">
	import { usesReducedMotion } from '$lib/motion';

	let canvas: HTMLCanvasElement;

	$effect(() => {
		const cvs = canvas;
		if (!cvs) return;
		if (usesReducedMotion()) return;

		const dpr = Math.min(devicePixelRatio || 1, 2);
		let mx = innerWidth / 2, my = innerHeight / 2;
		let lx = mx, ly = my;
		let id = 0;

		function resize() {
			cvs.width = innerWidth * dpr;
			cvs.height = innerHeight * dpr;
			cvs.style.width = innerWidth + 'px';
			cvs.style.height = innerHeight + 'px';
		}

		resize();

		const onMove = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; };
		window.addEventListener('pointermove', onMove);
		window.addEventListener('resize', resize);

		function draw() {
			const ctx = cvs.getContext('2d');
			if (!ctx) return;
			ctx.clearRect(0, 0, cvs.width, cvs.height);

			lx += (mx - lx) * 0.08;
			ly += (my - ly) * 0.08;

			const gradient = ctx.createRadialGradient(
				lx * dpr, ly * dpr, 0,
				lx * dpr, ly * dpr, 300 * dpr
			);
			gradient.addColorStop(0, 'rgba(212, 160, 71, 0.12)');
			gradient.addColorStop(0.5, 'rgba(212, 160, 71, 0.04)');
			gradient.addColorStop(1, 'rgba(212, 160, 71, 0)');
			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, cvs.width, cvs.height);

			id = requestAnimationFrame(draw);
		}
		draw();

		return () => {
			cancelAnimationFrame(id);
			window.removeEventListener('pointermove', onMove);
			window.removeEventListener('resize', resize);
		};
	});
</script>

<canvas bind:this={canvas} aria-hidden="true" class="hero-light"></canvas>

<style>
	.hero-light {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		mix-blend-mode: screen;
		z-index: 0;
	}
</style>
