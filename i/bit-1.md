# Bit 1 — Phase 0: Deps, Fonts, Motion Util, Lenis/GSAP Bridge, Global CSS

## What
Install GSAP + Lenis + Geist Mono font, create the shared motion utility, set up smooth scroll with Lenis + ScrollTrigger bridge in layout, and add global CSS.

## Steps

1. **Install deps**
   - `pnpm add gsap lenis`
   - `pnpm add @fontsource/geist-mono @fontsource/geist-sans`

2. **Wire fonts**
   - In `src/routes/+layout.svelte`, import `@fontsource/geist-mono` and `@fontsource/geist-sans` at top of `<script>`
   - In `src/routes/layout.css`, update `--font-mono` to `'Geist Mono Variable', 'Geist Mono', ...` and `--font-sans` to `'Inter', 'Geist Sans Variable', ...`

3. **Create `src/lib/motion.ts`**
   - Export `registerGsap()` — calls `gsap.registerPlugin(ScrollTrigger)` once
   - Export `usesReducedMotion()` — returns `true` during SSR, else checks `matchMedia`
   - Export `gsap` and `ScrollTrigger` instances

4. **Create `src/lib/state.svelte.ts`**
   - Shared state module for cross-component communication
   - Export `intro = $state({ ready: false })` — used by preloader → hero bridge

5. **Wire Lenis + ScrollTrigger bridge in `+layout.svelte`**
   - Import Lenis, motion utils, and state
   - Add `$effect` that: registers GSAP, creates Lenis, connects Lenis raf to GSAP ticker, exposes `__lenis` for anchor nav
   - Add `scrollTo` helper function for anchor navigation
   - Return cleanup that removes ticker, destroys Lenis, kills all ScrollTriggers

6. **Global CSS additions to `layout.css`**
   - `html { scrollbar-width: none; }` and `::-webkit-scrollbar { display: none; }`
   - `body { cursor: none; }` with `@media (hover: none) { body { cursor: auto; } }`
   - `[data-reveal]` base styles with `will-change`
   - Reduced-motion overrides for `[data-reveal]` and cursor
   - `--grid-line` color token

7. **Verify**
   - `pnpm check` passes
   - `pnpm dev` starts, no SSR errors, no console errors
   - Lenis smooth scroll active, Geist Mono renders in computed font-family
