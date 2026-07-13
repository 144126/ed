import { gsap } from 'gsap';
import { usesReducedMotion } from '$lib/motion';

export function magnetic(node: HTMLElement, strength = 0.3) {
	if (typeof window === 'undefined') return;
	if (window.matchMedia('(hover: none)').matches) return;
	if (usesReducedMotion()) return;

	const xTo = gsap.quickTo(node, 'x', { duration: 0.4, ease: 'power3' });
	const yTo = gsap.quickTo(node, 'y', { duration: 0.4, ease: 'power3' });

	const move = (e: PointerEvent) => {
		const r = node.getBoundingClientRect();
		xTo((e.clientX - (r.left + r.width / 2)) * strength);
		yTo((e.clientY - (r.top + r.height / 2)) * strength);
	};

	const leave = () => { xTo(0); yTo(0); };

	node.addEventListener('pointermove', move);
	node.addEventListener('pointerleave', leave);

	return {
		destroy() {
			node.removeEventListener('pointermove', move);
			node.removeEventListener('pointerleave', leave);
		}
	};
}
