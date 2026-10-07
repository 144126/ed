import { describe, it, expect, vi } from 'vitest';
import { handle } from './hooks.server';

const resolve = vi.fn(async () => new Response('ok'));

function evt(href: string, method = 'GET') {
	return {
		request: new Request(href, { method }),
		url: new URL(href)
	} as never;
}

async function run(href: string, method = 'GET') {
	try {
		return await handle({ event: evt(href, method), resolve } as never);
	} catch (e) {
		return e as { status: number; location: string };
	}
}

describe('the ed host after the rename', () => {
	it('sends pages to 54 for good, path and query intact', async () => {
		expect(await run('https://ed.apexlinks.org/work/oktai?c=us')).toMatchObject({
			status: 301,
			location: 'https://54.apexlinks.org/work/oktai?c=us'
		});
	});

	it('never redirects a write', async () => {
		expect(await run('https://ed.apexlinks.org/', 'POST')).toBeInstanceOf(Response);
	});

	it('leaves 54 alone', async () => {
		expect(await run('https://54.apexlinks.org/')).toBeInstanceOf(Response);
	});
});
