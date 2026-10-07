# copy deck: 54.apexlinks.org

Every string here is final. Paste it verbatim and write none of your own.
Money is never typed: `{money(prices[0])}` means `money(prices[0], data.g)` and `{money(site_price)}` means `money(site_price, data.g)`.
Voice: all lowercase, no emoji. Apostrophes are `’`, the way the files already write them.

## hero

The badge stays the same for both versions: `taking new work this week`

### nigeria (`data.g` true)

- h1: `send your text tonight. get your design <span class="text-accent">tomorrow.</span>`
- intro: `54 is a design studio. send your text and your deadline on whatsapp. a voice note is fine. flyers from {money(prices[0])}.`
- button 1: gold, `p.whatsapp`, new tab, as it is now: `message us on whatsapp`
- button 2: ghost, `#work`, as it is now: `see {work.length} designs ↓`
- stats:
  - `<span class="text-fg">2</span> rounds of changes included`
  - `pay <span class="text-fg">half</span> to start`
  - `you own <span class="text-fg">every file</span>`

### everyone else (`data.g` false)

- h1: `your new homepage, live <span class="text-accent">this week.</span>`
- intro: `54 is a design studio. a homepage on your own domain, {money(site_price)} flat.`
- button 1: gold: `email us`. Its href is `mailto:{p.email}`, with subject `a new homepage` and body `hi 54, i found your site. i want a new homepage.\n\nmy current site: ` (`\n` is a newline). Url-encode both, the way the start form's mailto does.
- button 2: ghost, `#web`: `see live sites ↓`
- stats:
  - `made for <span class="text-fg">phones</span>`
  - `<span class="text-fg">no</span> monthly fees`
  - `logos and flyers <span class="text-fg">too</span>`

## client lines

Each piece's `c` in `work`, by slug:

| s | c |
|---|---|
| udens | uganda diaspora event |
| chicklet | chicken sandwich brand |
| oktai | ai agent startup |
| e4 | our chess app |
| suma | supplement brand |
| bioburger | burger restaurant |
| beee | school chess tournament |
| nikkan | auto parts shop |
| carryon | travel club |
| utensil | kitchenware brand |
| trinh | vietnamese restaurant |
| cd | print shop |
| domus | student housing |
| tmg | tugboat company |
| orange | creative studio |
| meridian | pharma trading company |
| sk | flooring company |
| clay | car care brand |
| cpprsj | university center |
| tachyra | diagnostics company |
| codepulse | ai coding tool |
| journal | christian journal |
| playe | kids’ gifting app |
| homefront | counseling practice |
| beyond | youth mentoring program |
| instrowest | youtube channel |
| fernhaven | over-55 community |

## piece lines

The new `d` for these 12 pieces. Every other `d` stays as it is.

| s | d |
|---|---|
| oktai | an octopus with a screen for a face. six arms, one mind. |
| utensil | a kraft box that fits the factory’s template exactly. one line drawing wraps the front and back. made with ai help. |
| trinh | the shop sign for a broken-rice kitchen, in ivory and jade. ai made the storefront photo. |
| cd | the p and the d are one shape turned upside down. the c weaves through both. |
| carryon | the client’s luggage-tag idea, redrawn clean: gold script on deep purple, sharp from a website header down to a tiny icon. |
| suma | 12 labels on one grid, one soft colour per product. every word stays editable. |
| sk | the tick is laid like a parquet floor: three boards meeting at one joint. |
| clay | fits the factory’s box template exactly. the dark car wraps from the front onto the sides. ai made the car picture. |
| tachyra | a heartbeat logo on the front, a cartoon doctor and their web address on the back. ai made the shirt photo. |
| tmg | a tugboat drawn line by line, ready to print in one colour on a shirt. |
| bioburger | the logo is the burger. branded on the bun, the shopfront and the bag. ai made those three photos. |
| journal | five a4 guided journal pages, fillable, set for home printing. made with ai help. |

## price lines

The new `d` in `prices`. The brand kit keeps its line.

| t | d |
|---|---|
| flyer or poster | one design, sized for your printer and for instagram. |
| social media pack | 5 posts or stories that look like one brand, ready to upload. |
| logo | 2 ideas to pick from, then every version you’ll need: colour, black and white. |
| label or packaging | fits your printer’s template exactly, so nothing gets cut off. |
| t-shirt or merch | front and back art, ready for your shirt printer. |

## sections

The "side" text is the paragraph beside each h2. The how-it-works h2 and its steps stay as they are.

- work h2: `every logo here hides an idea.`
- work side: `most are concepts for briefs that businesses posted online. tap one to find its idea.`
- prices h2: `you know the price before we start.`
- prices side: `starting prices in {data.g ? 'naira' : 'us dollars'}. tap one to start.`
- start h2: `pick two things. your message writes itself.`
- websites h2: `made for phones first.`
- websites side: `a new homepage on your own domain, live this week. {money(site_price)} flat, no monthly fees. three sites we built:`
- questions h2: `questions.`

## details

- marquee items, in this order: `flyers`, `logos`, `brand kits`, `websites`, `labels`, `packaging`, `t-shirts`, `social posts`, `menus`, `signage`
- the `d` of each site in `sites`:
  - y2: `our real-time social app: posts, rooms, dms, voice and video calls.` This site was x2. It was renamed on 2026-10-07, and x2.apexlinks.org now 301s to it, so its `t` becomes `y2` and its `u` becomes `https://y2.apexlinks.org`.
  - beee chess championship: `sign-ups and payments for an inter-school chess tournament in abuja.`
  - e4 chess coach: `our free chess coach. it explains every move, from zero.`
- faq answers (the questions stay the same):
  - what files do i get?: `a print-ready pdf, png or jpg for social, and the source file (svg, illustrator or figma). logos also come in colour, black and white versions.`
  - do you use ai?: `yes, for mockup photos and some pictures, and every piece that used it says so. logos and type are built by hand as editable vector.`
- contact section email button text: `email us`

## messages

- start form `message` (`\n` is a newline, and the details line is added only when there is a note):
  `hi 54, i found your site.\n\ni need: {want}\nwhen: {when}` then `\ndetails: {note}`
- lightbox "want one like this?" prefill: `hi 54. i saw "{pc.t}" on your site and i want something like it.`
- lightbox email subject, used when the link is a mailto: `something like "{pc.t}"`

## meta

- title and og:title: `54 · design studio`
- description: `logos with an idea inside, flyers drafted in 24 hours, websites made for phones. {work.length} designs to look through.`
- og:description: `logos, flyers and websites by 54. first draft in 24 hours. {work.length} designs to look through.`
- og:image:alt: `a flyer and two logos by 54`
