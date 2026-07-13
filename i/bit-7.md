# Bit 7 — Phase 6: Work Section — Featured + Grid + Upgraded Modal

## What
Replace the projects grid with a "Work" section: featured project rows (first 4) as animated case rows with reveal + parallax, remaining as spotlight-hover grid cards, plus upgraded GSAP-animated modal.

## Approach
Using the **fallback** (no ScrollTrigger pinning) since pin with Lenis is fragile. Each featured row is a `min-h-[80vh]` block revealed with SplitText title stagger + preview parallax. Grid cards get spotlight hover.

## Steps

1. **Rewrite the projects section**
   - Split `projects` into `featured` (first 4: ApexLinks, BEEE Chess, Chess AI, MT5 EAs) and `others` (rest)
   - Featured layout: each row full-width, min-h-[80vh], left text + right preview placeholder
   - Left: index (`/01`), title (mono, clamp(1.8rem,4vw,3rem)), description, tag chips, links (`Live ↗` / `GitHub ↗`), LIVE badge when url exists
   - Right: preview card (gold border, dithered style, animated scanline, project title)
   - On reveal: title chars mask-up via SplitText, meta items stagger
   - Parallax: preview translates y slower than scroll (via ScrollTrigger `scrub`)
   - `data-cursor="text"` with `data-cursor-label="VIEW"` on card → cursor grows to "VIEW"

2. **Grid cards (remaining projects)**
   - Keep as `<button>` cards in 2-column grid
   - Spotlight hover: on `pointermove`, radial gold spotlight follows cursor via CSS `--mx`/`--my` variables on a pseudo-element
   - Card lifts `translateY(-4px)` on hover, border brightens

3. **Upgrade the iframe modal**
   - GSAP open/close: scale 0.94→1, opacity, backdrop blur
   - Mono loading line "> loading {url} …" until iframe `load`
   - Keep Escape, click-outside, "Open in new tab"
   - Close with reverse animation

## Files
- `src/routes/+page.svelte` — EDIT (replace projects section)
- `src/lib/components/Modal.svelte` — NEW (upgraded modal component)
