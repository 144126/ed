<script lang="ts">
	let active = $state<string | null>(null);
	let activeIframe = $state<string | null>(null);

	$effect(() => {
		function handler(e: KeyboardEvent) {
			if (e.key === 'Escape') { activeIframe = null; active = null; }
		}
		window.addEventListener('keydown', handler);
		return () => window.removeEventListener('keydown', handler);
	});

	const p = {
		name: 'Gold Edem Hogan',
		title: 'Full-Stack Web Developer',
		tagline: 'SvelteKit, Rust, AI & Cloud Deployments',
		email: '1440fl@gmail.com',
		phone: '+2348118718106',
		github: 'https://github.com/144126',
		org: 'https://github.com/angelwingscomms',
		location: 'Nigeria',
		summary:
			'Versatile full-stack developer experienced in SvelteKit, TypeScript, Python, and Rust. Builds scalable microservices, AI-driven applications with vector embeddings, and algorithmic trading systems (MQL5/ccxt). Proficient in end-to-end deployment utilizing AWS, Docker, and CI/CD pipelines to deliver high-performance cloud solutions.'
	};

	const skills = [
		{
			cat: 'Core Expertise',
			items: [
				{ name: 'SvelteKit', level: 'Expert', years: 6 },
				{ name: 'Python', level: 'Intermediate', years: 9 },
				{ name: 'TypeScript', level: 'Intermediate', years: 6 },
				{ name: 'Rust', level: 'Intermediate', years: 4 }
			]
		},
		{
			cat: 'Frontend',
			items: ['SvelteJS', 'React', 'Tailwind CSS', 'Carbon Components', 'Material UI']
		},
		{
			cat: 'Backend',
			items: ['Node.js', 'PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'REST APIs', 'WebSockets', 'Deno']
		},
		{ cat: 'Cloud & DevOps', items: ['AWS (Lightsail, EC2)', 'Docker', 'GitHub Actions', 'CI/CD', 'Serverless', 'Cloudflare', 'Vercel', 'Netlify'] },
		{ cat: 'Architecture & Tooling', items: ['API Design', 'Microservices', 'CLI Tools', 'NPM Packages'] },
		{ cat: 'AI & Trading', items: ['MQL5', 'ONNX', 'ccxt', 'Qdrant', 'Vector Embeddings', 'ML Pipelines'] },
		{ cat: 'Design & Media', items: ['Figma', 'Inkscape', 'CorelDRAW', 'FL Studio', 'Video Editing'] }
	];

	const projects = [
		{
			title: 'ApexLinks',
			desc: 'SvelteKit platform to list businesses, products, and services. Features AI-powered vector search for blogs/listings and an integrated AI resume builder that autonomously generates complete content and styling.',
			tags: ['SvelteKit', 'Qdrant', 'AI', 'Vector Search'],
			url: 'https://apexlinks.org',
			github: 'https://github.com/angelwingscomms/i'
		},
		{
			title: 'BEEE Spectacular Chess Championship',
			desc: 'Tournament registration platform for Abuja 2026 inter-school chess championship. Team registration with Paystack payment processing, Qdrant vector DB backend, Cloudflare deployment, and Google Gemini AI chess coach.',
			tags: ['SvelteKit', 'Paystack', 'Qdrant', 'Cloudflare', 'Gemini AI'],
			url: 'https://beee.apexlinks.org',
			github: 'https://github.com/angelwingscomms/beee'
		},
		{
			title: 'Chess AI Training App',
			desc: 'Chess training platform where users play against Stockfish with 10 difficulty presets, get AI coaching via Groq, receive interactive hints, and analyze positions. Google OAuth, token-based Paystack payments, Cloudflare Workers, Qdrant backend.',
			tags: ['SvelteKit', 'Stockfish', 'Groq AI', 'Paystack', 'Cloudflare', 'Qdrant'],
			url: 'https://chess.apexlinks.org',
			github: 'https://github.com/angelwingscomms/chess'
		},
		{
			title: 'MT5 Neural Network EAs',
			desc: 'Algorithmic trading system for MetaTrader 5 (Gold & Bitcoin). Python scripts for tick data processing and training Mamba state-space neural networks. Exports trained AI models to ONNX format for live execution in MQL5.',
			tags: ['MQL5', 'Python', 'ONNX', 'Mamba', 'Trading'],
			url: null,
			github: 'https://github.com/angelwingscomms/9'
		},
		{
			title: 'Crypto Arbitrage Bot',
			desc: 'Automated cryptocurrency arbitrage trading system built in TypeScript. Leverages the ccxt library to monitor and execute cross-exchange arbitrage opportunities.',
			tags: ['TypeScript', 'ccxt', 'Trading', 'Crypto'],
			url: null,
			github: 'https://github.com/angelwingscomms/crypto-arbitrage'
		},
		{
			title: 'AI Image Creation Assistant',
			desc: 'Prompt engineering tool for crafting robust AI image prompts. Features a click-and-drop library for style and scenario keywords, and integrates directly with DALL-E / image generation APIs to render outputs.',
			tags: ['SvelteKit', 'AI', 'DALL-E', 'Prompt Engineering'],
			url: 'https://4320.vercel.app',
			github: 'https://github.com/angelwingscomms/stuff'
		},
		{
			title: 'Image Scale',
			desc: 'SvelteKit web tool for image rescaling. Core resizing logic implemented in Rust and compiled to WASM for high performance. Features user toggles to preserve original aspect ratio.',
			tags: ['SvelteKit', 'Rust', 'WASM', 'Image Processing'],
			url: 'https://4320.vercel.app',
			github: 'https://github.com/angelwingscomms/stuff'
		},
		{
			title: 'UdoFlow',
			desc: 'AI agency website in SvelteKit. Features an AI chatbot that saves visitor chats to the database for session resumption.',
			tags: ['SvelteKit', 'AI', 'Chatbot'],
			url: null,
			github: null
		},
		{
			title: 'Report Card Management Webapp',
			desc: 'School management system backed by Qdrant and SvelteKit. Enables teachers to log student scores, auto-computes final pass/fail grades, and generates comprehensive PDF report cards.',
			tags: ['SvelteKit', 'Qdrant', 'PDF Generation', 'Education'],
			url: null,
			github: null
		},
		{
			title: 'Travel Ticketing WebApp',
			desc: 'React-based flight booking UI allowing users to input travel dates and select their preferred plane and seats (TIIDELab team project).',
			tags: ['React', 'Team Project', 'Booking UI'],
			url: null,
			github: null
		},
		{
			title: 'CBT Web App',
			desc: 'Full-stack SvelteKit application for educators to create, save, and administer quizzes and tests. Supports objective, short-answer, and essay question formats.',
			tags: ['SvelteKit', 'Education', 'Quiz Platform'],
			url: null,
			github: null
		},

	];
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
	<section class="flex min-h-screen flex-col justify-center px-6 pt-24 pb-16" style="max-width: 1200px; margin: 0 auto;">
		<p class="font-mono text-xs uppercase tracking-[0.08em]" style="color: var(--color-accent); margin-bottom: 1rem;">
			Full-Stack Web Developer
		</p>
		<h1
			class="font-mono font-light leading-[1.1] tracking-[-0.02em]"
			style="font-size: clamp(2.5rem, 8vw, 5rem); color: var(--color-fg); margin: 0 0 1.5rem 0;"
		>
			Gold Edem<br />Hogan
		</h1>
		<p class="max-w-2xl" style="font-size: 1.125rem; line-height: 1.6; color: var(--color-fg-secondary); margin: 0 0 2rem 0;">
			{p.summary}
		</p>
		<div class="flex flex-wrap gap-3">
			<a href="#projects">
				<span class="inline-block font-mono text-xs uppercase tracking-[0.08em] px-3 py-2 no-underline"
					style="background-color: var(--color-accent); color: var(--color-bg);"
				>View Work</span>
			</a>
			<a href="mailto:{p.email}">
				<span class="inline-block font-mono text-xs uppercase tracking-[0.08em] px-3 py-2 no-underline"
					style="border: 1px solid var(--color-border-strong); color: var(--color-accent);"
				>Contact Me</span>
			</a>
		</div>
	</section>

	<section id="skills" class="px-6 py-24" style="max-width: 1200px; margin: 0 auto;">
		<p class="font-mono text-xs uppercase tracking-[0.08em]" style="color: var(--color-accent-dim); margin-bottom: 0.5rem;">001</p>
		<h2 class="text-3xl font-medium mb-16" style="color: var(--color-fg);">Skills</h2>
		<div class="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
			{#each skills as s}
				<div>
					<h3 class="font-mono text-sm uppercase tracking-[0.08em] mb-4" style="color: var(--color-accent);">{s.cat}</h3>
					<div class="flex flex-wrap gap-2">
						{#each s.items as item}
							{#if typeof item === 'object'}
								<div class="font-mono text-xs px-2 py-1.5 min-w-[140px]" style="border: 1px solid var(--color-border); color: var(--color-fg-secondary);">
									<div class="font-medium" style="color: var(--color-fg);">{item.name}</div>
									<div class="flex items-center gap-1.5 mt-0.5" style="color: var(--color-fg-muted);">
										<span>{item.level}</span>
										<span>·</span>
										<span>{item.years}yr</span>
									</div>
								</div>
							{:else}
								<span class="font-mono text-xs px-2 py-1" style="border: 1px solid var(--color-border); color: var(--color-fg-secondary);">
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
		<p class="font-mono text-xs uppercase tracking-[0.08em]" style="color: var(--color-accent-dim); margin-bottom: 0.5rem;">002</p>
		<h2 class="text-3xl font-medium mb-16" style="color: var(--color-fg);">Projects</h2>
		<div class="grid gap-6 md:grid-cols-2">
			{#each projects as pr}
				<button
					class="group cursor-pointer text-left"
					style="background-color: var(--color-surface); border: 1px solid {active === pr.title ? 'var(--color-border-strong)' : 'var(--color-border)'}; padding: 1.5rem; transition: border-color 0.2s ease;"
					onclick={() => {
						if (pr.url) {
							activeIframe = pr.url;
							active = pr.title;
						}
					}}
					onmouseenter={(e) => {
						if (e.currentTarget) e.currentTarget.style.borderColor = 'var(--color-border-strong)';
					}}
					onmouseleave={(e) => {
						if (e.currentTarget && active !== pr.title) e.currentTarget.style.borderColor = 'var(--color-border)';
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
								onclick={(e) => e.stopPropagation()}
							>GitHub →</a>
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
		<p class="font-mono text-xs uppercase tracking-[0.08em]" style="color: var(--color-accent-dim); margin-bottom: 0.5rem;">003</p>
		<h2 class="text-3xl font-medium mb-12" style="color: var(--color-fg);">Contact</h2>
		<div class="grid gap-8 md:grid-cols-3">
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
	</section>
</main>

<footer class="px-6 py-8" style="border-top: 1px solid var(--color-border);">
	<p class="font-mono text-xs text-center" style="color: var(--color-fg-muted);">© {new Date().getFullYear()} Gold Edem Hogan</p>
</footer>

{#if activeIframe}
	<!-- svelte-ignore a11y_no_static_element_interactions a11y_interactive_supports_focus -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4"
		style="background-color: rgba(0, 0, 0, 0.85);"
		onclick={() => { activeIframe = null; active = null; }}
		onkeydown={(e) => { if (e.key === 'Escape') { activeIframe = null; active = null; } }}
		role="dialog"
	>
		<div
			class="relative flex h-full w-full flex-col"
			style="max-width: 1200px; max-height: 90vh; background-color: var(--color-bg); border: 1px solid var(--color-border);"
			onclick={(e) => e.stopPropagation()}
		>
			<div class="flex items-center justify-between px-4 py-3" style="border-bottom: 1px solid var(--color-border);">
				<a href={activeIframe} target="_blank" rel="noopener noreferrer" class="font-mono text-xs uppercase tracking-[0.08em] no-underline" style="color: var(--color-accent);">
					Open in new tab →
				</a>
				<button
					class="font-mono text-xs uppercase tracking-[0.08em] cursor-pointer"
					style="color: var(--color-fg-muted); background: none; border: none;"
					onclick={() => { activeIframe = null; active = null; }}
				>Close [Esc]</button>
			</div>
			<iframe src={activeIframe} class="h-full w-full" style="border: none;" title="Preview"></iframe>
		</div>
	</div>
{/if}
