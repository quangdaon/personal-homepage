import { cacheable } from '$lib/resources/caching';
import { getRepositories } from '$lib/resources/github';
import { Time } from '$lib/resources/temporal';
import { json } from '@sveltejs/kit';

export async function GET() {
	const result = await cacheable('github_repos', () => getRepositories(), Time.hours(8));
	return json(result);
}
