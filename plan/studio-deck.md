# copy deck: studio

Every string here is final. Paste it verbatim and write none of your own.
Voice: all lowercase, no emoji. Apostrophes are `’`.
Money is never typed: `{money(x)}` means `money(x, data.g)`. `flyer` is the `prices` entry with t `flyer or poster`, `website` the one with t `website`.
`data.g` true = visitor in nigeria. It changes only the currency and the main contact (whatsapp vs email). Never the offer, never the order.

## meta

- title and og:title: `54 · design and software studio`
- description: `54 designs logos, flyers and brand kits, and builds websites and web apps. {work.length} pieces to look through.`
- og:description: `logos, flyers, websites and web apps by 54. {work.length} pieces to look through.`
- og:image:alt: `a social app, an ai chess coach, a logo and a brand by 54`

## nav

- `54` → `/`
- `work` → `#work` (every width)
- `prices` → `#prices` (every width)
- `how it works` → `#how` (md and up)
- gold pill `start a project` → `#start`

## hero

- badge: `taking new work this week`
- h1: `from the logo to <span class="text-accent">the app.</span>`
- intro: `54 is a design and software studio. logos, flyers and brand kits. websites and web apps.`
- gold button, nigeria: `message us on whatsapp` → `p.whatsapp`, new tab
- gold button, everyone else: `email us` → mailto `p.email`, subject `a new project`, body `hi 54, i found your site.\n\ni need: ` (url-encode both)
- ghost button, both: `see the work ↓` → `#work`
- stats, both:
  - `designs from <span class="text-fg">{money(flyer)}</span>`
  - `websites from <span class="text-fg">{money(website)}</span>`
  - `you own <span class="text-fg">every file</span>`

## work

- h2: `every piece here hides an idea.`
- side: `briefs from contests and clients, and our own products. tap one to see it.`
- kinds, in this order: `{ k: 'app', l: 'websites & apps' }`, then print, logo, identity as they are
- the piece with s `e4` (the flyers) gets t `e4 flyers`. nothing else of it changes.

### software pieces

Every one has k `app`, i `[[2000, 1250], [780, 1688]]` (slide 0 desktop, slide 1 phone).

| s | t | c | d | u | b |
|---|---|---|---|---|---|
| x3 | x3 | our social app | voice talks with someone picked for what you share, rooms built around one thing, and a board for everyone. no sign-up to start. | https://x3.apexlinks.org | sveltekit · cloudflare workers · durable objects · webrtc · qdrant |
| e4-coach | e4 chess coach | our ai chess coach | a coach that plays with you, explains every move in plain words and talks with you out loud. free, no account needed. | https://e4.apexlinks.org | sveltekit · stockfish · groq · gemini · paystack · cloudflare |
| beee | beee chess championship | school chess tournament | team sign-ups and payments for an inter-school chess tournament in abuja. | https://beeeproject.com | sveltekit · paystack · gemini · qdrant · cloudflare |
| zai | zai | our site q&a widget | one line of javascript, and a site answers its own questions from the pages it already has. | https://zai.apexlinks.org | sveltekit · cloudflare workers · gemini |
| devcircles | devcircles | developer community | an investor-facing report on 43 companies built by one developer community. every link checked by hand. | https://devcircles.apexlinks.org | sveltekit · qdrant · gemini · cloudflare |
| calm | calm | our open-source resume theme | a json resume theme on npm that keeps every job whole across page breaks. type a github username to see yours. | https://calm.apexlinks.org | typescript · npm |

### wall order (slugs, exactly)

`x3, watch-worthy, e4-coach, chicklet, beee, oktai, zai, e4, bioburger, devcircles, nikkan, trinh, calm, cd, domus, orange, meridian, playe, beyond, fernhaven`

## lightbox and piece page

- `want one like this? →` (as now)
- pieces with u: ghost pill `visit the live site ↗` → u, new tab
- pieces with b: b itself, as written
- piece page link back: `see all {work.length} pieces`

## prices

h2 and side stay. Append these two entries to `prices`, in this order:

| t | u | n | d |
|---|---|---|---|
| website | 360 | 90000 | a homepage on your own domain, made for phones. live in a week, no monthly fees. |
| web app | 1800 | 450000 | accounts, payments, ai chat, whatever it needs. you get a working link to try every week. |

## how it works

- h2: `from message to finished work in four steps.`
- steps:
  1. `tell us what you need` — `the text, the deadline, any logo or photos. for a site or an app, what it should do and who will use it. a voice note is fine.`
  2. `get a fixed price` — `you know the full cost before any work starts. half to start, half before the final files.`
  3. `see it early` — `designs: a first draft in 24 hours, then two rounds of changes. sites and apps: a working link to try, updated every week.`
  4. `get everything` — `print-ready pdf, png for screens and the editable source. for sites and apps, the code, the domain and the hosting, in your name. you own all of it.`

## start form

- chips: every `prices` t, then `something else`
- placeholder when want is `website` or `web app`: `e.g. a booking site for my salon. people pick a time and pay a deposit.`
- placeholder otherwise (as now): `e.g. a5 flyer for a church concert on 12 november, gold and white, our logo is attached`

## questions

In this order:

1. `what files do i get?` — as now
2. `can you work from my sketch or an old logo?` — as now
3. `who owns the code?` — `you do. the code goes to your github, and the domain and hosting are in your name. nothing is locked to us.`
4. `what do you build sites and apps with?` — `sveltekit and typescript on cloudflare. fast on cheap phones, and cheap to host.`
5. `can you add ai to my site or app?` — `yes. chat that answers from your own pages, voice, and search that understands what people mean. e4 and zai above are ours.`
6. `do you use ai?` — `yes. for mockup photos and some pictures, and every piece that used it says so. logos and type are built by hand as editable vector. code is written with ai tools and tested before it ships.`
7. `do you print?` — as now
8. `what if i don’t like the first draft?` — as now

## contact

- h2, buttons and clock line stay.
- under the clock: `54 is run by gold hogan in abuja.` then links `github ↗` → https://github.com/144126 and `resume ↗` → https://calm.apexlinks.org/144126, both new tab.
