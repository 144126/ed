export const load = ({ platform, request, url }) => ({
	// g = visitor is in nigeria (?c=ng or ?c=us overrides it, for previews)
	g: (url.searchParams.get('c')?.toUpperCase() ?? platform?.cf?.country ?? request.headers.get('cf-ipcountry')) === 'NG'
});
