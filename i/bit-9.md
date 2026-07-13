# Bit 9 — Phase 8: Contact — Kinetic CTA + Lagos Clock + Footer

## What
Upgrade the contact section with a giant kinetic headline, Lagos clock, magnetic email CTA, and updated footer.

## Steps

1. **Replace the contact section in `+page.svelte`**
   - Section `04` with counter + rule draw
   - Giant kinetic headline: "LET'S BUILD" (mono, clamp(3rem,12vw,9rem)) + "SOMETHING FAST." (gold)
   - Primary magnetic CTA: `Email me → 1440fl@gmail.com` (mailto) with gold underline draw on hover
   - GitHub and org links with same underline effect
   - Lagos clock (mono, updates every second via `$effect` + `setInterval`, Intl time)
   - Pulsing green dot + "AVAILABLE FOR WORK · WAT"
   - Keep existing email/location/github as secondary detail grid

2. **Update footer**
   - `© {year} Gold Edem Hogan`
   - `Built with SvelteKit on the edge`
   - Back to top link (Lenis scroll to hero)

3. **Add underline-draw CSS**
   - Gold line scales in from left on hover for links

## Files
- `src/routes/+page.svelte` — EDIT (contact section + footer)
- `src/routes/layout.css` — EDIT (underline-draw class)
