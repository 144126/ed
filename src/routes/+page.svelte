<script lang="ts">
	import { p } from '$lib/data';
	import type { PageProps } from './$types';
	import { gsap, ScrollTrigger, SplitText, usesReducedMotion } from '$lib/motion';
	import { work, kinds, prices, site_price, money, type piece } from '$lib/design';

	let { data }: PageProps = $props();
	import Lightbox from '$lib/components/Lightbox.svelte';
	import Marquee from '$lib/components/Marquee.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { magnetic } from '$lib/actions/magnetic';
	import { reveal } from '$lib/actions/reveal';

	// t = name, u = live url, d = one line
	const sites = [
		{ t: 'y2', u: 'https://y2.apexlinks.org', d: 'my own real-time social app: posts, rooms, dms, voice and video calls.' },
		{ t: 'beee chess championship', u: 'https://beeeproject.com', d: 'sign-ups and payments for an inter-school chess tournament in abuja.' },
		{ t: 'e4 chess coach', u: 'https://e4.apexlinks.org', d: 'my own free chess coach. it explains every move, from zero.' }
	];
	const fan = ['udens', 'e4', 'beee'].map((s) => work.find((w) => w.s === s)!);

	const steps = [
		['tell me what you need', 'the text, the size, the deadline, and any logo or photos you have. a voice note is fine.'],
		['get a fixed price', 'you know the full cost before any work starts. half to start, half before the final files.'],
		['first draft in 24 hours', 'then two rounds of changes are included, each back within a day.'],
		['get your files', 'print-ready pdf, png for screens, and the editable source. you own all of it.']
	];

	const faqs = [
		['what files do i get?', 'a print-ready pdf, png or jpg for social, and the source file (svg, illustrator or figma). logos also come in colour, black and white versions.'],
		['can you work from my sketch or an old logo?', 'yes. send a photo of the sketch, a screenshot or a blurry old file. i redraw it as clean vector, not a trace.'],
		['do you use ai?', 'yes, for mockup photos and some pictures, and every piece that used it says so. logos and type are built by hand as editable vector.'],
		['do you print?', 'no. you get files your local printer or an online printer can use straight away. i size them to your printer’s specs.'],
		['what if i don’t like the first draft?', 'tell me what feels off, even in plain words like “too busy” or “more fun”. that is what the two rounds of changes are for.']
	];

	const whats = [...prices.map((x) => x.t), 'website', 'something else'];
	const whens = ['today', 'in 2–3 days', 'this week', 'no rush'];
	let want = $state('flyer or poster');
	let when = $state('in 2–3 days');
	let note = $state('');
	const message = $derived(`hi gold, i found your site.\n\ni need: ${want}\nwhen: ${when}${note.trim() ? `\ndetails: ${note.trim()}` : ''}`);

	let filter = $state('all');
	let vw = $state(1440);
	let list = $state<piece[]>(work);
	let at = $state<number | null>(null);
	let from = $state<DOMRect | null>(null);
	let frame = $state<string | null>(null);
	let clock = $state('');
	let wall = $state<HTMLDivElement>();
	let h1: HTMLHeadingElement;
	let stack: HTMLDivElement;

	const shown = $derived(filter === 'all' ? work : work.filter((w) => w.k === filter));
	const ncol = $derived(vw < 640 ? 2 : vw < 1024 ? 3 : 4);
	const cols = $derived.by(() => {
		const out: piece[][] = Array.from({ length: ncol }, () => []);
		const hs = Array(ncol).fill(0);
		for (const pc of shown) {
			const c = hs.indexOf(Math.min(...hs));
			const [w, h] = lead(pc);
			out[c].push(pc);
			hs[c] += h / w + 0.25;
		}
		return out;
	});

	function lead(pc: piece) {
		return pc.i[(pc.o ?? [0])[0]];
	}

	function open(pcs: piece[], pc: piece, e: MouseEvent) {
		from = (e.currentTarget as HTMLElement).querySelector('img')!.getBoundingClientRect();
		list = pcs;
		at = pcs.indexOf(pc);
	}

	$effect(() => {
		// w = slug of a piece to open on load, so a link can go straight to it (?w=watch-worthy)
		const pc = work.find((x) => x.s === new URLSearchParams(location.search).get('w'));
		if (pc) at = work.indexOf(pc);
	});

	$effect(() => {
		if (usesReducedMotion()) return;
		const split = new SplitText(h1, { type: 'lines', mask: 'lines' });
		const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
		tl.from(split.lines, { yPercent: 110, duration: 1.1, stagger: 0.08 })
			.from('[data-hero]', { y: 24, opacity: 0, duration: 0.9, stagger: 0.07 }, '-=0.8')
			.from(stack.children, { y: 120, opacity: 0, duration: 1.3, stagger: 0.12 }, 0.15);
		return () => {
			tl.kill();
			split.revert();
		};
	});

	$effect(() => {
		cols;
		if (usesReducedMotion()) return;
		if (!wall) return;
		const tiles = wall.querySelectorAll('.tile');
		gsap.set(tiles, { y: 60, opacity: 0 });
		const batch = ScrollTrigger.batch(tiles, {
			start: 'top 95%',
			once: true,
			onEnter: (b) => gsap.to(b, { y: 0, opacity: 1, duration: 1, stagger: 0.06, ease: 'expo.out', overwrite: 'auto' })
		});
		ScrollTrigger.refresh();
		return () => batch.forEach((t) => t.kill());
	});

	$effect(() => {
		const tick = () =>
			(clock = new Date().toLocaleTimeString('en-GB', { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit' }));
		tick();
		const id = setInterval(tick, 15000);
		return () => clearInterval(id);
	});
</script>

<svelte:window bind:innerWidth={vw} />

<nav class="fixed top-3 inset-x-3 md:top-4 md:inset-x-6 z-50 flex items-center justify-between gap-3 rounded-full border border-border bg-bg/80 py-2 pl-5 pr-2 backdrop-blur-md">
	<a href="/" class="font-medium tracking-tight text-fg">gold hogan</a>
	<div class="hidden md:flex items-center gap-7 text-sm text-fg-secondary">
		<a class="hover:text-accent transition-colors" href="#work">work</a>
		<a class="hover:text-accent transition-colors" href="#prices">prices</a>
		<a class="hover:text-accent transition-colors" href="#how">how it works</a>
		<a class="hover:text-accent transition-colors" href="#web">websites</a>
	</div>
	<a href="#start" class="pill pill-gold">get a quote</a>
</nav>

<main>
	<section class="mx-auto grid max-w-[1440px] items-center gap-12 overflow-x-clip px-4 pt-32 pb-16 md:px-8 md:pt-40 lg:grid-cols-12 lg:gap-8 lg:pb-24">
		<div class="lg:col-span-7">
			<p data-hero class="mb-6 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-2 text-sm text-fg-secondary">
				<span class="live-dot"></span>taking new work this week
			</p>
			<h1 bind:this={h1} class="text-[clamp(2.75rem,6.4vw,6.25rem)] leading-[0.98] font-medium tracking-[-0.045em] text-fg">
				{#if data.g}
					send your text tonight. see your flyer <span class="text-accent">tomorrow.</span>
				{:else}
					your new homepage, live <span class="text-accent">this week.</span>
				{/if}
			</h1>
			<p data-hero class="mt-7 max-w-xl text-lg leading-relaxed text-fg-secondary">
				{#if data.g}
					i’m gold, a graphic designer. send your text and your deadline on whatsapp. a voice note is fine. flyers from {money(prices[0], data.g)}.
				{:else}
					i’m gold, a designer who builds websites. a homepage on your own domain, {money(site_price, data.g)} flat.
				{/if}
			</p>
			<div data-hero class="mt-9 flex flex-wrap gap-3">
				{#if data.g}
					<a href={p.whatsapp} target="_blank" rel="noopener noreferrer" class="pill pill-gold" use:magnetic={0.2}>message me on whatsapp</a>
					<a href="#work" class="pill pill-ghost">see {work.length} designs ↓</a>
				{:else}
					<a href="mailto:{p.email}?subject={encodeURIComponent('a new homepage')}&body={encodeURIComponent('hi gold, i found your site. i want a new homepage.\n\nmy current site: ')}" class="pill pill-gold" use:magnetic={0.2}>email me</a>
					<a href="#web" class="pill pill-ghost">see live sites ↓</a>
				{/if}
			</div>
			<ul data-hero class="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-muted">
				{#if data.g}
					<li><span class="text-fg">2</span> rounds of changes included</li>
					<li>pay <span class="text-fg">half</span> to start</li>
					<li>you own <span class="text-fg">every file</span></li>
				{:else}
					<li>made for <span class="text-fg">phones</span></li>
					<li><span class="text-fg">no</span> monthly fees</li>
					<li>logos and flyers <span class="text-fg">too</span></li>
				{/if}
			</ul>
		</div>

		<div bind:this={stack} class="group relative mx-auto aspect-[4/5] w-full max-w-[30rem] lg:col-span-5" aria-label="three recent flyers">
			{#each fan as pc, i (pc.s)}
				<div class="absolute top-[6%] w-[58%] {['left-[0%]', 'left-[21%] z-10', 'left-[42%]'][i]}">
					<button
						class="block w-full cursor-pointer overflow-hidden rounded-[var(--radius-tile)] border border-border shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-[var(--ease-out)]
							{['-rotate-[9deg] group-hover:-translate-x-[8%] group-hover:-rotate-[13deg]', '-translate-y-[3%] group-hover:-translate-y-[8%]', 'rotate-[9deg] group-hover:translate-x-[8%] group-hover:rotate-[13deg]'][i]}"
						data-cursor-label="view"
						aria-label="open {pc.t}"
						onclick={(e) => open(fan, pc, e)}
					>
						<img src="/work/{pc.s}-t.webp" alt={pc.t} width={lead(pc)[0]} height={lead(pc)[1]} fetchpriority={i === 1 ? 'high' : 'auto'} class="block h-auto w-full" />
					</button>
				</div>
			{/each}
		</div>
	</section>

	<Marquee items={['flyers', 'logos', 'brand kits', 'websites', 'labels', 'packaging', 't-shirts', 'social posts', 'menus', 'signage']} />

	<section id="work" class="mx-auto max-w-[1440px] scroll-mt-24 px-4 py-20 md:px-8 md:py-28">
		<div class="mb-10 grid items-end gap-6 md:grid-cols-12" use:reveal>
			<div class="md:col-span-7">
				<h2 class="text-[clamp(2.25rem,4.6vw,4rem)] leading-[1] font-medium tracking-[-0.04em]">every logo here hides an idea.</h2>
			</div>
			<p class="text-fg-secondary md:col-span-5 md:text-right">most are concepts for briefs that businesses posted online. tap one to find its idea.</p>
		</div>

		<div class="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="filter work">
			{#each [{ k: 'all', l: 'all' }, ...kinds] as k (k.k)}
				<button role="tab" aria-selected={filter === k.k} class="chip" class:on={filter === k.k} onclick={() => (filter = k.k)}>
					{k.l}<sup>{k.k === 'all' ? work.length : work.filter((w) => w.k === k.k).length}</sup>
				</button>
			{/each}
		</div>

		{#key cols}
			<div bind:this={wall} class="wall grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
				{#each cols as col, c (c)}
					<div class="flex flex-col gap-3 md:gap-5">
						{#each col as pc (pc.s)}
							<button class="tile cursor-pointer text-left" data-cursor-label="view" onclick={(e) => open(shown, pc, e)}>
								<span class="tile-img block overflow-hidden">
									<img src="/work/{pc.s}-t.webp" alt={pc.t} width={lead(pc)[0]} height={lead(pc)[1]} loading={work.indexOf(pc) < 8 ? 'eager' : 'lazy'} class="block h-auto w-full" />
								</span>
								<span class="flex flex-col px-1 pt-2.5 text-sm">
									<span class="truncate text-fg">{pc.t}</span>
									<span class="truncate text-xs text-fg-muted">{pc.c}</span>
								</span>
							</button>
						{/each}
					</div>
				{/each}
			</div>
		{/key}
	</section>

	<section id="prices" class="mx-auto max-w-[1440px] scroll-mt-24 px-4 py-20 md:px-8 md:py-28">
		<div class="mb-12 grid items-end gap-6 md:grid-cols-12" use:reveal>
			<div class="md:col-span-7">
				<h2 class="text-[clamp(2.25rem,4.6vw,4rem)] leading-[1] font-medium tracking-[-0.04em]">you know the price before i start.</h2>
			</div>
			<p class="text-fg-secondary md:col-span-5 md:text-right">starting prices in {data.g ? 'naira' : 'us dollars'}. tap one to start.</p>
		</div>
		<div class="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3" use:reveal={{ selector: '> *', stagger: 0.06 }}>
			{#each prices as x (x.t)}
				<a href="#start" onclick={() => (want = x.t)} class="card group flex flex-col p-7 transition-colors duration-500 hover:border-border-strong md:p-8">
					<span class="text-lg text-fg">{x.t}</span>
					<span class="mt-6 flex items-baseline gap-2">
						<span class="text-sm text-fg-muted">from</span>
						<span class="text-5xl font-medium tracking-[-0.04em] text-accent">{money(x, data.g)}</span>
					</span>
					<span class="mt-4 leading-relaxed text-fg-secondary">{x.d}</span>
					<span class="mt-8 text-sm text-fg-muted transition-colors group-hover:text-accent">start this →</span>
				</a>
			{/each}
		</div>
	</section>

	<section id="how" class="mx-auto max-w-[1440px] scroll-mt-24 px-4 py-20 md:px-8 md:py-28">
		<div class="mb-12" use:reveal>
			<h2 class="max-w-3xl text-[clamp(2.25rem,4.6vw,4rem)] leading-[1] font-medium tracking-[-0.04em]">from message to finished files in four steps.</h2>
		</div>
		<ol class="grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4" use:reveal={{ selector: '> *', stagger: 0.08 }}>
			{#each steps as [t, d], i (t)}
				<li class="card p-7 md:p-8">
					<span class="grid size-11 place-items-center rounded-full bg-accent-soft font-medium text-accent">{i + 1}</span>
					<h3 class="mt-8 text-xl font-medium tracking-tight">{t}</h3>
					<p class="mt-3 leading-relaxed text-fg-secondary">{d}</p>
				</li>
			{/each}
		</ol>
	</section>

	<section id="start" class="mx-auto max-w-[1440px] scroll-mt-24 px-4 py-20 md:px-8 md:py-28">
		<div class="card grid gap-10 p-6 md:p-12 lg:grid-cols-12 lg:gap-12" use:reveal>
			<div class="lg:col-span-7">
				<h2 class="text-[clamp(2rem,4vw,3.5rem)] leading-[1] font-medium tracking-[-0.04em]">pick two things. your message writes itself.</h2>

				<p class="mt-10 mb-3 text-sm text-fg-muted">what do you need?</p>
				<div class="flex flex-wrap gap-2">
					{#each whats as x (x)}
						<button class="chip" class:on={want === x} aria-pressed={want === x} onclick={() => (want = x)}>{x}</button>
					{/each}
				</div>

				<p class="mt-8 mb-3 text-sm text-fg-muted">when do you need it?</p>
				<div class="flex flex-wrap gap-2">
					{#each whens as x (x)}
						<button class="chip" class:on={when === x} aria-pressed={when === x} onclick={() => (when = x)}>{x}</button>
					{/each}
				</div>

				<label for="note" class="mt-8 mb-3 block text-sm text-fg-muted">anything else? <span class="text-fg-muted/70">(optional)</span></label>
				<textarea
					id="note"
					bind:value={note}
					rows="3"
					placeholder="e.g. a5 flyer for a church concert on 12 november, gold and white, our logo is attached"
					class="w-full resize-none rounded-2xl border border-border bg-bg px-5 py-4 text-base text-fg placeholder:text-fg-muted/70 focus:border-accent focus:outline-none"
				></textarea>
			</div>

			<div class="flex flex-col lg:col-span-5">
				<p class="mb-3 text-sm text-fg-muted">your message</p>
				<pre class="flex-1 rounded-2xl border border-border bg-bg p-5 font-sans text-base leading-relaxed whitespace-pre-wrap text-fg-secondary">{message}</pre>
				<div class="mt-4 grid gap-3 sm:grid-cols-2">
					<a href="{p.whatsapp}?text={encodeURIComponent(message)}" target="_blank" rel="noopener noreferrer" class="pill pill-gold">send on whatsapp</a>
					<a href="mailto:{p.email}?subject={encodeURIComponent(`${want}, ${when}`)}&body={encodeURIComponent(message)}" class="pill pill-ghost">send by email</a>
				</div>
			</div>
		</div>
	</section>

	<section id="web" class="mx-auto max-w-[1440px] scroll-mt-24 px-4 py-20 md:px-8 md:py-28">
		<div class="mb-12 grid items-end gap-6 md:grid-cols-12" use:reveal>
			<div class="md:col-span-7">
				<h2 class="text-[clamp(2.25rem,4.6vw,4rem)] leading-[1] font-medium tracking-[-0.04em]">made for phones first.</h2>
			</div>
			<p class="text-fg-secondary md:col-span-5 md:text-right">a new homepage on your own domain, live this week. {money(site_price, data.g)} flat, no monthly fees. three sites i built:</p>
		</div>
		<div class="grid gap-3 md:grid-cols-3 md:gap-4" use:reveal={{ selector: '> *', stagger: 0.08 }}>
			{#each sites as x (x.t)}
				<button class="card group cursor-pointer p-3 text-left transition-colors duration-500 hover:border-border-strong" data-cursor-label="open" onclick={() => (frame = x.u)}>
					<div class="frame-view">
						<iframe src={x.u} title={x.t} loading="lazy" tabindex="-1"></iframe>
					</div>
					<div class="px-3 pt-5 pb-3">
						<div class="flex items-center justify-between gap-3">
							<h3 class="text-lg font-medium tracking-tight">{x.t}</h3>
							<span class="flex items-center gap-2 text-xs text-fg-muted"><span class="live-dot"></span>live</span>
						</div>
						<p class="mt-2 text-sm leading-relaxed text-fg-secondary">{x.d}</p>
					</div>
				</button>
			{/each}
		</div>
	</section>

	<section class="mx-auto max-w-[1440px] px-4 py-20 md:px-8 md:py-28">
		<div class="grid gap-10 lg:grid-cols-12">
			<div class="lg:col-span-4" use:reveal>
				<h2 class="text-[clamp(2.25rem,4.6vw,4rem)] leading-[1] font-medium tracking-[-0.04em]">questions.</h2>
			</div>
			<div class="flex flex-col gap-3 lg:col-span-8" use:reveal={{ selector: '> *', stagger: 0.05 }}>
				{#each faqs as [q, a] (q)}
					<details class="card group px-6 py-5 md:px-8 md:py-6">
						<summary class="flex cursor-pointer list-none items-center justify-between gap-6 text-lg">
							{q}
							<span class="grid size-8 shrink-0 place-items-center rounded-full border border-border text-accent transition-transform duration-500 group-open:rotate-45">+</span>
						</summary>
						<p class="mt-4 max-w-2xl leading-relaxed text-fg-secondary">{a}</p>
					</details>
				{/each}
			</div>
		</div>
	</section>

	<section id="contact" class="mx-auto max-w-[1440px] px-4 pt-20 pb-16 md:px-8 md:pt-28">
		<div class="card px-6 py-16 text-center md:px-12 md:py-24" use:reveal>
			<h2 class="mx-auto max-w-4xl text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] font-medium tracking-[-0.05em]">
				need it soon? <span class="text-accent">let’s start today.</span>
			</h2>
			<div class="mt-10 flex flex-wrap justify-center gap-3">
				<a href={p.whatsapp} target="_blank" rel="noopener noreferrer" class="pill pill-gold" use:magnetic={0.2}>whatsapp {p.phone}</a>
				<a href="mailto:{p.email}" class="pill pill-ghost" use:magnetic={0.2}>email me</a>
			</div>
			<p class="mt-8 flex items-center justify-center gap-2.5 text-sm text-fg-muted">
				<span class="live-dot"></span>it’s {clock || '—'} for me (wat, utc+1)
			</p>
		</div>
	</section>
</main>

<footer class="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 pb-10 text-sm text-fg-muted md:px-8">
	<p>© {new Date().getFullYear()} gold edem hogan</p>
	<div class="flex gap-6">
		<a class="hover:text-accent transition-colors" href="#work">back to the work ↑</a>
	</div>
</footer>

{#if at !== null}
	<Lightbox {list} bind:at {from} g={data.g} onclose={() => (at = null)} />
{/if}

{#if frame}
	<Modal url={frame} onclose={() => (frame = null)} />
{/if}
