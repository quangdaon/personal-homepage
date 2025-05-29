import { generateAiSummary } from '$lib/resources/feeds';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const articles = await request.json();
  const summary = await generateAiSummary(articles);

  return json(summary);
}
