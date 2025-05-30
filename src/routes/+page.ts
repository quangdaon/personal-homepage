export async function load({ fetch }) {
	const fetchApi = async (slug: string) => {
		const response = await fetch('/api/' + slug); // TODO: path.join
		return await response.json();
	};

	const [weather, gitHubRepositories, generalNews, localNews, techNews] = await Promise.all([
		fetchApi('weather'),
		fetchApi('github/repositories'),
		fetchApi('feeds/general'),
		fetchApi('feeds/local'),
		fetchApi('feeds/tech')
	]);

	return {
		weather,
		gitHubRepositories,
		feeds: {
			general: generalNews,
			local: localNews,
			tech: techNews
		}
	};
}
