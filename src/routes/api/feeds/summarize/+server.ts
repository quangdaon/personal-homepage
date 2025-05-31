import { cacheable } from '$lib/resources/caching/index.js';
import { generateAiSummary } from '$lib/resources/feeds';
import { json } from '@sveltejs/kit';
import { createHash } from 'crypto';

export async function POST({ request }) {
	const articles = await request.json();
  const hash = createHash('sha256').update(JSON.stringify(articles)).digest('base64');
  const cachekey = `feed_summary_${hash}`;

	const summary = await cacheable(cachekey, () => generateAiSummary(articles));

	return json(summary);
}
