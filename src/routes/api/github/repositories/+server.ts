import { cacheable } from '$lib/resources/caching';
import { getRepositories } from '$lib/resources/github';
import { json } from '@sveltejs/kit';

export async function GET() {
	const result = await cacheable('github_repos', () => getRepositories(), 8 * 60 * 60 * 1000);
	return json(result);
}
