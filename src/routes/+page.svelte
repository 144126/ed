<script lang="ts">
	import { p, skills, projects } from '$lib/data';
	import { gsap, SplitText, usesReducedMotion } from '$lib/motion';
	import { introReady } from '$lib/state';
	import { magnetic } from '$lib/actions/magnetic';
	import { reveal, counter, ruleDraw, proficiencyBar } from '$lib/actions/reveal';
	import HeroLight from '$lib/components/HeroLight.svelte';
	import Marquee from '$lib/components/Marquee.svelte';
	import Modal from '$lib/components/Modal.svelte';

	let active = $state<string | null>(null);
	let activeIframe = $state<string | null>(null);
	let heroReady = $state(false);
	let h1: HTMLHeadingElement;
	let eyebrow: HTMLParagraphElement;
	let roleLine: HTMLSpanElement;
	let scrollCue: HTMLDivElement;

	const roles = [
		'SvelteKit Architect',
		'Rust + WASM',
		'AI / Vector Search',
		'Algorithmic Trading',
		'Cloud & Edge'
	];

	function scrollToWork() {
		const lenis = (window as any).__lenis;
		const target = document.getElementById('projects');
		if (lenis && target) lenis.scrollTo(target, { offset: -80 });
		else target?.scrollIntoView({ behavior: 'smooth' });
	}

	$effect(() => {
		const unsub = introReady.subscribe((v) => { heroReady = v; });
		return () => unsub();
	});

	$effect(() => {
		if (!heroReady) return;
		if (usesReducedMotion()) {
			gsap.set('[data-hero]', { opacity: 1, y: 0 });
			return;
		}
		const split = new SplitText(h1, { type: 'chars' });
		const tl = gsap.timeline();
		tl.from(eyebrow, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' })
			.from(split.chars, {
				yPercent: 120, opacity: 0, stagger: 0.035,
				duration: 0.9, ease: 'expo.out'
			}, '-=0.2')
			.from('[data-hero-item]', {
				y: 24, opacity: 0, stagger: 0.08,
				duration: 0.7, ease: 'power3.out'
			}, '-=0.4')
			.from(scrollCue, { opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2');
		return () => { tl.kill(); split.revert(); };
	});

	$effect(() => {
		if (!heroReady) return;
		if (usesReducedMotion()) { roleLine.textContent = roles[0]; return; }
		let index = 0;
		let charIdx = 0;
		let dir = 1;
		let timer: ReturnType<typeof setTimeout>;
		const tick = () => {
			const role = roles[index];
			if (dir === 1) {
				charIdx++;
				roleLine.textContent = role.slice(0, charIdx) + (charIdx < role.length ? '|' : '');
				if (charIdx >= role.length) {
					dir = 0;
					timer = setTimeout(tick, 1600);
					return;
				}
			} else if (dir === 0) {
				charIdx--;
				roleLine.textContent = role.slice(0, charIdx) + (charIdx > 0 ? '|' : '');
				if (charIdx <= 0) {
					index = (index + 1) % roles.length;
					dir = 1;
				}
			}
			timer = setTimeout(tick, dir === 1 ? 50 : 25);
		};
		tick();
		return () => clearTimeout(timer);
	});

	function scrollToTop() {
		const lenis = (window as any).__lenis;
		if (lenis) lenis.scrollTo(0, { duration: 2 });
		else window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	$effect(() => {
		function handler(e: KeyboardEvent) {
			if (e.key === 'Escape') { activeIframe = null; active = null; }
		}
		window.addEventListener('keydown', handler);
		return () => window.removeEventListener('keydown', handler);
	});

	$effect(() => {
		const el = document.getElementById('lagos-clock')!;
		function tick() {
			const now = new Date();
			const lagos = now.toLocaleTimeString('en-US', { timeZone: 'Africa/Lagos', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
			el.textContent = `AVAILABLE FOR WORK · ${lagos} WAT`;
		}
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	});
</script>

<nav
	class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
	style="background-color: var(--color-bg); border-bottom: 1px solid var(--color-border);"
>
	<a href="/" class="font-mono text-sm uppercase tracking-[0.08em] text-accent no-underline">{p.name}</a>
	<div class="flex items-center gap-6">
		<a class="font-mono text-xs uppercase tracking-[0.08em] no-underline" style="color: var(--color-fg-secondary);" href="#projects">Projects</a>
		<a class="font-mono text-xs uppercase tracking-[0.08em] no-underline" style="color: var(--color-fg-secondary);" href="#contact">Contact</a>
	</div>
</nav>

<main>
	<section class="relative flex min-h-screen flex-col justify-center px-6 pt-24 pb-16 overflow-hidden" style="max-width: 1200px; margin: 0 auto;">
		<HeroLight />
		<div data-hero>
			<p bind:this={eyebrow} class="font-mono text-xs uppercase tracking-[0.08em] flex items-center gap-2" style="color: var(--color-accent); margin-bottom: 1rem;">
				Full-Stack Developer — {p.location}
				<span class="inline-block w-1.5 h-1.5 rounded-full" style="background: var(--color-green); animation: pulse-dot 2s ease-in-out infinite;"></span>
				<span style="color: var(--color-green);">AVAILABLE FOR WORK</span>
			</p>
		</div>
		<h1
			bind:this={h1}
			class="font-mono font-light leading-[1.1] tracking-[-0.02em]"
			style="font-size: clamp(2.5rem, 9vw, 6rem); color: var(--color-fg); margin: 0 0 0.75rem 0;"
		>
			Gold Edem / Hogan
		</h1>
		<p class="font-mono text-sm uppercase tracking-[0.08em] mb-4" style="color: var(--color-accent-dim);">
			<span bind:this={roleLine}></span>
		</p>
		<p data-hero-item class="max-w-2xl" style="font-size: 1.125rem; line-height: 1.6; color: var(--color-fg-secondary); margin: 0 0 2rem 0;">
			{p.summary}
		</p>
		<div data-hero-item class="flex flex-wrap gap-3">
			<button onclick={scrollToWork} use:magnetic={0.3} class="font-mono text-xs uppercase tracking-[0.08em] px-3 py-2 cursor-pointer"
				style="background-color: var(--color-accent); color: var(--color-bg); border: none;">
				View Work ↓
			</button>
			<a href="mailto:{p.email}" use:magnetic={0.3} class="font-mono text-xs uppercase tracking-[0.08em] px-3 py-2 no-underline inline-block"
				style="border: 1px solid var(--color-border-strong); color: var(--color-accent);">
				Email Me
			</a>
		</div>
		<div bind:this={scrollCue} class="flex flex-col items-center gap-2 mt-16" style="opacity: 0;">
			<div class="w-px h-12" style="background: linear-gradient(to bottom, var(--color-accent), transparent);"></div>
			<span class="font-mono text-[0.625rem] uppercase tracking-[0.12em]" style="color: var(--color-accent-dim);">SCROLL</span>
		</div>
	</section>

	<Marquee />

	<section id="about" class="px-6 py-24" style="max-width: 1200px; margin: 0 auto;">
		<div class="flex items-center gap-4 mb-16" use:reveal>
			<p class="font-mono text-xs uppercase tracking-[0.08em]" style="color: var(--color-accent-dim);" use:counter>01</p>
			<div class="h-px flex-1" style="background: var(--color-accent);" use:ruleDraw></div>
		</div>
		<h2 class="text-3xl font-medium mb-8" style="color: var(--color-fg);" use:reveal>About</h2>
		<p class="max-w-3xl mb-12" style="font-size: 1.125rem; line-height: 1.7; color: var(--color-fg-secondary);" use:reveal>
			{p.summary}
		</p>
		<p class="mb-16 font-mono text-sm" style="color: var(--color-accent-dim);" use:reveal>
			I ship production systems end-to-end — from Rust/WASM cores and vector search to Paystack checkout on the Cloudflare edge.
		</p>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-8 py-8" use:reveal={{ selector: '> div', stagger: 0.1 }}
			style="border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">
			<div class="flex flex-col items-center md:items-start border-r border-[var(--color-border)] last:border-r-0 px-4">
				<span class="font-mono font-light" style="font-size: clamp(2.5rem, 6vw, 4rem); color: var(--color-accent);" use:counter>6</span>
				<span class="font-mono text-xs uppercase tracking-[0.08em] mt-1" style="color: var(--color-fg-muted);">+ Years SvelteKit</span>
			</div>
			<div class="flex flex-col items-center md:items-start border-r border-[var(--color-border)] last:border-r-0 px-4">
				<span class="font-mono font-light" style="font-size: clamp(2.5rem, 6vw, 4rem); color: var(--color-accent);" use:counter>{projects.length}</span>
				<span class="font-mono text-xs uppercase tracking-[0.08em] mt-1" style="color: var(--color-fg-muted);">Projects Shipped</span>
			</div>
			<div class="flex flex-col items-center md:items-start border-r border-[var(--color-border)] last:border-r-0 px-4">
				<span class="font-mono font-light" style="font-size: clamp(2.5rem, 6vw, 4rem); color: var(--color-accent);" use:counter>{projects.filter(p => p.url).length}</span>
				<span class="font-mono text-xs uppercase tracking-[0.08em] mt-1" style="color: var(--color-fg-muted);">Live Deployments</span>
			</div>
			<div class="flex flex-col items-center md:items-start px-4">
				<span class="font-mono font-light" style="font-size: clamp(2.5rem, 6vw, 4rem); color: var(--color-accent);">∞</span>
				<span class="font-mono text-xs uppercase tracking-[0.08em] mt-1" style="color: var(--color-fg-muted);">Coffee / Day</span>
			</div>
		</div>
	</section>

	<section id="skills" class="px-6 py-24" style="max-width: 1200px; margin: 0 auto;">
		<div class="flex items-center gap-4 mb-16" use:reveal>
			<p class="font-mono text-xs uppercase tracking-[0.08em]" style="color: var(--color-accent-dim);" use:counter>03</p>
			<div class="h-px flex-1" style="background: var(--color-accent);" use:ruleDraw></div>
		</div>
		<h2 class="text-3xl font-medium mb-16" style="color: var(--color-fg);" use:reveal>Stack</h2>
		<div class="grid gap-12 md:grid-cols-2 lg:grid-cols-3" use:reveal={{ selector: '> div', stagger: 0.06 }}>
			{#each skills as s}
				<div>
					<h3 class="font-mono text-sm uppercase tracking-[0.08em] mb-4" style="color: var(--color-accent);">{s.cat}</h3>
					<div class="flex flex-wrap gap-2">
						{#each s.items as item}
							{#if typeof item === 'object'}
								<div class="skill-chip font-mono text-xs px-3 py-2 min-w-[160px]" style="border: 1px solid var(--color-border); color: var(--color-fg-secondary);"
									use:magnetic={0.15}>
									<div class="font-medium mb-1" style="color: var(--color-fg);">{item.name}</div>
									<div class="flex items-center justify-between gap-2 mb-2" style="color: var(--color-fg-muted);">
										<span>{item.level}</span>
										<span>{item.years}yr</span>
									</div>
									<div class="w-full h-px bg-[rgba(212,160,71,0.1)]" style="overflow: hidden;">
										<div class="h-full" style="width: {Math.min(item.years / 10 * 100, 100)}%; background: var(--color-accent); transform: scaleX(0); transform-origin: left;"
											use:proficiencyBar></div>
									</div>
								</div>
							{:else}
								<span class="skill-chip font-mono text-xs px-2 py-1" style="border: 1px solid var(--color-border); color: var(--color-fg-secondary);"
									use:magnetic={0.15}>
									{item}
								</span>
							{/if}
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section id="projects" class="px-6 py-24" style="max-width: 1200px; margin: 0 auto;">
		<div class="flex items-center gap-4 mb-16" use:reveal>
			<p class="font-mono text-xs uppercase tracking-[0.08em]" style="color: var(--color-accent-dim);" use:counter>02</p>
			<div class="h-px flex-1" style="background: var(--color-accent);" use:ruleDraw></div>
		</div>
		<h2 class="text-3xl font-medium mb-16" style="color: var(--color-fg);" use:reveal>Work</h2>

		{#each projects.filter(p => p.url).slice(0, 4) as pr, i}
			<div class="relative min-h-[80vh] flex flex-col md:flex-row gap-8 md:gap-16 py-16 md:py-24 items-center"
				style="border-bottom: 1px solid var(--color-border);"
				data-cursor="text" data-cursor-label="VIEW"
				onclick={() => { if (pr.url) { activeIframe = pr.url; active = pr.title; } }}
				role="button" tabindex="0"
				onkeydown={(e) => { if (e.key === 'Enter' && pr.url) { activeIframe = pr.url; active = pr.title; } }}
			>
				<div class="flex-1 w-full">
					<p class="font-mono text-xs uppercase tracking-[0.08em] mb-4" style="color: var(--color-accent-dim);">/{String(i + 1).padStart(2, '0')}</p>
					<h3 class="font-mono font-light leading-[1.1] tracking-[-0.02em] mb-4" style="font-size: clamp(1.8rem, 4vw, 3rem); color: var(--color-fg);">
						{pr.title}
					</h3>
					<p class="text-sm mb-6" style="color: var(--color-fg-secondary); line-height: 1.7;">{pr.desc}</p>
					<div class="flex flex-wrap gap-2 mb-6">
						{#each pr.tags as tag}
							<span class="font-mono text-xs px-1.5 py-0.5" style="border: 1px solid var(--color-border); color: var(--color-fg-muted);">{tag}</span>
						{/each}
					</div>
					<div class="flex gap-4 items-center">
						{#if pr.url}
							<span class="font-mono text-xs px-1.5 py-0.5" style="border: 1px solid var(--color-green-dim); color: var(--color-green);">LIVE</span>
						{/if}
						{#if pr.github}
							<a href={pr.github} target="_blank" rel="noopener noreferrer" class="font-mono text-xs uppercase tracking-[0.08em] no-underline" style="color: var(--color-accent);"
								onclick={(e) => e.stopPropagation()}>GitHub →</a>
						{/if}
						{#if pr.url}
							<button class="font-mono text-xs uppercase tracking-[0.08em] cursor-pointer" style="color: var(--color-accent-dim); background: none; border: none; padding: 0;"
								onclick={(e) => { e.stopPropagation(); activeIframe = pr.url; active = pr.title; }}>Live ↗</button>
						{/if}
					</div>
				</div>
				<div class="flex-1 w-full featured-preview" data-cursor="text" data-cursor-label="VIEW"
					onclick={() => { if (pr.url) { activeIframe = pr.url; active = pr.title; } }}
					onkeydown={(e) => { if (e.key === 'Enter' && pr.url) { activeIframe = pr.url; active = pr.title; } }}
					role="button"
					tabindex="0">
					<div class="aspect-[4/3] w-full" style="overflow: hidden;">
						<iframe src={pr.url} class="h-full w-full" style="border: none;" title={pr.title} loading="lazy" />
					</div>
				</div>
			</div>
		{/each}

		<div class="grid gap-6 md:grid-cols-2 mt-16" use:reveal={{ selector: 'button', stagger: 0.05 }}>
			{#each projects.slice(4) as pr}
				<button
					class="group cursor-pointer text-left project-card"
					style="background-color: var(--color-surface); border: 1px solid {active === pr.title ? 'var(--color-border-strong)' : 'var(--color-border)'}; padding: 1.5rem;"
					onclick={() => {
						if (pr.url) { activeIframe = pr.url; active = pr.title; }
					}}
					onmouseenter={(e) => {
						e.currentTarget.style.borderColor = 'var(--color-border-strong)';
					}}
					onmouseleave={(e) => {
						if (active !== pr.title) e.currentTarget.style.borderColor = 'var(--color-border)';
					}}
					onpointermove={(e) => {
						const r = e.currentTarget.getBoundingClientRect();
						e.currentTarget.style.setProperty('--mx', String(e.clientX - r.left));
						e.currentTarget.style.setProperty('--my', String(e.clientY - r.top));
					}}
				>
					<div class="flex items-center gap-2 mb-3">
						<h3 class="font-mono text-sm uppercase tracking-[0.08em]" style="color: var(--color-fg);">{pr.title}</h3>
						{#if pr.url}
							<span class="font-mono text-xs px-1.5 py-0.5" style="border: 1px solid var(--color-green-dim); color: var(--color-green);">LIVE</span>
						{/if}
					</div>
					<p class="text-sm mb-4" style="color: var(--color-fg-secondary); line-height: 1.6;">{pr.desc}</p>
					<div class="flex flex-wrap gap-2 mb-3">
						{#each pr.tags as tag}
							<span class="font-mono text-xs px-1.5 py-0.5" style="border: 1px solid var(--color-border); color: var(--color-fg-muted);">{tag}</span>
						{/each}
					</div>
					<div class="flex gap-3">
						{#if pr.github}
							<a href={pr.github} target="_blank" rel="noopener noreferrer"
								class="font-mono text-xs uppercase tracking-[0.08em] no-underline"
								style="color: var(--color-accent);"
								onclick={(e) => e.stopPropagation()}>GitHub →</a>
						{/if}
						{#if pr.url}
							<span class="font-mono text-xs uppercase tracking-[0.08em]" style="color: var(--color-accent-dim);">Preview →</span>
						{/if}
					</div>
				</button>
			{/each}
		</div>
	</section>

	<section id="contact" class="px-6 py-24" style="max-width: 1200px; margin: 0 auto;">
		<div class="flex items-center gap-4 mb-16" use:reveal>
			<p class="font-mono text-xs uppercase tracking-[0.08em]" style="color: var(--color-accent-dim);" use:counter>04</p>
			<div class="h-px flex-1" style="background: var(--color-accent);" use:ruleDraw></div>
		</div>

		<div use:reveal class="mb-20">
			<h2 class="font-mono font-light leading-[1.05] tracking-[-0.03em]" style="font-size: clamp(3rem, 12vw, 9rem); color: var(--color-fg);">
				LET'S BUILD
			</h2>
			<p class="font-mono font-light leading-[1.05] tracking-[-0.02em]" style="font-size: clamp(2rem, 6vw, 4rem); color: var(--color-accent);">
				SOMETHING FAST.
			</p>
		</div>

		<div class="flex flex-wrap gap-8 mb-16" use:reveal>
			<a href="mailto:{p.email}" use:magnetic={0.3} class="link-draw font-mono text-sm no-underline" style="color: var(--color-accent);">
				Email me → {p.email}
			</a>
			<a href={p.github} target="_blank" rel="noopener noreferrer" use:magnetic={0.3} class="link-draw font-mono text-sm no-underline" style="color: var(--color-fg-secondary);">
				GitHub → {p.github.replace('https://github.com/', '')}
			</a>
			<a href={p.org} target="_blank" rel="noopener noreferrer" use:magnetic={0.3} class="link-draw font-mono text-sm no-underline" style="color: var(--color-fg-secondary);">
				Org → {p.org.replace('https://github.com/', '')}
			</a>
		</div>

		<div class="flex items-center gap-3 mb-16" use:reveal>
			<span class="inline-block w-2 h-2 rounded-full" style="background: var(--color-green); animation: pulse-dot 2s ease-in-out infinite;"></span>
			<span class="font-mono text-xs uppercase tracking-[0.08em]" id="lagos-clock" style="color: var(--color-green);">
				AVAILABLE FOR WORK · WAT
			</span>
		</div>

		<div class="grid gap-8 md:grid-cols-3 py-12" style="border-top: 1px solid var(--color-border);" use:reveal={{ selector: '> div', stagger: 0.08 }}>
			<div>
				<p class="font-mono text-xs uppercase tracking-[0.08em] mb-2" style="color: var(--color-accent);">Email</p>
				<a href="mailto:{p.email}" class="font-mono text-sm no-underline" style="color: var(--color-fg-secondary);">{p.email}</a>
			</div>
			<div>
				<p class="font-mono text-xs uppercase tracking-[0.08em] mb-2" style="color: var(--color-accent);">Location</p>
				<p class="font-mono text-sm" style="color: var(--color-fg-secondary);">{p.location}</p>
			</div>
			<div>
				<p class="font-mono text-xs uppercase tracking-[0.08em] mb-2" style="color: var(--color-accent);">GitHub</p>
				<a href={p.github} target="_blank" rel="noopener noreferrer" class="font-mono text-sm no-underline" style="color: var(--color-fg-secondary);">144126</a>
			</div>
		</div>

		<div class="font-mono text-xs mt-4" style="color: var(--color-fg-muted);" use:reveal>
			Built with SvelteKit on the edge
		</div>
	</section>
</main>

<footer class="px-6 py-8" style="border-top: 1px solid var(--color-border);">
	<div class="flex items-center justify-between" style="max-width: 1200px; margin: 0 auto;">
		<p class="font-mono text-xs" style="color: var(--color-fg-muted);">© {new Date().getFullYear()} Gold Edem Hogan</p>
		<button onclick={scrollToTop} class="font-mono text-xs uppercase tracking-[0.08em] cursor-pointer" style="color: var(--color-accent-dim); background: none; border: none;">
			Back to top ↑
		</button>
	</div>
</footer>

{#if activeIframe}
	<Modal url={activeIframe} onclose={() => { activeIframe = null; active = null; }} />
{/if}
