export const p = {
	name: 'Gold Edem Hogan',
	title: 'graphic designer & web developer',
	email: '1440fl@gmail.com',
	phone: '+234 811 871 8106',
	whatsapp: 'https://wa.me/2348118718106',
	github: 'https://github.com/144126',
	org: 'https://github.com/angelwingscomms',
	location: 'Nigeria',
	summary:
		'Versatile full-stack developer experienced in SvelteKit, TypeScript, Python, and Rust. Builds scalable microservices, AI-driven applications with vector embeddings, and algorithmic trading systems (MQL5/ccxt). Proficient in end-to-end deployment utilizing AWS, Docker, and CI/CD pipelines to deliver high-performance cloud solutions.'
};

export const skills = [
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

export const projects = [
	{
		title: 'x2',
		desc: 'Real-time social app: a public board where posts carry your name or go anonymous, plus rooms and DMs with reactions, stickers, voice and video calls, push notifications, and streaming AI threads. Random voice match pairs strangers by interest using embeddings.',
		tags: ['SvelteKit', 'Cloudflare Workers', 'Durable Objects', 'WebRTC', 'Qdrant', 'AI SDK'],
		url: 'https://x2.apexlinks.org',
		github: 'https://github.com/144126/x2'
	},
	{
		title: 'BEEE Spectacular Chess Championship',
		desc: 'Tournament registration platform for Abuja 2026 inter-school chess championship. Team registration with Paystack payment processing, Qdrant vector DB backend, Cloudflare deployment, and Google Gemini AI chess coach.',
		tags: ['SvelteKit', 'Paystack', 'Qdrant', 'Cloudflare', 'Gemini AI'],
		url: 'https://beeeproject.com',
		github: 'https://github.com/angelwingscomms/beee'
	},
	{
		title: 'Chess AI Training App',
		desc: 'Chess training platform where users play against Stockfish with 10 difficulty presets, get AI coaching via Groq, receive interactive hints, and analyze positions. Google OAuth, token-based Paystack payments, Cloudflare Workers, Qdrant backend.',
		tags: ['SvelteKit', 'Stockfish', 'Groq AI', 'Paystack', 'Cloudflare', 'Qdrant'],
		url: 'https://e4.apexlinks.org',
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
		title: 'Report Card Management Webapp',
		desc: 'School management system backed by Qdrant and SvelteKit. Enables teachers to log student scores, auto-computes final pass/fail grades, and generates comprehensive PDF report cards.',
		tags: ['SvelteKit', 'Qdrant', 'PDF Generation', 'Education'],
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
