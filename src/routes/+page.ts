export async function load({ fetch }) {
	const fetchApi = async (slug: string) => {
		const response = await fetch('/api/' + slug); // TODO: path.join
		return await response.json();
	};

	return {
		weather: await fetchApi('weather'),
		gitHubRepositories: await fetchApi('github/repositories'),
		feeds: {
			general: await fetchApi('feeds/general'),
			tech: await fetchApi('feeds/tech')
		}
	};
}
