import { cacheable } from '$lib/resources/caching';
import { Time } from '$lib/resources/temporal';
import { getWeather } from '$lib/resources/weather';
import { json } from '@sveltejs/kit';

export async function GET() {
	const result = await cacheable('weather_report', () => getWeather(), Time.minutes(5));
	return json(result);
}
