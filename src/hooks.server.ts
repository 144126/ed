import type { Handle } from '@sveltejs/kit';

const OLD_HOST = 'ed.apexlinks.org';

export const handle: Handle = ({ event, resolve }) => {
	const { url, request } = event;
	if (url.hostname === OLD_HOST && (request.method === 'GET' || request.method === 'HEAD'))
		return new Response(null, {
			status: 301,
			headers: { location: `https://54.apexlinks.org${url.pathname}${url.search}` }
		});
	return resolve(event);
};
