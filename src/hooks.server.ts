import type { Handle } from '@sveltejs/kit';

const HERE = '54.apexlinks.org';

export const handle: Handle = ({ event, resolve }) => {
	const { url, request } = event;
	if (url.hostname !== HERE && (request.method === 'GET' || request.method === 'HEAD'))
		return new Response(null, {
			status: 301,
			headers: { location: `https://${HERE}${url.pathname}${url.search}` }
		});
	return resolve(event);
};
