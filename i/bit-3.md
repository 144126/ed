# Bit 3 — Phase 2: Preloader Boot Sequence

## What
A terminal-style preloader that types boot lines, shows a progress bar, wipes upward to reveal the hero, and sets `intro.ready = true`. Shown once per session via `sessionStorage`.

## Steps

1. **Create `src/lib/components/Preloader.svelte`**
   - `position: fixed; inset: 0; z-index: 10000; background: var(--color-bg)`
   - Terminal lines array with typing effect (~18ms/char):
     ```
     > initializing ed.portfolio
     > loading stack ................ svelte · rust · ai
     > compiling shaders ............ ok
     > deploy target ............... cloudflare edge
     > ready_
     ```
   - Progress bar beneath (thin gold, 0→100%), tied to real readiness:
     - Wait for `document.fonts.ready` AND `window` `load` event
     - Max cap of 1600ms (never trap user)
   - On complete: GSAP timeline — fill bar to 100%, terminal collapses, then `clip-path: inset(0 0 100% 0)` wipe upward over 0.7s expo.inOut
   - On wipe complete: set `intro.ready = true` and `intro.preloaderDone = true`
   - **sessionStorage**: if `'booted'` is set, skip entirely (render nothing). Guard in `$effect`.
   - **Reduced motion**: show static "ed" wordmark for 400ms then remove (set intro.ready immediately), no typing/wipe.

2. **Mount Preloader in `+layout.svelte`**
   - Before `<DotGrid />`, so it covers everything initially

3. **Verify**
   - `pnpm check` passes
   - First load: typing boot + progress bar → clean upward wipe → hero visible
   - Second navigation (in-session): no preloader
   - Never blocks >1.6s
   - Reduced motion: instant or static wordmark, no typing
