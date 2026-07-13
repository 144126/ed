# Bit 2 — Phase 1: data.ts, Cursor, DotGrid

## What
Extract shared data into `src/lib/data.ts`, create custom cursor with ring+dot lerp and hover scaling, create reactive canvas dot-grid background, mount both in layout.

## Steps

1. **Create `src/lib/data.ts`**
   - Cut `p`, `skills`, and `projects` objects from `+page.svelte` into `data.ts`
   - `export` each
   - Import back into `+page.svelte`
   - Preserve every field exactly

2. **Create `src/lib/components/Cursor.svelte`**
   - Two elements: outer ring (28px, gold border, mix-blend-mode: difference) + inner dot (5px, gold bg)
   - Ring lerps toward pointer via rAF at 0.15 easing; dot follows 1:1
   - On `pointerenter` of `a, button, [data-cursor]`: ring scales 2.2×, dot hides
   - If hovered element has `data-cursor-label`, show label text inside ring
   - Guard in `$effect`: skip on `(hover: none)` or reduced-motion
   - Return cleanup: cancelAnimationFrame + remove listeners
   - CSS: position fixed, pointer-events none, z-index 9999, hidden on touch/reduced-motion

3. **Create `src/lib/components/DotGrid.svelte`**
   - Fixed canvas, inset:0, z-index:-1, pointer-events:none
   - Handle devicePixelRatio for crisp rendering
   - Grid spacing 34px, base dot radius 1px, base color rgba(212,160,71,0.18)
   - Track pointer position via rAF loop
   - For each dot within 140px of cursor: brighten (alpha 0.18→0.78), grow (radius 1→2.6), nudge outward (up to 6px)
   - Single rAF loop, debounced resize
   - Reduced-motion / touch: render one static frame, no loop, no pointer reaction
   - Cleanup: cancel rAF, remove resize listener

4. **Mount in `+layout.svelte`**
   - Import and render `<DotGrid />` then `<Cursor />` above `{@render children()}`

5. **Verify**
   - `pnpm check` passes
   - `pnpm dev`: cursor tracks, ring lags, scales on links
   - Dot grid lights up near cursor, static under reduced motion
   - Data imports work, page renders same content
