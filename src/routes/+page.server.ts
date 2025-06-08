import { OPENAI_SECRET_KEY } from '$env/static/private';

export async function load({ fetch }) {
	const fetchApi = async (slug: string) => {
		const response = await fetch('/api/' + slug);
		return await response.json();
	};

	const [weather, gitHubRepositories, generalNews, localNews, techNews, shipments] =
		await Promise.all([
			fetchApi('weather'),
			fetchApi('github/repositories'),
			fetchApi('feeds/general'),
			fetchApi('feeds/local'),
			fetchApi('feeds/tech'),
			fetchApi('shipments')
		]);

	return {
		aiSummaryEnabled: !!OPENAI_SECRET_KEY,
		weather,
		gitHubRepositories,
		feeds: {
			general: generalNews,
			local: localNews,
			tech: techNews
		},
		shipments
	};
}
