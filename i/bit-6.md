# Bit 6 — Phase 5: About + Live Counters

## What
Add an About section (`01`) between Marquee and Skills with a bio summary and animated stat counters.

## Steps

1. **Add About section to `+page.svelte`**
   - Place between `<Marquee />` and `<section id="skills">`
   - Section index: `01` with counter + rule draw
   - Bio paragraph from `p.summary` + positioning line
   - Stat strip with 4 counters: 6+ (years SvelteKit), 11 (projects shipped), 4 (live deploys), ∞ (coffee)
   - Each stat: gold mono numeral, small muted uppercase label
   - Use GSAP counter animation on reveal (via `use:reveal` + custom counter)
   - 4-up desktop, 2-up mobile, thin gold vertical rules between

2. **Verify**
   - `pnpm check` passes
   - Counters animate up from 0 on scroll into view
   - Reduced motion shows final values immediately
