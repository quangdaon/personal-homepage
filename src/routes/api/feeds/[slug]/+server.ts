import { getFeed, isValidFeed, type FeedSourceKey } from '$lib/resources/feeds';
import { error, json } from '@sveltejs/kit';

export async function GET({ params }) {
  const sourceKey = params.slug;

  if (!isValidFeed(sourceKey)) return error(404);
  
  return json(await getFeed(sourceKey as FeedSourceKey));
}
