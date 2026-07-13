import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

let registered = false;
export function registerGsap() {
	if (registered) return;
	gsap.registerPlugin(ScrollTrigger, SplitText);
	registered = true;
}

// Register eagerly so actions (counter, ruleDraw, reveal) can use ScrollTrigger
// during component initialization, before layout's $effect runs.
if (typeof document !== 'undefined') registerGsap();

export function usesReducedMotion(): boolean {
	if (typeof window === 'undefined') return true;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export { gsap, ScrollTrigger, SplitText };
