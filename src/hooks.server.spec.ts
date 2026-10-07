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
	return handle({ event: evt(href, method), resolve } as never);
}

describe('hosts that are not 54', () => {
	it('sends the old name to 54, path and query intact', async () => {
		const r = await run('https://ed.apexlinks.org/work/oktai?c=us');
		expect(r).toBeInstanceOf(Response);
		expect(r.status).toBe(301);
		expect(r.headers.get('location')).toBe('https://54.apexlinks.org/work/oktai?c=us');
	});

	it('sends the workers.dev host to 54', async () => {
		const r = await run('https://ed.apexlinks.workers.dev/');
		expect(r).toBeInstanceOf(Response);
		expect(r.status).toBe(301);
		expect(r.headers.get('location')).toBe('https://54.apexlinks.org/');
	});

	it('never redirects a write', async () => {
		const r = await run('https://ed.apexlinks.org/', 'POST');
		expect(r).toBeInstanceOf(Response);
		expect(r.status).toBe(200);
	});

	it('leaves 54 alone', async () => {
		const r = await run('https://54.apexlinks.org/');
		expect(r).toBeInstanceOf(Response);
		expect(r.status).toBe(200);
	});
});
