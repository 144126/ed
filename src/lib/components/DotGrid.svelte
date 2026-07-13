<script lang="ts">
	import { usesReducedMotion } from '$lib/motion';

	let canvas: HTMLCanvasElement;

	function drawStaticGrid(ctx: CanvasRenderingContext2D, w: number, h: number, dpr: number) {
		const spacing = 34;
		const baseR = 1;
		ctx.clearRect(0, 0, w, h);
		for (let x = spacing / 2; x < w; x += spacing) {
			for (let y = spacing / 2; y < h; y += spacing) {
				ctx.beginPath();
				ctx.arc(x, y, baseR * dpr, 0, Math.PI * 2);
				ctx.fillStyle = 'rgba(212,160,71,0.18)';
				ctx.fill();
			}
		}
	}

	$effect(() => {
		const cvs = canvas;
		if (!cvs) return;
		const reduced = usesReducedMotion();
		const isTouch = matchMedia('(hover: none)').matches;
		const dpr = Math.min(devicePixelRatio || 1, 2);

		let w = 0, h = 0;
		let mx = -9999, my = -9999;
		let id = 0;
		let rafId = 0;

		function resize() {
			w = innerWidth;
			h = innerHeight;
			cvs.width = w * dpr;
			cvs.height = h * dpr;
			cvs.style.width = w + 'px';
			cvs.style.height = h + 'px';
		}

		resize();

		const spacing = 34;
		const baseR = 1;
		const influenceR = 140;

		function getDots() {
			const dots: { x: number; y: number }[] = [];
			for (let x = spacing / 2; x < w * dpr; x += spacing * dpr) {
				for (let y = spacing / 2; y < h * dpr; y += spacing * dpr) {
					dots.push({ x, y });
				}
			}
			return dots;
		}

		let dots = getDots();

		function draw() {
			const ctx = cvs.getContext('2d');
			if (!ctx) return;
			ctx.clearRect(0, 0, cvs.width, cvs.height);

			const px = mx * dpr;
			const py = my * dpr;

			for (let i = 0; i < dots.length; i++) {
				const d = dots[i];
				const dx = px - d.x;
				const dy = py - d.y;
				const dist = Math.sqrt(dx * dx + dy * dy);

				let alpha = 0.18;
				let radius = baseR;
				let ox = 0, oy = 0;

				if (dist < influenceR) {
					const t = 1 - dist / influenceR;
					alpha = 0.18 + t * 0.6;
					radius = baseR + t * 1.6;
					ox = -(dx / dist) * t * 6 * dpr || 0;
					oy = -(dy / dist) * t * 6 * dpr || 0;
				}

				ctx.beginPath();
				ctx.arc(d.x + ox, d.y + oy, radius * dpr, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(212,160,71,${alpha})`;
				ctx.fill();
			}
		}

		if (reduced || isTouch) {
			const ctx = cvs.getContext('2d');
			if (ctx) drawStaticGrid(ctx, cvs.width, cvs.height, dpr);
			return;
		}

		const onMove = (e: PointerEvent) => { mx = e.clientX; my = e.clientY; };
		const onResize = () => { resize(); dots = getDots(); };

		window.addEventListener('pointermove', onMove);
		window.addEventListener('resize', onResize);

		function loop() {
			draw();
			rafId = requestAnimationFrame(loop);
		}
		loop();

		return () => {
			cancelAnimationFrame(rafId);
			window.removeEventListener('pointermove', onMove);
			window.removeEventListener('resize', onResize);
		};
	});
</script>

<canvas bind:this={canvas} aria-hidden="true" class="dot-grid"></canvas>

<style>
	.dot-grid {
		position: fixed;
		inset: 0;
		z-index: -1;
		pointer-events: none;
	}
</style>
