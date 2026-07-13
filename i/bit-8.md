# Bit 8 — Phase 7: Stack — Staggered Grid + Proficiency Bars

## What
Enhance the skills (Stack) section: proficiency bars on core expertise items, magnetic tilt on chips, staggered chip reveals with gold hover border.

## Steps

1. **Update Core Expertise items in `+page.svelte`**
   - Larger card format with proficiency bar
   - Bar animates `scaleX` on reveal (via `use:reveal` or ScrollTrigger)
   - Bar width = years/10 (SvelteKit 6yr = 60%, etc.)
   - Mono labels, gold bar, no gradient

2. **Add magnetic action to skill chips**
   - `use:magnetic` at strength 0.15 on each chip
   - Gold border on hover

3. **Update stagger reveal**
   - Chip-level stagger for core expertise items
   - Group-level stagger for other categories

## Files
- `src/routes/+page.svelte` — EDIT (skills section only)
