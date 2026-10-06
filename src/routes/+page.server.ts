export const load = ({ platform, request }) => ({
	// g = visitor is in nigeria
	g: (platform?.cf?.country ?? request.headers.get('cf-ipcountry')) === 'NG'
});
