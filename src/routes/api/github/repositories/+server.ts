import { getRepositories } from '$lib/resources/github/github';
import { json } from '@sveltejs/kit';

export async function GET() {
	return json(await getRepositories());
}
