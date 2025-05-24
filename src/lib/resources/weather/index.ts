import { fetchWeatherApi } from 'openmeteo';
import { weatherCodes, type WeatherDetails } from './weatherCodes';

interface Weather {
	updated: string;
	temperature: number;
	weather: WeatherDetails;
}

export const getWeather = async (): Promise<Weather> => {
	const params = {
		latitude: [43.08],
		longitude: [-88.04],
		current: 'temperature_2m,weather_code,wind_speed_10m,wind_direction_10m',
		hourly: 'temperature_2m,precipitation',
		daily: 'weather_code,temperature_2m_max,temperature_2m_min',
		temperature_unit: 'fahrenheit'
	};
	const url = 'https://api.open-meteo.com/v1/forecast';
	const responses = await fetchWeatherApi(url, params);

	const response = responses[0];

	const utcOffsetSeconds = response.utcOffsetSeconds();
	const current = response.current()!;

  const weatherCode = current.variables(1)!.value();
	return {
		updated: new Date((Number(current.time()) + utcOffsetSeconds) * 1000).toISOString(),
		temperature: current.variables(0)!.value(),
		weather: weatherCodes[weatherCode]
	};
};
