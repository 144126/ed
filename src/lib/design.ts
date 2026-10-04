// s = slug (files are /work/{s}-{n}.webp, thumb /work/{s}-t.webp)
// t = title, k = kind, d = one line, i = [w, h] of each image, o = image order, v = video path
export type piece = { s: string; t: string; k: string; d: string; i: number[][]; o?: number[]; v?: string };

export const kinds = ['logo', 'identity', 'print', 'illustration', 'packaging', 'motion'];

export const work: piece[] = [
	{ s: 'oktai', t: 'oktai', k: 'logo', d: 'an octopus with a screen for a face. six arms, one mind. five arc radii on one grid.', i: [[1800, 1800], [1800, 1800], [1800, 1800]] },
	{ s: 'cd', t: 'custom prints & designs', k: 'logo', d: 'p and d are one letter turned 180°, sharing one bowl. the c weaves through both.', i: [[1200, 1200]] },
	{ s: 'block', t: '2026 block party', k: 'illustration', d: 'the whole street is invited. bubble letters, a dj hot dog, grandpa at the grill.', i: [[1800, 1276], [1800, 1223]] },
	{ s: 'nikkan', t: 'nikkan auto', k: 'identity', d: 'name, mark and guide. two hex nuts linked: japanese and korean parts in one shop.', i: [[1600, 1600], [1600, 1600], [1200, 1600], [1600, 1600]] },
	{ s: 'udens', t: 'udens launch', k: 'print', d: 'one yellow line climbs from kampala 0° to stockholm 59°n, where the date sits.', i: [[1414, 2000]] },
	{ s: 'orange', t: 'orange creative', k: 'logo', d: 'the o of orange breaks open into the c of creative, like an idea getting out.', i: [[1600, 1200], [2000, 813], [2000, 813]] },
	{ s: 'trinh', t: 'cơm tấm cô trinh', k: 'print', d: 'storefront signage for a broken-rice kitchen. ivory capsule, jade dusk.', i: [[2000, 2000], [2000, 2000]] },
	{ s: 'sk', t: 'sk flooring', k: 'logo', d: 'the tick is laid like chevron parquet: three boards meet at a mitred joint.', i: [[2000, 2000]] },
	{ s: 'bluehour', t: 'lights on at blue hour', k: 'illustration', d: 'a family home painted the moment the lamps come on.', i: [[2000, 1500], [760, 950]] },
	{ s: 'aftermath', t: 'aftermath roofing', k: 'identity', d: 'clean vector rebuild plus the full print kit: cards, yard signs, brand sheet.', i: [[2000, 1400], [2000, 1167], [2000, 1333], [1538, 2000]] },
	{ s: 'codepulse', t: 'codepulse.pro', k: 'logo', d: 'a cursor split into three aligned layers: coding agents working as one.', i: [[1600, 1600], [1600, 1600], [1200, 1600]] },
	{ s: 'playe', t: 'playe money', k: 'logo', d: 'a pinwheel is a p on a stick. one breath sets it spinning.', i: [[2000, 1333]] },
	{ s: 'laura', t: 'laura a wilson photography', k: 'logo', d: 'every family date engraved on the lens ring, like real lens markings.', i: [[2000, 2000]] },
	{ s: 'homefront', t: 'homefront counseling', k: 'identity', d: 'an h that is also a doorway. the hard stuff has a place.', i: [[1600, 1600], [2000, 1333], [2000, 1333], [2000, 2000]], o: [3, 0, 1, 2] },
	{ s: 'fence', t: 'suburban fence', k: 'print', d: 'an 82.5 × 22.5 in bench ad you can read while driving past.', i: [[2000, 689], [1774, 887]], o: [1, 0] },
	{ s: 'clay', t: 'clay towel', k: 'packaging', d: 'set 1:1 on the factory dieline. the dark car wraps from front to sides.', i: [[2000, 1986], [1500, 2000], [1311, 2000]] },
	{ s: 'tachyra', t: 'tachyra diagnostics tee', k: 'print', d: 'traced ecg logo on the front, a cartoon physician and a bold url on the back.', i: [[2000, 1600], [1254, 1254]] },
	{ s: 'beyond', t: 'beyond boundaries youth', k: 'logo', d: 'the black chevron is the mentor. the blue one breaks through the line.', i: [[2000, 1500]] },
	{ s: 'sheedy', t: 'sheedy academy', k: 'logo', d: 'two monograms for a sports academy, with the ball in the letters.', i: [[1600, 1600], [1600, 1600], [1200, 1600]] },
	{ s: 'instrowest', t: 'instrowest', k: 'motion', d: 'one turn of the needle draws the dial. one click locks it.', i: [[1920, 1080]], v: '/work/instrowest.mp4' },
	{ s: 'fernhaven', t: 'fernhaven', k: 'logo', d: 'three marks for an over-55 community: fern, leaf, pine. new growth, new chapter.', i: [[1200, 1200], [1200, 1200], [1200, 1200]] },
	{ s: 'prohab', t: 'prohab', k: 'identity', d: 'one mark, four sub-brands, four colours.', i: [[1800, 1800]] },
	{ s: 'mca', t: '@makeMCAgreatagain', k: 'logo', d: 'the a in mca is a play button turned upward: rising.', i: [[1800, 1200]] },
	{ s: 'hated', t: 'hated forever', k: 'motion', d: 'key art for a 4k loop: a horde party crossing the barrens at twilight.', i: [[1942, 809]] },
	{ s: 'diwali', t: '5ab homes · diwali', k: 'illustration', d: 'together in the light. one diya, one family, no sales message.', i: [[1920, 1080]] },
	{ s: 'staging', t: 'virtual staging', k: 'illustration', d: 'empty rooms, furnished and lit.', i: [[2000, 1333], [2000, 1333], [2000, 1333]] }
];
