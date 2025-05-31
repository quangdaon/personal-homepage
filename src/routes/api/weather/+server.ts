import { cacheable } from '$lib/resources/caching';
import { getWeather } from '$lib/resources/weather';
import { json } from '@sveltejs/kit';

export async function GET() {
	const result = await cacheable('weather_report', () => getWeather(), 5 * 60 * 1000);
	return json(result);
}
