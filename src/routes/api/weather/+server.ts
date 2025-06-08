import { cacheable } from '$lib/resources/caching';
import { Time } from '$lib/resources/temporal';
import { getWeather } from '$lib/resources/weather';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const result = await cacheable('weather_report', {
		resolver: () => getWeather(),
		duration: Time.minutes(5),
		bust: !!url.searchParams.get('bustCache')
	});
	
	return json(result);
}
