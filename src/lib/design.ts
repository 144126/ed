// s = slug (files are /work/{s}-{n}.webp, thumb /work/{s}-t.webp)
// t = title, k = kind, d = one line, i = [w, h] of each image, o = image order, v = video path
export type piece = { s: string; t: string; k: string; d: string; i: number[][]; o?: number[]; v?: string };

// k = kind key, l = label shown on the filter
export const kinds = [
	{ k: 'print', l: 'flyers & print' },
	{ k: 'logo', l: 'logos' },
	{ k: 'identity', l: 'brand kits' },
	{ k: 'packaging', l: 'packaging' },
	{ k: 'apparel', l: 'apparel' },
	{ k: 'illustration', l: 'illustration' },
	{ k: 'motion', l: 'motion' }
];

export const work: piece[] = [
	{ s: 'udens', t: 'udens launch', k: 'print', d: 'event flyer. one yellow line climbs from kampala 0° to stockholm 59°n, where the date sits.', i: [[1414, 2000]] },
	{ s: 'chicklet', t: 'chicklet', k: 'identity', d: 'a chiclet is a small rounded tile, so the chick is one. its crest is the dot on the i. tent, cups, menu, stickers.', i: [[2000, 1500], [2000, 1500], [2000, 1500], [2000, 1500]] },
	{ s: 'oktai', t: 'oktai', k: 'logo', d: 'an octopus with a screen for a face. six arms, one mind. five arc radii on one grid.', i: [[1800, 1800], [1800, 1800], [1800, 1800]] },
	{ s: 'e4', t: 'e4 chess coach', k: 'print', d: 'two a5 flyers. one pawn, one move, one url. the second has tear-off url strips.', i: [[1240, 1754], [1240, 1754]] },
	{ s: 'suma', t: 'suma supplements', k: 'packaging', d: '12 labels, one grid. one soft colour per product, every panel real editable text.', i: [[2000, 1333], [2000, 1333], [2000, 1333], [2000, 1333], [2000, 1333]] },
	{ s: 'bioburger', t: 'bio burger', k: 'identity', d: 'the logo is the burger. branded on the bun, the shopfront and the bag.', i: [[2000, 1333], [1536, 1024], [1536, 1024], [1536, 1024], [2000, 1333]] },
	{ s: 'beee', t: 'beee partner schools', k: 'print', d: 'a4 flyer that asks schools one thing: join. four benefits, a qr code and a phone number.', i: [[1415, 2000]] },
	{ s: 'nikkan', t: 'nikkan auto', k: 'identity', d: 'name, mark and guide. two hex nuts linked: japanese and korean parts in one shop.', i: [[1600, 1600], [1600, 1600], [1200, 1600], [1600, 1600]] },
	{ s: 'carryon', t: 'friends & a carry-on', k: 'logo', d: 'a luggage tag rebuilt as clean vector. gold script, deep purple, works from a site header down to 200px.', i: [[1600, 1600], [1600, 1600], [1600, 1600]] },
	{ s: 'utensil', t: 'silicone utensils', k: 'packaging', d: 'a kraft box set 1:1 on the dieline. one line drawing wraps the front and back.', i: [[2000, 1333], [2000, 1333], [1029, 2000], [1951, 2000]] },
	{ s: 'trinh', t: 'cơm tấm cô trinh', k: 'print', d: 'storefront signage for a broken-rice kitchen. ivory capsule, jade dusk.', i: [[2000, 2000], [2000, 2000]] },
	{ s: 'cd', t: 'custom prints & designs', k: 'logo', d: 'p and d are one letter turned 180°, sharing one bowl. the c weaves through both.', i: [[1200, 1200]] },
	{ s: 'domus', t: 'domus student residence', k: 'logo', d: 'the building’s own windows draw the logo. the lit ones make a heart.', i: [[1600, 1200], [1600, 1200]] },
	{ s: 'tmg', t: 'trident marine tugboat', k: 'apparel', d: 'a tug drawn line by line in vector for a one-colour shirt print.', i: [[1774, 887], [1774, 887]] },
	{ s: 'orange', t: 'orange creative', k: 'logo', d: 'the o of orange breaks open into the c of creative, like an idea getting out.', i: [[1600, 1200], [2000, 813], [2000, 813]] },
	{ s: 'meridian', t: 'meridian trade', k: 'identity', d: 'a system built around a logo the client already had. cover, card, social, letterhead.', i: [[1920, 1200], [1920, 1200], [1920, 1200], [1920, 1200], [1920, 1200]] },
	{ s: 'sk', t: 'sk flooring', k: 'logo', d: 'the tick is laid like chevron parquet: three boards meet at a mitred joint.', i: [[2000, 2000]] },
	{ s: 'clay', t: 'clay towel', k: 'packaging', d: 'set 1:1 on the factory dieline. the dark car wraps from front to sides.', i: [[2000, 1986], [1500, 2000], [1311, 2000]] },
	{ s: 'bluehour', t: 'lights on at blue hour', k: 'illustration', d: 'a family home painted the moment the lamps come on.', i: [[2000, 1500], [760, 950]] },
	{ s: 'cpprsj', t: 'racial & social justice center', k: 'logo', d: 'curved bands bend toward justice. logo plus a one-page style sheet.', i: [[2000, 2000], [1600, 2000]] },
	{ s: 'tachyra', t: 'tachyra diagnostics tee', k: 'apparel', d: 'traced ecg logo on the front, a cartoon physician and a bold url on the back.', i: [[2000, 1600], [1254, 1254]] },
	{ s: 'codepulse', t: 'codepulse.pro', k: 'logo', d: 'a cursor split into three aligned layers: coding agents working as one.', i: [[1600, 1600], [1600, 1600], [1200, 1600]] },
	{ s: 'journal', t: 'the favor of god journal', k: 'print', d: 'five a4 guided journal pages, fillable, set for home printing.', i: [[1241, 1754], [2000, 628], [1241, 1754]] },
	{ s: 'playe', t: 'playe money', k: 'logo', d: 'a pinwheel is a p on a stick. one breath sets it spinning.', i: [[2000, 1333]] },
	{ s: 'homefront', t: 'homefront counseling', k: 'identity', d: 'an h that is also a doorway. the hard stuff has a place.', i: [[1600, 1600], [2000, 1333], [2000, 1333], [2000, 2000]], o: [3, 0, 1, 2] },
	{ s: 'beyond', t: 'beyond boundaries youth', k: 'logo', d: 'the black chevron is the mentor. the blue one breaks through the line.', i: [[2000, 1500]] },
	{ s: 'instrowest', t: 'instrowest', k: 'motion', d: 'one turn of the needle draws the dial. one click locks it.', i: [[1920, 1080]], v: '/work/instrowest.mp4' },
	{ s: 'fernhaven', t: 'fernhaven', k: 'logo', d: 'three marks for an over-55 community: fern, leaf, pine. new growth, new chapter.', i: [[1200, 1200], [1200, 1200], [1200, 1200]] },
	{ s: 'mca', t: '@makeMCAgreatagain', k: 'logo', d: 'the a in mca is a play button turned upward: rising.', i: [[1800, 1200]] },
	{ s: 'hated', t: 'hated forever', k: 'motion', d: 'key art for a 4k loop: a horde party crossing the barrens at twilight.', i: [[1942, 809]] },
	{ s: 'staging', t: 'virtual staging', k: 'illustration', d: 'empty rooms, furnished and lit.', i: [[2000, 1333], [2000, 1333], [2000, 1333]] }
];

// t = service, f = starting price in usd, d = what you get
export const prices = [
	{ t: 'flyer or poster', f: 25, d: 'one design, print-ready pdf + png, sized for print or instagram.' },
	{ t: 'social media pack', f: 40, d: '5 posts or stories in one look, ready to upload.' },
	{ t: 'logo', f: 49, d: '2 concepts, the winner in full colour, one-colour and reversed. svg, pdf, png.' },
	{ t: 'brand kit', f: 120, d: 'logo plus colours, fonts, business card and a one-page guide.' },
	{ t: 'label or packaging', f: 60, d: 'set 1:1 on your printer’s dieline, with bleed.' },
	{ t: 't-shirt or merch', f: 30, d: 'front and back art, vector, separated for screen print.' }
];
