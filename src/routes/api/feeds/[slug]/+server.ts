import { cacheable } from '$lib/resources/caching/index.js';
import { getFeed, isValidFeed, type FeedSourceKey } from '$lib/resources/feeds';
import { Time } from '$lib/resources/temporal';
import { error, json } from '@sveltejs/kit';

export async function GET({ params }) {
	const sourceKey = params.slug;

	if (!isValidFeed(sourceKey)) return error(404);

	const feedResult = await cacheable(
		`news_feed_${sourceKey}`,
		() => getFeed(sourceKey as FeedSourceKey),
		Time.hours(2)
	);

  return json(feedResult);
}
