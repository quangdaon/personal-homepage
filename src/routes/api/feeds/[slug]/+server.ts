import { cacheable } from '$lib/resources/caching/index.js';
import { getFeed, isValidFeed } from '$lib/resources/feeds';
import { Time } from '$lib/resources/temporal';
import { error, json } from '@sveltejs/kit';

export async function GET({ params, url }) {
	const sourceKey = params.slug;

	if (!isValidFeed(sourceKey)) return error(404);

	const feedResult = await cacheable(`news_feed_${sourceKey}`, {
		resolver: () => getFeed(sourceKey),
		duration: Time.hours(2),
		bust: !!url.searchParams.get('bustCache')
	});

	return json(feedResult);
}
