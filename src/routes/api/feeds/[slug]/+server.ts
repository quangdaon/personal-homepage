import { cacheable } from '$lib/resources/caching/index.js';
import { getFeed, isValidFeed, type FeedSourceKey } from '$lib/resources/feeds';
import { error, json } from '@sveltejs/kit';

export async function GET({ params }) {
	const sourceKey = params.slug;

	if (!isValidFeed(sourceKey)) return error(404);

	const feedResult = await cacheable(
		`news_feed_${sourceKey}`,
		() => getFeed(sourceKey as FeedSourceKey),
		2 * 60 * 60 * 1000
	);

  return json(feedResult);
}
