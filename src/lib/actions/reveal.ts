import { gsap, ScrollTrigger, usesReducedMotion } from '$lib/motion';

interface RevealOpts {
	y?: number;
	stagger?: number;
	selector?: string;
}

export function reveal(node: HTMLElement, opts: RevealOpts = {}) {
	if (usesReducedMotion()) {
		gsap.set(node, { opacity: 1, y: 0 });
		if (opts.selector) {
			node.querySelectorAll(opts.selector).forEach((el) => {
				(el as HTMLElement).style.opacity = '1';
				(el as HTMLElement).style.transform = 'none';
			});
		}
		return;
	}

	const { y = 40, stagger = 0, selector: rawSelector } = opts;
	const selector = rawSelector?.startsWith('>') ? `:scope ${rawSelector}` : rawSelector;

	let triggers: ScrollTrigger[] = [];

	if (selector) {
		const targets = Array.from(node.querySelectorAll(selector));
		if (targets.length) {
			triggers = ScrollTrigger.batch(targets, {
				start: 'top 85%',
				once: true,
				batchMax: 100,
				onEnter: (batch) => {
					gsap.fromTo(batch as HTMLElement[],
						{ y, opacity: 0 },
						{ y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger, overwrite: 'auto' }
					);
				}
			});
		}
	} else {
		const t = ScrollTrigger.create({
			trigger: node,
			start: 'top 85%',
			once: true,
			onEnter: () => {
				gsap.fromTo(node,
					{ y, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', overwrite: 'auto' }
				);
			}
		});
		triggers = [t];
	}

	return {
		destroy() {
			triggers.forEach((t) => t.kill());
		}
	};
}

export function counter(node: HTMLElement) {
	if (usesReducedMotion()) return;

	const raw = node.textContent?.trim() || '0';
	const target = parseInt(raw, 10);
	if (isNaN(target)) return;
	const digits = raw.length;

	node.textContent = '0'.repeat(digits);

	const trigger = ScrollTrigger.create({
		trigger: node,
		start: 'top 85%',
		once: true,
		onEnter: () => {
			const obj = { val: 0 };
			gsap.to(obj, {
				val: target,
				duration: 1.6,
				ease: 'power2.out',
				overwrite: 'auto',
				onUpdate: () => {
					const v = Math.round(obj.val);
					node.textContent = String(v).padStart(digits, '0');
				}
			});
		}
	});

	return {
		destroy() { trigger.kill(); }
	};
}

export function ruleDraw(node: HTMLElement) {
	if (usesReducedMotion()) {
		gsap.set(node, { scaleX: 1 });
		return;
	}

	gsap.set(node, { scaleX: 0, transformOrigin: 'left' });

	const trigger = ScrollTrigger.create({
		trigger: node,
		start: 'top 85%',
		once: true,
		onEnter: () => {
			gsap.to(node, { scaleX: 1, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
		}
	});

	return {
		destroy() { trigger.kill(); }
	};
}

export function proficiencyBar(node: HTMLElement) {
	if (usesReducedMotion()) {
		gsap.set(node, { scaleX: 1 });
		return;
	}
	gsap.set(node, { scaleX: 0, transformOrigin: 'left' });
	const trigger = ScrollTrigger.create({
		trigger: node.parentElement || node,
		start: 'top 90%',
		once: true,
		onEnter: () => {
			gsap.to(node, { scaleX: 1, duration: 1, ease: 'power3.out', overwrite: 'auto' });
		}
	});
	return { destroy() { trigger.kill(); } };
}
