import { cacheable } from '$lib/resources/caching';
import { getRepositories } from '$lib/resources/github';
import { Time } from '$lib/resources/temporal';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const result = await cacheable('github_repos', {
		resolver: () => getRepositories(),
		duration: Time.hours(8),
		bust: !!url.searchParams.get('bustCache')
	});

	return json(result);
}
