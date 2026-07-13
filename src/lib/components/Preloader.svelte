<script lang="ts">
	import { gsap } from 'gsap';
	import { introReady } from '$lib/state';
	import { usesReducedMotion } from '$lib/motion';

	let container: HTMLDivElement;
	let progressBar: HTMLDivElement;
	let terminalEl: HTMLDivElement;

	const lines = [
		'> initializing ed.portfolio',
		'> loading stack ................ svelte · rust · ai',
		'> compiling shaders ............ ok',
		'> deploy target ............... cloudflare edge',
		'> ready_'
	];

	$effect(() => {
		if (usesReducedMotion()) {
			introReady.set(true);
			return;
		}

		let cancelled = false;
		let booted = false;
		try { booted = sessionStorage.getItem('booted') === '1'; } catch {}

		if (booted) {
			introReady.set(true);
			return;
		}

		let progress = 0;
		let loadFired = false;
		let fontsReady = false;
		let charIndex = 0;
		let lineIndex = 0;
		let typeTimer: ReturnType<typeof setInterval>;
		let resolveProgress: (() => void) | null = null;

		const advanceProgress = () => {
			if (progress >= 100) return;
			const maxProgress = loadFired && fontsReady ? 100 : 70;
			progress = Math.min(progress + 1.5 + Math.random() * 3, maxProgress);
			if (progressBar) progressBar.style.width = progress + '%';
			if (progress < maxProgress) {
				requestAnimationFrame(advanceProgress);
			} else if (loadFired && fontsReady) {
				done();
			}
		};

		const done = () => {
			if (cancelled) return;
			if (progressBar) progressBar.style.width = '100%';
			try { sessionStorage.setItem('booted', '1'); } catch {}
			clearInterval(typeTimer);

			const tl = gsap.timeline({
				onComplete: () => {
					if (!cancelled) introReady.set(true);
				}
			});
			tl.to(terminalEl, { opacity: 0, duration: 0.2 }, 0)
				.to(progressBar?.parentElement, { opacity: 0, duration: 0.15 }, 0)
				.to(container, {
					clipPath: 'inset(0 0 100% 0)',
					duration: 0.7,
					ease: 'expo.inOut'
				}, 0.1);
		};

		const typeNext = () => {
			if (cancelled || lineIndex >= lines.length) return;
			const line = lines[lineIndex];
			if (charIndex < line.length) {
				charIndex++;
				renderLines();
				typeTimer = setTimeout(typeNext, 18);
			} else {
				charIndex = 0;
				lineIndex++;
				typeTimer = setTimeout(typeNext, 120);
			}
		};

		function renderLines() {
			if (!terminalEl) return;
			let html = '';
			for (let i = 0; i < lines.length; i++) {
				if (i < lineIndex) {
					html += `<div class="preloader-line">${lines[i]}</div>`;
				} else if (i === lineIndex) {
					const visible = lines[i].slice(0, charIndex);
					html += `<div class="preloader-line">${visible}</div>`;
				}
			}
			terminalEl.innerHTML = html;
		}

		const onLoad = () => { loadFired = true; if (fontsReady) advanceProgress(); };
		const onFonts = () => { fontsReady = true; if (loadFired) advanceProgress(); };

		if (document.fonts) document.fonts.ready.then(onFonts);
		else fontsReady = true;

		if (document.readyState === 'complete') onLoad();
		else window.addEventListener('load', onLoad, { once: true });

		advanceProgress();
		typeNext();

		const timeout = setTimeout(() => {
			loadFired = true;
			fontsReady = true;
			done();
		}, 1600);

		return () => {
			cancelled = true;
			clearTimeout(timeout);
			clearInterval(typeTimer);
			window.removeEventListener('load', onLoad);
		};
	});
</script>

<div bind:this={container} class="preloader">
	<div class="preloader-content">
		<div bind:this={terminalEl} class="terminal"></div>
		<div class="progress-track">
			<div bind:this={progressBar} class="progress-bar"></div>
		</div>
	</div>
</div>

<style>
	.preloader {
		position: fixed;
		inset: 0;
		z-index: 10000;
		background: var(--color-bg);
		display: flex;
		align-items: center;
		justify-content: center;
		clip-path: inset(0 0 0 0);
	}
	.preloader-content {
		width: 100%;
		max-width: 480px;
		padding: 2rem;
	}
	.terminal {
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		line-height: 1.8;
		color: var(--color-accent);
		margin-bottom: 2rem;
		min-height: 8lh;
	}
	.preloader-line {
		white-space: pre;
	}
	.progress-track {
		width: 100%;
		height: 1px;
		background: rgba(212, 160, 71, 0.15);
		overflow: hidden;
	}
	.progress-bar {
		height: 100%;
		width: 0%;
		background: var(--color-accent);
	}
</style>
