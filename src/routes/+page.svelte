<script lang="ts">
	import { p, skills, projects } from '$lib/data';
	import { gsap, ScrollTrigger, SplitText, usesReducedMotion } from '$lib/motion';
	import { work, kinds, type piece } from '$lib/design';
	import Lightbox from '$lib/components/Lightbox.svelte';
	import { introReady } from '$lib/state';
	import { magnetic } from '$lib/actions/magnetic';
	import { reveal, counter, ruleDraw, proficiencyBar } from '$lib/actions/reveal';
	import Marquee from '$lib/components/Marquee.svelte';
	import Modal from '$lib/components/Modal.svelte';

	let active = $state<string | null>(null);
	let activeIframe = $state<string | null>(null);
	let heroReady = $state(false);
	let h1: HTMLHeadingElement;
	let eyebrow: HTMLParagraphElement;

	const featured = projects.filter((pr) => pr.url).slice(0, 4);
	const rest = projects.filter((pr) => !featured.includes(pr));

	function open_preview(pr: (typeof projects)[number]) {
		activeIframe = pr.url;
		active = pr.title;
	}

	let filter = $state('all');
	let vw = $state(1440);
	let at = $state<number | null>(null);
	let from = $state<DOMRect | null>(null);
	let wall: HTMLDivElement;

	const shown = $derived(filter === 'all' ? work : work.filter((w) => w.k === filter));
	const ncol = $derived(vw < 640 ? 2 : vw < 1024 ? 3 : 4);
	const cols = $derived.by(() => {
		const out: piece[][] = Array.from({ length: ncol }, () => []);
		const hs = Array(ncol).fill(0);
		for (const pc of shown) {
			const c = hs.indexOf(Math.min(...hs));
			const [w, h] = pc.i[(pc.o ?? [0])[0]];
			out[c].push(pc);
			hs[c] += h / w + 0.12;
		}
		return out;
	});

	function lead(pc: piece) {
		return pc.i[(pc.o ?? [0])[0]];
	}

	function open(pc: piece, e: MouseEvent) {
		from = (e.currentTarget as HTMLElement).querySelector('img')!.getBoundingClientRect();
		at = shown.indexOf(pc);
	}

	$effect(() => {
		cols;
		if (!heroReady || usesReducedMotion()) return;
		const tiles = wall.querySelectorAll('.tile');
		gsap.set(tiles, { y: 80, opacity: 0 });
		const batch = ScrollTrigger.batch(tiles, {
			start: 'top 95%',
			once: true,
			onEnter: (b) => gsap.to(b, { y: 0, opacity: 1, duration: 1.1, stagger: 0.07, ease: 'expo.out', overwrite: 'auto' })
		});
		const drift = Array.from(wall.children).map((col, c) =>
			gsap.to(col, {
				y: -[0, 140, 50, 190][c] * (ncol === 2 ? 0.5 : 1),
				ease: 'none',
				scrollTrigger: { trigger: wall, start: 'top bottom', end: 'bottom top', scrub: true }
			})
		);
		ScrollTrigger.refresh();
		return () => {
			batch.forEach((t) => t.kill());
			drift.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
			gsap.set(Array.from(wall.children), { y: 0 });
		};
	});

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
			}, '-=0.4');
		return () => { tl.kill(); split.revert(); };
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
	style="background-color: rgba(10, 14, 23, 0.72); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--color-border);"
>
	<a href="/" class="font-mono text-sm uppercase tracking-[0.08em] text-accent no-underline">{p.name}</a>
	<div class="flex items-center gap-6">
		{#each [['#work', 'work'], ['#code', 'code'], ['#about', 'about'], ['#contact', 'contact']] as [href, label]}
			<a class="link-draw font-mono text-xs uppercase tracking-[0.08em] no-underline" style="color: var(--color-fg-secondary);" {href}>{label}</a>
		{/each}
	</div>
</nav>

<svelte:window bind:innerWidth={vw} />

<main>
	<section id="work" class="px-4 md:px-6 pt-28 md:pt-36 pb-24" style="max-width: 1440px; margin: 0 auto;">
		<div class="grid md:grid-cols-12 gap-6 md:gap-8 items-end mb-10 md:mb-14">
			<div class="md:col-span-8" data-hero>
				<p bind:this={eyebrow} class="font-mono text-xs uppercase tracking-[0.08em] flex items-center gap-2 mb-4" style="color: var(--color-accent);">
					design + code — {p.location}
					<span class="inline-block w-1.5 h-1.5 rounded-full" style="background: var(--color-green); animation: pulse-dot 2s ease-in-out infinite;"></span>
					<span style="color: var(--color-green);">available</span>
				</p>
				<h1 bind:this={h1} class="font-mono font-light leading-[0.95] tracking-[-0.05em]" style="font-size: clamp(3rem, 8.4vw, 8.5rem); color: var(--color-fg);">
					gold edem <span style="color: var(--color-accent);">hogan</span>
				</h1>
			</div>
			<p data-hero-item class="md:col-span-4 max-w-md" style="font-size: 1.125rem; line-height: 1.6; color: var(--color-fg-secondary);">
				logos, identities, print and motion, drawn by hand in vector. and the web apps that ship them.
			</p>
		</div>

		<div data-hero-item class="flex flex-wrap items-center gap-2 mb-8 md:mb-10" role="tablist" aria-label="filter work">
			{#each ['all', ...kinds] as k}
				<button role="tab" aria-selected={filter === k} class="chip cursor-pointer" class:on={filter === k} onclick={() => (filter = k)}>
					{k}<sup>{k === 'all' ? work.length : work.filter((w) => w.k === k).length}</sup>
				</button>
			{/each}
		</div>

		{#key cols}
			<div bind:this={wall} class="wall grid gap-3 md:gap-5" style="grid-template-columns: repeat({ncol}, minmax(0, 1fr));">
				{#each cols as col}
					<div class="flex flex-col gap-3 md:gap-5">
						{#each col as pc}
							<button class="tile text-left cursor-pointer" data-cursor="view" data-cursor-label="view" onclick={(e) => open(pc, e)}>
								<span class="tile-img block overflow-hidden">
									<img src="/work/{pc.s}-t.webp" alt={pc.t} width={lead(pc)[0]} height={lead(pc)[1]} loading={work.indexOf(pc) < 8 ? 'eager' : 'lazy'} class="block w-full h-auto" />
								</span>
								<span class="flex items-baseline justify-between gap-3 pt-2.5 font-mono text-xs">
									<span class="truncate" style="color: var(--color-fg);">{pc.t}</span>
									<span class="shrink-0" style="color: var(--color-fg-muted);">{pc.k}</span>
								</span>
							</button>
						{/each}
					</div>
				{/each}
			</div>
		{/key}
	</section>

	<Marquee items={['logo', 'SvelteKit', 'identity', 'Rust', 'print', 'Cloudflare', 'motion', 'AI', 'packaging', 'WASM']} />

	<section id="code" class="px-6 py-24" style="max-width: 1200px; margin: 0 auto;">
		<div class="flex items-center gap-4 mb-16" use:reveal>
			<p class="font-mono text-xs uppercase tracking-[0.08em]" style="color: var(--color-accent-dim);" use:counter>02</p>
			<div class="h-px flex-1" style="background: var(--color-accent);" use:ruleDraw></div>
		</div>
		<h2 class="text-3xl font-medium mb-16" style="color: var(--color-fg);" use:reveal>code</h2>

		{#each featured as pr, i}
			<article class="grid md:grid-cols-12 gap-8 md:gap-12 items-center py-16 md:py-20" style="border-bottom: 1px solid var(--color-border);" use:reveal>
				<div class="md:col-span-5 {i % 2 ? 'md:order-2' : ''}">
					<p class="font-mono text-xs uppercase tracking-[0.08em] mb-4" style="color: var(--color-accent-dim);">/{String(i + 1).padStart(2, '0')}</p>
					<h3 class="font-mono font-light leading-[1.05] tracking-[-0.03em] mb-6" style="font-size: clamp(2rem, 4.5vw, 3.5rem); color: var(--color-fg);">
						{pr.title}
					</h3>
					<p class="mb-6" style="color: var(--color-fg-secondary); line-height: 1.7;">{pr.desc}</p>
					<div class="flex flex-wrap gap-2 mb-8">
						{#each pr.tags as tag}
							<span class="font-mono text-xs px-1.5 py-0.5" style="border: 1px solid var(--color-border); color: var(--color-fg-muted);">{tag}</span>
						{/each}
					</div>
					<div class="flex gap-6 items-center">
						<button class="link-draw font-mono text-xs uppercase tracking-[0.08em] cursor-pointer" style="color: var(--color-accent); background: none; border: none; padding: 0;"
							onclick={() => open_preview(pr)}>Open ↗</button>
						{#if pr.github}
							<a href={pr.github} target="_blank" rel="noopener noreferrer" class="link-draw font-mono text-xs uppercase tracking-[0.08em] no-underline" style="color: var(--color-fg-secondary);">GitHub →</a>
						{/if}
					</div>
				</div>
				<div class="frame md:col-span-7 w-full cursor-pointer" data-cursor="text" data-cursor-label="VIEW"
					role="button" tabindex="0" aria-label="Open {pr.title} preview"
					onclick={() => open_preview(pr)}
					onkeydown={(e) => { if (e.key === 'Enter') open_preview(pr); }}>
					<div class="flex items-center gap-3 px-4 py-2.5" style="border-bottom: 1px solid var(--color-border);">
						<span class="flex gap-1.5">
							{#each [0, 1, 2] as _}<span class="w-2 h-2 rounded-full" style="border: 1px solid var(--color-border-strong);"></span>{/each}
						</span>
						<span class="font-mono text-xs flex-1 truncate text-center" style="color: var(--color-fg-muted);">{new URL(pr.url!).host}</span>
						<span class="flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em]" style="color: var(--color-green);">
							<span class="w-1.5 h-1.5 rounded-full" style="background: var(--color-green); animation: pulse-dot 2s ease-in-out infinite;"></span>Live
						</span>
					</div>
					<div class="frame-view">
						<iframe src={pr.url} title={pr.title} loading="lazy" tabindex="-1"></iframe>
					</div>
				</div>
			</article>
		{/each}

		<p class="font-mono text-xs uppercase tracking-[0.08em] mt-24 mb-8" style="color: var(--color-accent-dim);" use:reveal>More work</p>
		<div class="grid gap-6 md:grid-cols-2" use:reveal={{ selector: 'button', stagger: 0.05 }}>
			{#each rest as pr}
				<button
					class="group cursor-pointer text-left project-card"
					style="background-color: var(--color-surface); border: 1px solid var(--color-border); padding: 1.5rem;"
					onclick={() => { if (pr.url) open_preview(pr); }}
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

	<section id="about" class="px-6 py-24" style="max-width: 1200px; margin: 0 auto;">
		<div class="flex items-center gap-4 mb-16" use:reveal>
			<p class="font-mono text-xs uppercase tracking-[0.08em]" style="color: var(--color-accent-dim);" use:counter>03</p>
			<div class="h-px flex-1" style="background: var(--color-accent);" use:ruleDraw></div>
		</div>
		<h2 class="text-3xl font-medium mb-8" style="color: var(--color-fg);" use:reveal>about</h2>
		<p class="max-w-3xl mb-16" style="font-size: 1.125rem; line-height: 1.7; color: var(--color-fg-secondary);" use:reveal>
			{p.summary}
		</p>
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8" use:reveal={{ selector: '> div', stagger: 0.1 }}
			style="border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">
			<div class="flex flex-col items-start sm:border-r border-[var(--color-border)] last:border-r-0 px-4">
				<span class="font-mono font-light" style="font-size: clamp(2.5rem, 6vw, 4rem); color: var(--color-accent);" use:counter>6</span>
				<span class="font-mono text-xs uppercase tracking-[0.08em] mt-1" style="color: var(--color-fg-muted);">+ Years SvelteKit</span>
			</div>
			<div class="flex flex-col items-start sm:border-r border-[var(--color-border)] last:border-r-0 px-4">
				<span class="font-mono font-light" style="font-size: clamp(2.5rem, 6vw, 4rem); color: var(--color-accent);" use:counter>{projects.length}</span>
				<span class="font-mono text-xs uppercase tracking-[0.08em] mt-1" style="color: var(--color-fg-muted);">Projects Shipped</span>
			</div>
			<div class="flex flex-col items-start sm:border-r border-[var(--color-border)] last:border-r-0 px-4">
				<span class="font-mono font-light" style="font-size: clamp(2.5rem, 6vw, 4rem); color: var(--color-accent);" use:counter>{projects.filter(p => p.url).length}</span>
				<span class="font-mono text-xs uppercase tracking-[0.08em] mt-1" style="color: var(--color-fg-muted);">Live Deployments</span>
			</div>
		</div>
	</section>

	<section id="skills" class="px-6 py-24" style="max-width: 1200px; margin: 0 auto;">
		<div class="flex items-center gap-4 mb-16" use:reveal>
			<p class="font-mono text-xs uppercase tracking-[0.08em]" style="color: var(--color-accent-dim);" use:counter>04</p>
			<div class="h-px flex-1" style="background: var(--color-accent);" use:ruleDraw></div>
		</div>
		<h2 class="text-3xl font-medium mb-16" style="color: var(--color-fg);" use:reveal>stack</h2>
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

	<section id="contact" class="px-6 py-24" style="max-width: 1200px; margin: 0 auto;">
		<div class="flex items-center gap-4 mb-16" use:reveal>
			<p class="font-mono text-xs uppercase tracking-[0.08em]" style="color: var(--color-accent-dim);" use:counter>05</p>
			<div class="h-px flex-1" style="background: var(--color-accent);" use:ruleDraw></div>
		</div>

		<div use:reveal class="mb-20">
			<h2 class="font-mono font-light leading-[1.05] tracking-[-0.03em]" style="font-size: clamp(3rem, 12vw, 9rem); color: var(--color-fg);">
				let's build
			</h2>
			<p class="font-mono font-light leading-[1.05] tracking-[-0.02em]" style="font-size: clamp(2rem, 6vw, 4rem); color: var(--color-accent);">
				something good.
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

{#if at !== null}
	<Lightbox list={shown} bind:at {from} onclose={() => (at = null)} />
{/if}

{#if activeIframe}
	<Modal url={activeIframe} onclose={() => { activeIframe = null; active = null; }} />
{/if}
