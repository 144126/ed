# awwwards-plan.md — Portfolio "Blow-Their-Minds" Build Plan

> **Target:** an Awwwards / FWA-caliber personal portfolio for Gold Edem Hogan.
> **Repo:** `~/i/ed` (SvelteKit 5 + Svelte 5 runes + Tailwind 4 + Cloudflare Workers, pnpm, dev port 9270).
> **Design identity (KEEP):** dark-first monospace brutalist minimalism. Colors: gold `#d4a047`, green `#22c55e`, navy-black `#0a0e17` / `#0f1a2e`. **No decorative gradients. No box-shadows. Sharp 0px radius.** All "wow" comes from **motion + one WebGL light moment**, not color candy.
> **Conversion goal:** the site must make a hiring manager think "I need this person" in 5 seconds — clear value prop, live project proof, one obvious "Available for work / Email me" action.

---

## 0. HOW TO USE THIS PLAN (read first — for the implementing model)

**Rules of engagement — do not violate these:**

1. **Work one Phase at a time, in order.** After each Phase: run `pnpm check` (must pass) and `pnpm dev` (open http://localhost:9270, confirm no console errors, no SSR crash). Only then move on.
2. **SSR SAFETY (critical — Cloudflare Workers renders on the server):** Never touch `window`, `document`, `navigator`, `localStorage`, or any DOM API at the top level of a module or in component markup. Browser code goes **only inside `$effect(() => { ... })`** (Svelte 5 effects run **only in the browser**, never during SSR) or inside `onMount`. Importing GSAP/Lenis at the top of a `<script>` is fine; *calling* `new Lenis()` or `gsap.to(document...)` must be inside `$effect`/`onMount`.
3. **Always return cleanup.** Every `$effect` that adds a listener, starts a `requestAnimationFrame` loop, creates a Lenis/GSAP instance, or a ScrollTrigger MUST return a cleanup function that removes/kills it. Memory leaks and duplicate triggers are an automatic fail.
4. **`prefers-reduced-motion` is mandatory.** Every animation must have a reduced-motion path where the element simply appears in its final state (no transform/opacity animation). Use the `usesReducedMotion()` helper from Phase 0. Never ship an effect without this.
5. **Keep existing content.** Do NOT delete the project data, skills data, or contact info already in `src/routes/+page.svelte`. You are re-skinning and animating around that real content. The `projects`, `skills`, and `p` objects are the source of truth — move them to `src/lib/data.ts` (Phase 1) but keep every field.
6. **Use the existing design tokens.** Colors come from `--color-*` CSS variables already defined in `src/routes/layout.css`. Tailwind 4 exposes them as utilities: `text-accent`, `bg-accent`, `border-accent`, `text-green`, `bg-surface`, etc. Do not hardcode hex values in components; use the tokens/utilities.
7. **Performance budget:** Lighthouse Performance ≥ 90 on desktop, ≥ 75 on mobile. No layout shift (CLS < 0.05). Animate only `transform` and `opacity` (GPU-cheap). Never animate `width`, `height`, `top`, `left`, `margin`, or `filter` in scroll loops.
8. **Definition of Done per Phase** is listed at the end of each Phase. Do not claim a Phase complete until every checkbox is verifiably true in the running app.

**Mental model of the finished site (single long page, anchored sections):**

```
[Preloader boot sequence]  →  fades to reveal:
┌───────────────────────────────────────────────┐
│ Custom cursor (global) + reactive dot-grid bg  │  ← always on
├───────────────────────────────────────────────┤
│ 00  HERO      kinetic name, tagline, magnetic  │
│               CTAs, scroll cue, WebGL light     │
│ ——  MARQUEE   infinite tech ticker (2 rows)     │
│ 01  ABOUT     summary reveal + live counters    │
│ 02  WORK      sticky-stacking project cards +   │  ← the signature section
│               spotlight hover + upgraded modal  │
│ 03  STACK     skills grid, staggered + tilt     │
│ 04  CONTACT   giant kinetic CTA, Lagos clock,   │
│               "available" pulse, magnetic email │
│ [Footer]      © + status                        │
└───────────────────────────────────────────────┘
```

---

## 1. TECH ADDITIONS & EXACT SETUP  (Phase 0)

### 1.1 Install dependencies

From `~/i/ed`:

```sh
pnpm add gsap lenis
pnpm add @fontsource/geist-mono @fontsource/geist-sans
```

- `gsap` (^3.13) — animation engine. As of 2025 **all GSAP plugins including ScrollTrigger and SplitText are free**; import them from `gsap/ScrollTrigger` and `gsap/SplitText`.
- `lenis` (^1.1) — smooth scroll, drives ScrollTrigger.
- `@fontsource/geist-mono` — the display/mono font the DESIGN.md asks for (currently only a fallback stack is loaded). `@fontsource/geist-sans` optionally replaces Inter; keep Inter if you prefer, but load Geist Mono regardless.

> Optional (Phase 9 only, do NOT install unless you reach it): `pnpm add three`.

### 1.2 Wire the fonts

In `src/routes/+layout.svelte`, at the top of `<script>`, add:

```ts
import '@fontsource-variable/geist-mono';   // if variable pkg unavailable, use '@fontsource/geist-mono/400.css' + '/300.css'
import '@fontsource-variable/geist-sans';    // optional
```

Then in `src/routes/layout.css` update the font tokens:

```css
--font-mono: 'Geist Mono Variable', 'Geist Mono', ui-monospace, SFMono-Regular, 'Roboto Mono', monospace;
--font-sans: 'Inter', 'Geist Sans Variable', system-ui, sans-serif;
```

Remove the Google Fonts `<link>` for Inter from `src/app.html` **only if** you switch fully to Fontsource; otherwise leave it. Keep `<meta name="viewport">`.

### 1.3 Create the motion utility — `src/lib/motion.ts`

This centralizes GSAP registration, the reduced-motion check, and the Lenis↔ScrollTrigger bridge so every component uses the same instance.

```ts
// src/lib/motion.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;
export function registerGsap() {
	if (registered) return;
	gsap.registerPlugin(ScrollTrigger);
	registered = true;
}

export function usesReducedMotion(): boolean {
	if (typeof window === 'undefined') return true; // treat SSR as reduced (no anim)
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export { gsap, ScrollTrigger };
```

### 1.4 Global smooth-scroll + ScrollTrigger bridge (in `+layout.svelte`)

Add this INSIDE the `<script>` of `src/routes/+layout.svelte` (it runs client-only because it's in `$effect`):

```ts
import Lenis from 'lenis';
import { registerGsap, gsap, ScrollTrigger, usesReducedMotion } from '$lib/motion';

$effect(() => {
	registerGsap();
	if (usesReducedMotion()) return; // no smooth scroll for reduced-motion users

	const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
	lenis.on('scroll', ScrollTrigger.update);
	const raf = (time: number) => lenis.raf(time * 1000);
	gsap.ticker.add(raf);
	gsap.ticker.lagSmoothing(0);

	// expose for anchor links
	(window as any).__lenis = lenis;

	return () => {
		gsap.ticker.remove(raf);
		lenis.destroy();
		ScrollTrigger.getAll().forEach((t) => t.kill());
	};
});
```

Anchor navigation (nav links `#projects` etc.) must use Lenis so smooth scroll works. Add a helper in the nav click handler:

```ts
function scrollTo(hash: string) {
	const lenis = (window as any).__lenis;
	if (lenis) lenis.scrollTo(hash, { offset: -80 });
	else document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
}
```

### 1.5 Global CSS additions (`src/routes/layout.css`)

Append to the `@layer base` block:

```css
html { scrollbar-width: none; }
html::-webkit-scrollbar { display: none; }
body { cursor: none; }               /* custom cursor replaces it (desktop only, see Phase 3) */
@media (hover: none) { body { cursor: auto; } }  /* touch devices keep native */

/* reveal primitive: elements start hidden, JS adds .is-in */
[data-reveal] { will-change: transform, opacity; }
@media (prefers-reduced-motion: reduce) {
	[data-reveal] { opacity: 1 !important; transform: none !important; }
	body { cursor: auto; }
}

/* thin technical grid tokens */
--grid-line: rgba(212, 160, 71, 0.06);
```

**Phase 0 — Definition of Done:**
- [ ] `pnpm check` passes, `pnpm dev` runs with zero console errors.
- [ ] Geist Mono renders (inspect the hero `<h1>` computed font-family).
- [ ] Page scroll feels smooth (Lenis active); reduced-motion users get instant native scroll.
- [ ] No SSR error in the terminal running `pnpm dev` (Cloudflare/Vite server logs clean).

---

## 2. GLOBAL LAYER — cursor + reactive dot-grid  (Phase 1)

These two run site-wide, mounted once in `+layout.svelte`, above `{@render children()}`.

### 2.1 Move data out — `src/lib/data.ts`
Cut the `p`, `skills`, and `projects` objects from `+page.svelte` into `src/lib/data.ts` and `export` them. Import them back into `+page.svelte`. **Preserve every field exactly.** This lets sections import shared data.

### 2.2 Custom cursor — `src/lib/components/Cursor.svelte`

A gold ring + dot that trails the pointer, **inverts/scales on interactive elements**, and grows into a label on project cards. Desktop only.

Spec:
- Two elements: outer ring (28px, `1px solid var(--color-accent)`, mix-blend-mode: difference), inner dot (5px, `bg-accent`).
- Ring lerps toward the pointer at ~0.15 easing via `requestAnimationFrame`; dot is 1:1 (instant).
- On `pointerenter` of any `a, button, [data-cursor]`: ring scales to 2.2×, dot hides. On leave: reset.
- If a hovered element has `data-cursor="text"` (project cards), show its `data-cursor-label` text inside the ring (e.g. "VIEW").
- Guard everything in `$effect`; skip entirely if `matchMedia('(hover: none)')` matches or reduced-motion. Return cleanup removing all listeners + `cancelAnimationFrame`.

Implementation skeleton (copy, then wire the label logic):

```svelte
<script lang="ts">
	let ring: HTMLDivElement, dot: HTMLDivElement;
	$effect(() => {
		if (window.matchMedia('(hover: none)').matches) return;
		let rx = innerWidth / 2, ry = innerHeight / 2, mx = rx, my = ry, id = 0;
		const move = (e: PointerEvent) => { mx = e.clientX; my = e.clientY;
			dot.style.transform = `translate(${mx}px,${my}px)`; };
		const loop = () => { rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
			ring.style.transform = `translate(${rx}px,${ry}px)`; id = requestAnimationFrame(loop); };
		const over = (e: Event) => { const t = (e.target as HTMLElement).closest('a,button,[data-cursor]');
			ring.classList.toggle('is-active', !!t); };
		window.addEventListener('pointermove', move);
		document.addEventListener('pointerover', over);
		loop();
		return () => { cancelAnimationFrame(id);
			window.removeEventListener('pointermove', move);
			document.removeEventListener('pointerover', over); };
	});
</script>

<div bind:this={ring} class="cursor-ring"></div>
<div bind:this={dot} class="cursor-dot"></div>

<style>
	.cursor-ring, .cursor-dot { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
		margin-left: -14px; margin-top: -14px; }
	.cursor-ring { width: 28px; height: 28px; border: 1px solid var(--color-accent);
		border-radius: 50%; mix-blend-mode: difference; transition: width .2s, height .2s, background-color .2s; }
	.cursor-ring.is-active { width: 60px; height: 60px; margin-left: -30px; margin-top: -30px;
		background-color: rgba(212,160,71,0.1); }
	.cursor-dot { width: 5px; height: 5px; margin-left: -2.5px; margin-top: -2.5px;
		background: var(--color-accent); border-radius: 50%; }
	@media (hover: none), (prefers-reduced-motion: reduce) { .cursor-ring, .cursor-dot { display: none; } }
</style>
```

### 2.3 Reactive dot-grid background — `src/lib/components/DotGrid.svelte`

The signature ambient effect. A full-viewport `<canvas>`, fixed behind all content (`z-index: -1`), drawing a grid of small gold dots on the navy background. Dots near the cursor **brighten and nudge outward** (a soft ripple), producing a "living technical surface" without any gradient. Pure Canvas 2D — no WebGL, no library, safe for any model.

Exact spec:
- Fixed, `inset: 0`, `z-index: -1`, `pointer-events: none`. Handle devicePixelRatio for crispness.
- Grid spacing 34px. Base dot radius 1px, base color `rgba(212,160,71,0.18)`.
- Track pointer (throttle via rAF). For each dot, `d = distance(dot, pointer)`; if `d < 140`: `alpha = 0.18 + (1 - d/140) * 0.6`, `radius = 1 + (1 - d/140) * 1.6`, and offset the dot away from the cursor by `(1 - d/140) * 6px`.
- Single `requestAnimationFrame` loop; recompute on `resize` (debounced). Cleanup cancels rAF + removes listeners.
- **Reduced-motion / touch:** render one static frame of the plain grid (no pointer reaction, no loop).

Mount both in `+layout.svelte`:

```svelte
<DotGrid />
<Cursor />
{@render children()}
```

**Phase 1 — Definition of Done:**
- [ ] Moving the mouse lights up nearby dots and gently pushes them; effect is smooth (60fps, no jank).
- [ ] Custom cursor tracks pointer, ring lags smoothly, grows over links/buttons.
- [ ] Touch devices and reduced-motion users see a static grid + native cursor, no errors.
- [ ] `projects`/`skills`/`p` now imported from `$lib/data.ts`; page still renders identical content.

---

## 3. PRELOADER — terminal boot sequence  (Phase 2)

On-brand for the monospace/technical identity and a classic Awwwards opener. `src/lib/components/Preloader.svelte`, mounted at the very top of `+layout.svelte` (renders above everything, `position: fixed; inset:0; z-index:10000; background: var(--color-bg)`).

Behavior:
1. Center: a monospace "terminal" that types lines quickly (~18ms/char), e.g.:
   ```
   > initializing ed.portfolio
   > loading stack ................ svelte · rust · ai
   > compiling shaders ............ ok
   > deploy target ............... cloudflare edge
   > ready_
   ```
2. A thin gold progress bar (0→100%) beneath, tied to real readiness: resolve when `document.fonts.ready` AND `window` `load` have fired (or a 1600ms max cap, whichever first — never trap the user).
3. On complete: GSAP timeline — bar fills, text collapses to a single line, whole overlay **wipes upward** using `clip-path: inset(0 0 100% 0)` over 0.7s `expo.inOut`, revealing the hero. Simultaneously trigger the hero intro (Phase 4) via a shared store or a custom event `window.dispatchEvent(new Event('preloader:done'))`.
4. **Show the preloader only once per session:** set `sessionStorage.setItem('booted','1')`; if present on mount, skip straight to revealed state (no animation). Guard `sessionStorage` inside `$effect`.
5. **Reduced motion:** no typing, no wipe — show a static "ed" wordmark for 400ms then remove, or skip entirely.

State bridge: create `src/lib/state.svelte.ts` exporting `export const intro = $state({ ready: false });`. Preloader sets `intro.ready = true` on done; hero starts its timeline in an `$effect` watching `intro.ready`.

**Phase 2 — DoD:**
- [ ] First load shows the typing boot + progress, then a clean upward wipe into the hero.
- [ ] Second navigation within the session skips the preloader.
- [ ] Never blocks longer than ~1.6s even on slow fonts; reduced-motion path is instant.

---

## 4. HERO — kinetic type + magnetic CTAs + WebGL light  (Phase 3)

The 5-second impression. Replace the current static hero markup with an animated one. Keep the copy from `p` (name "Gold Edem Hogan", role "Full-Stack Web Developer", summary).

### 4.1 Layout
- Full `min-h-screen`, content max-width 1200px, left-aligned (as now).
- Eyebrow: mono, gold, uppercase `Full-Stack Developer — Nigeria` + a small pulsing green dot + `AVAILABLE FOR WORK` (this is the conversion hook — put it here, top of hero).
- H1: name, `font-mono font-light`, `clamp(2.5rem, 9vw, 6rem)`, two lines "Gold Edem / Hogan".
- Sub: rotating role line (see 4.3).
- Summary paragraph (`p.summary`), muted.
- Two CTAs: **primary** `bg-accent text-bg` "View Work ↓" (scrolls to #work); **ghost** bordered "Email Me" (mailto). Both magnetic (4.4).
- Bottom scroll cue: a thin vertical line that draws down + "SCROLL" mono label, looping.

### 4.2 Entrance animation (on `intro.ready`)
Use GSAP SplitText to split the H1 into chars. Timeline (`gsap.timeline()`), reduced-motion → set all to final state instantly:
- Eyebrow: `y: 20 → 0, opacity 0 → 1`, 0.6s `power3.out`.
- H1 chars: `yPercent: 120 → 0` from a clipped mask (`overflow: hidden` on each line wrapper), `stagger: 0.035`, `duration: 0.9`, `ease: expo.out`.
- Sub + summary + CTAs: `y: 24 → 0, opacity`, stagger 0.08, starting at `-=0.4` overlap.
- Scroll cue fades in last.

```ts
import { SplitText } from 'gsap/SplitText';
// registerGsap should also register SplitText: gsap.registerPlugin(ScrollTrigger, SplitText)
$effect(() => {
	if (!intro.ready) return;
	if (usesReducedMotion()) { gsap.set('[data-hero]', { opacity: 1, y: 0 }); return; }
	const split = new SplitText(h1, { type: 'chars' });
	const tl = gsap.timeline();
	tl.from(eyebrow, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' })
	  .from(split.chars, { yPercent: 120, opacity: 0, stagger: 0.035, duration: 0.9, ease: 'expo.out' }, '-=0.2')
	  .from('[data-hero-item]', { y: 24, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out' }, '-=0.4');
	return () => { tl.kill(); split.revert(); };
});
```
> If `SplitText` import fails for any reason, fall back to the manual splitter in Appendix A.

### 4.3 Rotating role line
Cycle through `['SvelteKit Architect','Rust + WASM','AI / Vector Search','Algorithmic Trading','Cloud & Edge']` with a mono "typewriter" (type → hold 1.6s → backspace → next). Pure `setInterval`/timeout logic inside `$effect` with cleanup. Reduced motion → show the first item statically.

### 4.4 Magnetic buttons — reusable action `src/lib/actions/magnetic.ts`
A Svelte action: on `pointermove` within the element's bounds + a padding, translate the element toward the cursor by `(dx, dy) * 0.3` via GSAP `quickTo`; on leave, elastic back to 0. Apply with `use:magnetic`. Disable on touch/reduced-motion.

```ts
export function magnetic(node: HTMLElement, strength = 0.3) {
	if (window.matchMedia('(hover: none)').matches) return;
	const xTo = gsap.quickTo(node, 'x', { duration: 0.4, ease: 'power3' });
	const yTo = gsap.quickTo(node, 'y', { duration: 0.4, ease: 'power3' });
	const move = (e: PointerEvent) => { const r = node.getBoundingClientRect();
		xTo((e.clientX - (r.left + r.width/2)) * strength);
		yTo((e.clientY - (r.top + r.height/2)) * strength); };
	const leave = () => { xTo(0); yTo(0); };
	node.addEventListener('pointermove', move);
	node.addEventListener('pointerleave', leave);
	return { destroy() { node.removeEventListener('pointermove', move); node.removeEventListener('pointerleave', leave); } };
}
```

### 4.5 WebGL light moment (the ONE gradient-free "wow", still Canvas-safe)
Behind the hero text only, add a subtle **cursor-following radial light** rendered on its own small canvas (a soft gold glow, `mix-blend-mode: screen`, opacity ~0.12) that lerps toward the pointer. This reads as a light source, not a decorative gradient, and stays within the design language. It layers over the DotGrid. Reduced motion → omit. (True Three.js shader is Phase 9, optional.)

**Phase 3 — DoD:**
- [ ] On first paint the hero name reveals with a masked char stagger; feels premium, not janky.
- [ ] Role line types/rotates; "AVAILABLE FOR WORK" with pulsing green dot is visible above the fold.
- [ ] Both CTAs are magnetic and scroll/route correctly.
- [ ] Reduced-motion shows a clean static hero with all content.

---

## 5. SCROLL REVEAL SYSTEM + TECH MARQUEE  (Phase 4)

### 5.1 Reveal action — `src/lib/actions/reveal.ts`
A Svelte action `use:reveal` that registers a ScrollTrigger: when the element enters at `start: 'top 85%'`, animate `from { y: 40, opacity: 0 }` to natural, `duration 0.9, ease: power3.out`. Support `use:reveal={{ y, stagger, selector }}` — if `selector` given, animate its children with `stagger` (for grids). Reduced motion → set final state, no trigger. Always `return { destroy }` that kills the trigger.

Apply `use:reveal` to: section headers, about paragraph, each stat, each project card, each skill group, contact block.

### 5.2 Section index headers
Each section keeps its numeric label (`00`,`01`,`02`,`03`,`04`) in gold mono, but animate the number: it counts up from `00` to its value when scrolled into view, and a thin gold rule draws across (`scaleX: 0 → 1`, `transform-origin: left`). Reinforces the technical identity.

### 5.3 Infinite tech marquee — `src/lib/components/Marquee.svelte`
Between hero and about: two rows of large mono tech names scrolling in **opposite directions**, seamless loop. Row content from the skill keywords (SvelteKit · Rust · TypeScript · Python · Qdrant · ONNX · ccxt · Cloudflare · WASM · MQL5 · …).
- Implement with GSAP: duplicate the row content twice, animate `xPercent: 0 → -50` linearly, `repeat: -1`, `duration: 20`, `ease: 'none'`. Second row `-50 → 0`.
- **Scroll-velocity coupling (optional flourish):** on Lenis scroll, add to the marquee's timeScale based on scroll speed, easing back to 1 — makes it feel physical.
- Pause on hover. Reduced motion → static single row.
- Style: `font-mono`, `clamp(2rem, 6vw, 4rem)`, `color: var(--color-fg)` with every other item `color: var(--color-accent)`; thin gold top/bottom borders.

**Phase 4 — DoD:**
- [ ] Every section animates in on scroll exactly once, smoothly, and is instant under reduced motion.
- [ ] Section numbers count up + rule draws.
- [ ] Marquee loops seamlessly (no visible jump), reverses per row, pauses on hover.

---

## 6. ABOUT + LIVE COUNTERS  (Phase 5)

Section `01`. A tight, confident bio built from `p.summary`, plus a **stat strip** that counts up on reveal:

| Value | Label | Source |
|-------|-------|--------|
| 6+ | YEARS SVELTEKIT | resume |
| 11 | PROJECTS SHIPPED | `projects.length` |
| 4 | LIVE DEPLOYMENTS | count of projects with `url` |
| ∞ | COFFEE / DAY | personality |

- Counter: GSAP `to({ v: 0 }, { v: target, duration: 1.6, ease: 'power2.out', onUpdate })`, triggered by `use:reveal`. Non-numeric (`∞`, `+`) appended as static suffix.
- Layout: mono numerals `clamp(2.5rem,6vw,4rem)` gold, label small muted uppercase. 4-up on desktop, 2-up mobile, separated by thin gold vertical rules.
- Add one line that positions him for hire: e.g. *"I ship production systems end-to-end — from Rust/WASM cores and vector search to Paystack checkout on the Cloudflare edge."*

**Phase 5 — DoD:** counters animate once on entry; numbers match real data; reduced-motion shows final numbers immediately.

---

## 7. WORK — the signature section  (Phase 6)

Section `02`. This is what wins the award and the client. Use **sticky-stacking cards with a spotlight hover**, keeping the existing iframe preview modal (upgraded).

### 7.1 Featured vs. grid
Split `projects` into:
- **Featured (first 4):** ApexLinks, Chess AI Training App, BEEE Chess Championship, MT5 Neural Network EAs — full-width "case" rows.
- **The rest:** compact grid below.

### 7.2 Sticky-stacking featured rows
Each featured project is a `min-h-[80vh]` row. As you scroll, the current card is **pinned** (`ScrollTrigger` `pin: true`) briefly while the next card slides up over it, creating a deck-of-cards stack. Each card:
- Left: big index (`/01`), title (mono, `clamp(1.8rem,4vw,3rem)`), description, tag chips (reuse existing chip style), and links (`Live ↗` / `GitHub ↗`), plus a `LIVE` badge (green) when `url` exists.
- Right: a **preview frame**. Default state = a static, dithered/monochrome placeholder card (gold border, project title in mono, subtle animated scanline). On hover of the card (`data-cursor="text"` `data-cursor-label="VIEW"`): the cursor grows to "VIEW", and clicking opens the existing iframe modal for that `url`.
- On reveal: title chars mask-up (SplitText), meta items stagger in.
- Parallax: the right preview translates `y` slightly slower than scroll (`yPercent` via ScrollTrigger `scrub: true`) for depth.

> **Fallback if pinning is too hard for the model:** skip `pin`. Instead make each featured row a normal block with a strong `use:reveal` (title mask-up + preview `scale 1.05→1` + border draw). Still looks excellent. Ship the fallback rather than a broken pin.

### 7.3 Spotlight hover on the grid cards
For the compact grid (remaining projects), keep the existing `<button>` cards but add: on `pointermove`, a radial gold "spotlight" follows the cursor **within** the card via a CSS variable (`--mx`,`--my`) driving a `radial-gradient` mask at very low opacity on a pseudo-element — *this is the one place a faint radial is allowed, because it's an interactive light, not decorative color.* Border brightens to `--color-border-strong` on hover (already implemented). Card lifts via `translateY(-4px)` (transform only).

### 7.4 Upgrade the modal
Keep the current iframe modal logic (Escape to close, click-outside, "Open in new tab"). Add: open with GSAP (`scale 0.94→1`, `opacity`, backdrop `blur(0)→blur(8px)` over 0.4s), a mono loading line "> loading {url} …" until iframe `load`, and close with the reverse. Trap focus for a11y. Keep `activeIframe`/`active` state.

**Phase 6 — DoD:**
- [ ] Featured projects present as an animated stacking (or high-quality reveal fallback) sequence; real data, real links.
- [ ] Hover shows "VIEW" cursor + spotlight; click opens the upgraded modal; Escape/outside closes it.
- [ ] `LIVE` badges only on projects with a `url`. No console errors from ScrollTrigger pinning (or fallback used).
- [ ] Fully keyboard-navigable; reduced motion disables pin/parallax but keeps all content and the modal.

---

## 8. STACK (skills) — staggered grid + tilt  (Phase 7)

Section `03`. Reuse the `skills` data and current category layout, but:
- Categories reveal with `use:reveal` stagger (each chip `y:20,opacity:0 → in`, stagger 0.03).
- Chips get a subtle **magnetic/tilt** on hover (reuse `magnetic` action at low strength 0.15, or a CSS `rotate` on pointer position). Border to gold on hover.
- The "Core Expertise" items (with level + years) render as larger cards with a thin **proficiency bar** that animates its `scaleX` to represent years (SvelteKit 6yr = full, etc.) on reveal — mono labels, gold bar, no gradient.
- Optional advanced (skip if unsure): an interactive constellation/orbit of tech tags using the same DotGrid canvas approach. Not required.

**Phase 7 — DoD:** skills reveal in a staggered cascade; core-skill bars animate once; hover interactions feel intentional; reduced motion shows a clean static grid.

---

## 9. CONTACT + FOOTER  (Phase 8)

Section `04` — the conversion close. Make it big and confident.
- Giant kinetic headline, mono, `clamp(3rem,12vw,9rem)`: **"LET'S BUILD"** with chars mask-revealing on scroll; second line smaller "SOMETHING FAST." Gold.
- Primary magnetic CTA: `Email me → 1440fl@gmail.com` (mailto), plus GitHub (`144126`) and org links, each with the hover-underline-draw effect (a gold line scaling in from left).
- A live **Lagos clock** (mono, updates every second via `$effect` + `setInterval`, `Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Lagos',hour:'2-digit',minute:'2-digit',second:'2-digit'})`) with a pulsing green dot + `AVAILABLE FOR WORK · WAT`. Reinforces "reachable, working now."
- Keep the existing email/location/github grid as secondary detail.
- Footer: `© {year} Gold Edem Hogan` + `Built with SvelteKit on the edge` + a tiny "back to top" that Lenis-scrolls to hero.

**Phase 8 — DoD:** headline reveals on scroll; clock ticks in Lagos time; all links work; magnetic email CTA is the clear focal action; reduced motion static.

---

## 10. OPTIONAL — Three.js shader hero  (Phase 9, do last or skip)

Only attempt after Phases 0–8 ship and pass. Upgrade the hero's WebGL light (4.5) to a real fragment-shader field: a slow-moving **dithered/plasma gold noise** on navy, responding to pointer, `mix-blend-mode: screen`, low opacity, behind the text.
- `pnpm add three`. Mount a `<canvas>`; create `WebGLRenderer` (`alpha:true, antialias:true`), an orthographic full-screen quad, a `ShaderMaterial` with uniforms `uTime`, `uMouse`, `uRes`.
- Fragment shader: value-noise (or simplgnoise) → `step`/`floor` dither into a gold ramp between `#0a0e17` and `#d4a047`, kept very dark. Keep it subtle (this must not turn into a gradient wallpaper — it's a texture).
- **Hard requirement:** wrap in `$effect`, guard `WebGLRenderingContext` support, dispose geometry/material/renderer on cleanup, cap DPR at 1.5, pause `rAF` when tab hidden (`visibilitychange`) and when the hero scrolls out of view (ScrollTrigger). Reduced motion / no-WebGL → fall back to the Canvas glow from 4.5.

**Phase 9 — DoD:** shader renders subtly, disposes cleanly on unmount, never drops the page below the perf budget, and degrades gracefully.

---

## 11. PERFORMANCE, ACCESSIBILITY, QA, DEPLOY  (Phase 10 — required)

**Performance:**
- [ ] Only `transform`/`opacity` animated in scroll loops. No `filter`/layout props in scrubbed timelines.
- [ ] Canvas loops cancel on unmount and pause when tab hidden.
- [ ] `will-change` only on currently-animating elements; remove after.
- [ ] Fonts `display: swap`; preconnect kept. No CLS from late fonts (size-adjust via Fontsource is fine).
- [ ] Lighthouse (desktop) Perf ≥ 90, Best-Practices ≥ 95, SEO ≥ 95.

**Accessibility:**
- [ ] Every animation respects `prefers-reduced-motion` (spot-check by toggling OS setting).
- [ ] All interactive elements reachable by keyboard; visible focus states (gold outline). Modal traps focus + restores it on close.
- [ ] Color contrast: body text `--color-fg` on `--color-bg` passes AA (it does at ~15:1). Muted text used only for non-essential meta.
- [ ] Custom cursor never hides real focus; native cursor returns for touch/reduced-motion.
- [ ] Images/iframes have titles/alt; `<canvas>` is `aria-hidden="true"`.

**SEO / meta (do this — it helps get found):**
- [ ] `<title>Gold Edem Hogan — Full-Stack Developer (SvelteKit · Rust · AI)</title>`, meta description from `p.summary`.
- [ ] Open Graph + Twitter card tags in `app.html` or `+layout.svelte` `<svelte:head>`; generate a static `static/og.png` (dark, gold name, tagline).
- [ ] JSON-LD `Person` schema (name, jobTitle, url, sameAs: github links).
- [ ] `static/robots.txt` (exists) allows all; add a `sitemap`.

**Cross-browser / device QA matrix:**
- [ ] Chrome, Firefox, Safari (desktop) + iOS Safari + Android Chrome.
- [ ] Verify: preloader once/session, smooth scroll, all reveals fire once, marquee seamless, modal, clock, magnetic buttons (desktop), static fallbacks (mobile/reduced-motion).
- [ ] `pnpm check` clean; `pnpm build` succeeds (Cloudflare adapter); `pnpm preview` runs the worker locally with no errors.

**Deploy:** `pnpm build` then `wrangler deploy` (config in `wrangler.jsonc`). Confirm the live URL renders identically to local, including fonts and no SSR errors in Worker logs.

---

## 12. BUILD ORDER (checklist)

- [ ] Phase 0 — deps, fonts, motion util, Lenis/GSAP bridge, global CSS
- [ ] Phase 1 — data.ts, Cursor, DotGrid
- [ ] Phase 2 — Preloader boot sequence
- [ ] Phase 3 — Hero: kinetic type, role rotator, magnetic CTAs, canvas light
- [ ] Phase 4 — reveal action, section-number counters, tech Marquee
- [ ] Phase 5 — About + live counters
- [ ] Phase 6 — Work: stacking/reveal featured + spotlight grid + upgraded modal
- [ ] Phase 7 — Stack: staggered grid + proficiency bars
- [ ] Phase 8 — Contact: kinetic CTA + Lagos clock + footer
- [ ] Phase 9 — (optional) Three.js shader hero
- [ ] Phase 10 — perf, a11y, SEO, QA, deploy

---

## Appendix A — manual char splitter (fallback if GSAP SplitText unavailable)

```ts
export function splitChars(el: HTMLElement) {
	const text = el.textContent ?? '';
	el.textContent = '';
	const spans: HTMLElement[] = [];
	for (const ch of text) {
		const wrap = document.createElement('span');
		wrap.style.display = 'inline-block';
		wrap.style.overflow = 'hidden';
		const inner = document.createElement('span');
		inner.style.display = 'inline-block';
		inner.textContent = ch === ' ' ? ' ' : ch;
		wrap.appendChild(inner);
		el.appendChild(wrap);
		spans.push(inner);
	}
	return spans; // animate these with gsap.from(spans, { yPercent: 120, ... })
}
```

## Appendix B — canonical eases & timings (use these, be consistent)
- Entrances: `power3.out` / `expo.out`, 0.7–0.9s.
- Char staggers: 0.03–0.045.
- Magnetic: `power3`, 0.4s, strength 0.3 (buttons) / 0.15 (chips).
- Scrubbed parallax: `ease: 'none'`, `scrub: true`.
- Reveal trigger: `start: 'top 85%'`, `once: true`.
- Never exceed ~1.6s for any blocking/intro animation.

## Appendix C — design guardrails (do not break the identity)
- Colors only from `--color-*` tokens. Gold is THE accent; green = status/live only.
- **No decorative gradients.** The only radials allowed are interactive *light* effects (hero cursor glow, card spotlight) at ≤0.15 opacity.
- No box-shadows. Depth = borders + motion + contrast.
- Radius 0 (4px max for secondary). Mono for display/labels, Inter for body.
- If a choice isn't specified here, prefer *less* motion and *more* precision — restraint is the aesthetic.
