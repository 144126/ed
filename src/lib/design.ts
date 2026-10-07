// s = slug (files are /work/{s}-{n}.webp, thumb /work/{s}-t.webp)
// t = title, k = kind, c = what the client is, d = one line, i = [w, h] of each image, o = image order, v = video path
export type piece = { s: string; t: string; k: string; c: string; d: string; i: number[][]; o?: number[]; v?: string };

// k = kind key, l = label shown on the filter
export const kinds = [
	{ k: 'print', l: 'flyers & print' },
	{ k: 'logo', l: 'logos' },
	{ k: 'identity', l: 'brand kits' },
	{ k: 'packaging', l: 'packaging' },
	{ k: 'apparel', l: 'apparel' },
	{ k: 'motion', l: 'motion' }
];

export const work: piece[] = [
	{ s: 'udens', t: 'udens launch', k: 'print', c: 'uganda diaspora event', d: 'event flyer. one yellow line climbs from kampala 0° to stockholm 59°n, where the date sits.', i: [[1414, 2000]] },
	{ s: 'watch-worthy', t: 'watch worthy films', k: 'logo', c: 'film review channel', d: 'a scope film on a widescreen: the name plays in a 2.39:1 band, and films sits in the black bar like a subtitle.', i: [[2000, 1300], [2000, 1300], [2000, 1300]] },
	{ s: 'chicklet', t: 'chicklet', k: 'identity', c: 'chicken sandwich brand', d: 'a chiclet is a small rounded tile, so the chick is one. its crest is the dot on the i. tent, cups, menu, stickers.', i: [[2000, 1500], [2000, 1500], [2000, 1500], [2000, 1500]] },
	{ s: 'oktai', t: 'oktai', k: 'logo', c: 'ai agent startup', d: 'an octopus with a screen for a face. six arms, one mind.', i: [[1800, 1800], [1800, 1800], [1800, 1800]] },
	{ s: 'e4', t: 'e4 chess coach', k: 'print', c: 'my own chess app', d: 'two a5 flyers. one pawn, one move, one url. the second has tear-off url strips.', i: [[1240, 1754], [1240, 1754]] },
	{ s: 'suma', t: 'suma supplements', k: 'packaging', c: 'supplement brand', d: '12 labels on one grid, one soft colour per product. every word stays editable.', i: [[2000, 1333], [2000, 1333], [2000, 1333], [2000, 1333], [2000, 1333]] },
	{ s: 'bioburger', t: 'bio burger', k: 'identity', c: 'burger restaurant', d: 'the logo is the burger. branded on the bun, the shopfront and the bag. ai made those three photos.', i: [[2000, 1333], [1536, 1024], [1536, 1024], [1536, 1024], [2000, 1333]] },
	{ s: 'beee', t: 'beee partner schools', k: 'print', c: 'school chess tournament', d: 'a4 flyer that asks schools one thing: join. four benefits, a qr code and a phone number.', i: [[1415, 2000]] },
	{ s: 'nikkan', t: 'nikkan auto', k: 'identity', c: 'auto parts shop', d: 'name, mark and guide. two hex nuts linked: japanese and korean parts in one shop.', i: [[1600, 1600], [1600, 1600], [1200, 1600], [1600, 1600]] },
	{ s: 'carryon', t: 'friends & a carry-on', k: 'logo', c: 'travel club', d: 'the client’s luggage-tag idea, redrawn clean: gold script on deep purple, sharp from a website header down to a tiny icon.', i: [[1600, 1600], [1600, 1600], [1600, 1600]] },
	{ s: 'utensil', t: 'silicone utensils', k: 'packaging', c: 'kitchenware brand', d: 'a kraft box that fits the factory’s template exactly. one line drawing wraps the front and back. made with ai help.', i: [[2000, 1333], [2000, 1333], [1029, 2000], [1951, 2000]] },
	{ s: 'trinh', t: 'cơm tấm cô trinh', k: 'print', c: 'vietnamese restaurant', d: 'the shop sign for a broken-rice kitchen, in ivory and jade. ai made the storefront photo.', i: [[2000, 2000], [2000, 2000]] },
	{ s: 'cd', t: 'custom prints & designs', k: 'logo', c: 'print shop', d: 'the p and the d are one shape turned upside down. the c weaves through both.', i: [[1200, 1200]] },
	{ s: 'domus', t: 'domus student residence', k: 'logo', c: 'student housing', d: 'the building’s own windows draw the logo. the lit ones make a heart.', i: [[1600, 1200], [1600, 1200]] },
	{ s: 'tmg', t: 'trident marine tugboat', k: 'apparel', c: 'tugboat company', d: 'a tugboat drawn line by line, ready to print in one colour on a shirt.', i: [[1774, 887], [1774, 887]] },
	{ s: 'orange', t: 'orange creative', k: 'logo', c: 'creative studio', d: 'the o of orange breaks open into the c of creative, like an idea getting out.', i: [[1600, 1200], [2000, 813], [2000, 813]] },
	{ s: 'meridian', t: 'meridian trade', k: 'identity', c: 'pharma trading company', d: 'a system built around a logo the client already had. cover, card, social, letterhead.', i: [[1920, 1200], [1920, 1200], [1920, 1200], [1920, 1200], [1920, 1200]] },
	{ s: 'sk', t: 'sk flooring', k: 'logo', c: 'flooring company', d: 'the tick is laid like a parquet floor: three boards meeting at one joint.', i: [[2000, 2000]] },
	{ s: 'clay', t: 'clay towel', k: 'packaging', c: 'car care brand', d: 'fits the factory’s box template exactly. the dark car wraps from the front onto the sides. ai made the car picture.', i: [[2000, 1986], [1500, 2000], [1311, 2000]] },
	{ s: 'cpprsj', t: 'racial & social justice center', k: 'logo', c: 'university center', d: 'curved bands bend toward justice. logo plus a one-page style sheet.', i: [[2000, 2000], [1600, 2000]] },
	{ s: 'tachyra', t: 'tachyra diagnostics tee', k: 'apparel', c: 'diagnostics company', d: 'a heartbeat logo on the front, a cartoon doctor and their web address on the back. ai made the shirt photo.', i: [[2000, 1600], [1254, 1254]] },
	{ s: 'codepulse', t: 'codepulse.pro', k: 'logo', c: 'ai coding tool', d: 'a cursor split into three aligned layers: coding agents working as one.', i: [[1600, 1600], [1600, 1600], [1200, 1600]] },
	{ s: 'journal', t: 'the favor of god journal', k: 'print', c: 'christian journal', d: 'five a4 guided journal pages, fillable, set for home printing. made with ai help.', i: [[1241, 1754], [2000, 628], [1241, 1754]] },
	{ s: 'playe', t: 'playe money', k: 'logo', c: 'kids’ gifting app', d: 'a pinwheel is a p on a stick. one breath sets it spinning.', i: [[2000, 1333]] },
	{ s: 'homefront', t: 'homefront counseling', k: 'identity', c: 'counseling practice', d: 'an h that is also a doorway. the hard stuff has a place.', i: [[1600, 1600], [2000, 1333], [2000, 1333], [2000, 2000]], o: [3, 0, 1, 2] },
	{ s: 'beyond', t: 'beyond boundaries youth', k: 'logo', c: 'youth mentoring program', d: 'the black chevron is the mentor. the blue one breaks through the line.', i: [[2000, 1500]] },
	{ s: 'instrowest', t: 'instrowest', k: 'motion', c: 'youtube channel', d: 'one turn of the needle draws the dial. one click locks it.', i: [[1920, 1080]], v: '/work/instrowest.mp4' },
	{ s: 'fernhaven', t: 'fernhaven', k: 'logo', c: 'over-55 community', d: 'three marks for an over-55 community: fern, leaf, pine. new growth, new chapter.', i: [[1200, 1200], [1200, 1200], [1200, 1200]] },
];

// t = service, u = starting price in usd, n = starting price in naira, d = what you get
export const prices = [
	{ t: 'flyer or poster', u: 25, n: 9000, d: 'one design, sized for your printer and for instagram.' },
	{ t: 'social media pack', u: 40, n: 13500, d: '5 posts or stories that look like one brand, ready to upload.' },
	{ t: 'logo', u: 49, n: 18000, d: '2 ideas to pick from, then every version you’ll need: colour, black and white.' },
	{ t: 'brand kit', u: 120, n: 36000, d: 'logo plus colours, fonts, business card and a one-page guide.' },
	{ t: 'label or packaging', u: 60, n: 18000, d: 'fits your printer’s template exactly, so nothing gets cut off.' },
	{ t: 't-shirt or merch', u: 30, n: 9000, d: 'front and back art, ready for your shirt printer.' }
];

export const site_price = { u: 360, n: 90000 };

export function money(x: { u: number; n: number }, ng: boolean) {
	return ng ? `₦${x.n.toLocaleString('en-NG')}` : `$${x.u}`;
}
