# Bit 4 — Phase 3: Hero — Kinetic Type, Role Rotator, Magnetic CTAs, Canvas Light

## What
Replace the static hero with an animated hero: SplitText name reveal, rotating typewriter role line, magnetic CTAs, pulsing AVAILABLE badge, scroll cue, canvas radial light.

## Steps

1. **Create `src/lib/actions/magnetic.ts`**
   - Svelte action: on `pointermove`, translate toward cursor by `(dx,dy) * strength`
   - On `pointerleave`, elastic back to 0 via GSAP `quickTo`
   - Skip on touch / reduced-motion

2. **Update `src/lib/motion.ts`**
   - Import and register `SplitText` from `gsap/SplitText`

3. **Create `src/lib/components/HeroLight.svelte`**
   - Small canvas behind hero text, draws soft gold radial glow that lerps toward cursor
   - `mix-blend-mode: screen`, opacity ~0.12
   - Reduced motion → omit (don't render canvas)

4. **Rewrite the hero section in `+page.svelte`**
   - Keep the `<script>` imports, modal state, and existing sections below untouched
   - Replace the first `<section>` (hero) with:
     - Eyebrow: gold mono `Full-Stack Developer — Nigeria` + pulsing green dot + `AVAILABLE FOR WORK`
     - H1: `font-mono font-light`, `clamp(2.5rem, 9vw, 6rem)`, two lines "Gold Edem / Hogan"
     - Rotating role line container
     - Summary paragraph from `p.summary`
     - Two CTAs: primary `bg-accent text-bg` "View Work ↓" (scrolls to #work), ghost bordered "Email Me" (mailto)
     - Scroll cue: thin vertical line drawing down + "SCROLL" mono label
   - Data attributes for GSAP targeting: `data-hero` on items, `data-hero-trigger` on container

5. **Add entrance animation effect**
   - Subscribe to `introReady` store
   - When true: GSAP timeline with SplitText char stagger on H1, fade-up on items
   - Reduced motion: set all visible immediately

6. **Add rotating role line effect**
   - Cycle roles: `['SvelteKit Architect','Rust + WASM','AI / Vector Search','Algorithmic Trading','Cloud & Edge']`
   - Typewriter: type → hold 1.6s → backspace → next
   - Pure timeout logic inside `$effect` with cleanup
   - Reduced motion → first item static

## Files to modify
- `src/lib/actions/magnetic.ts` — NEW
- `src/lib/motion.ts` — EDIT (add SplitText)
- `src/lib/components/HeroLight.svelte` — NEW
- `src/routes/+page.svelte` — EDIT (hero section only)
