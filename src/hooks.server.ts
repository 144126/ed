import type { Handle } from '@sveltejs/kit';

const HERE = '54.apexlinks.org';
const OLD = ['ed.apexlinks.org', 'ed.apexlinks.workers.dev'];

export const handle: Handle = ({ event, resolve }) => {
	const { url, request } = event;
	if (OLD.includes(url.hostname) && (request.method === 'GET' || request.method === 'HEAD'))
		return new Response(null, {
			status: 301,
			headers: { location: `https://${HERE}${url.pathname}${url.search}` }
		});
	return resolve(event);
};
