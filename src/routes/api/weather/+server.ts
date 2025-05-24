import { getWeather } from '$lib/resources/weather';
import { json } from '@sveltejs/kit';

export async function GET() {
  return json(await getWeather());
}
