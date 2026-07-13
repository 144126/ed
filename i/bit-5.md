# Bit 5 — Phase 4: Reveal Action, Section-Number Counters, Tech Marquee

## What
Create scroll-reveal action for sections, animate section index counters (001→01 count-up + rule draw), and build the infinite tech marquee between hero and about.

## Steps

1. **Create `src/lib/actions/reveal.ts`**
   - Svelte action `use:reveal` with ScrollTrigger
   - On element enter at `start: 'top 85%'`: animate from `{ y: 40, opacity: 0 }` → natural
   - `duration: 0.9, ease: 'power3.out'`
   - Support `use:reveal={{ y, stagger, selector }}` — if `selector` given, animate children with stagger (for grids)
   - Reduced motion → set final state, no trigger
   - Return `{ destroy }` killing the trigger

2. **Add section-number counter animation**
   - Each section has a numeric label (001, 002, 003)
   - Create an animated counter: count from 00 to its value when scrolled into view
   - Gold rule draws across (`scaleX: 0 → 1`, `transform-origin: left`)
   - Apply to existing skill/project/contact sections as a `use:reveal` enhancement

3. **Create `src/lib/components/Marquee.svelte`**
   - Two rows of large mono tech names scrolling opposite directions, seamless loop
   - Content from tech keywords: SvelteKit · Rust · TypeScript · Python · Qdrant · ONNX · ccxt · Cloudflare · WASM · MQL5 · …
   - GSAP: duplicate row content, animate `xPercent: 0 → -50`, `repeat: -1`, `duration: 20`, `ease: 'none'`
   - Second row `-50 → 0`
   - Pause on hover (`pointerenter`/`pointerleave`)
   - Reduced motion → static single row
   - Style: `font-mono`, `clamp(2rem, 6vw, 4rem)`, alternating gold items, thin gold top/bottom borders
   - Accept `items` prop for the tag list

4. **Integrate into `+page.svelte`**
   - Add `use:reveal` to section headers, about paragraph, stat items, project cards, skill groups, contact block
   - Render `<Marquee />` between hero and about/skills section
   - Update section numbers with animated counter

## Files
- `src/lib/actions/reveal.ts` — NEW
- `src/lib/components/Marquee.svelte` — NEW
- `src/routes/+page.svelte` — EDIT (add reveal actions, marquee, section counter logic)
