import { fetchWeatherApi } from 'openmeteo';
import { weatherCodes, WMO_UNKNOWN, type WeatherDetails } from './weatherCodes';

export interface WeatherReport {
	updated: string;
	current: {
		temperature: number;
		weather: WeatherDetails;
	};
}

export const getWeather = async (): Promise<WeatherReport> => {
	const params = {
		latitude: [43.08],
		longitude: [-88.04],
		current: 'temperature_2m,weather_code',
		hourly: 'temperature_2m,weather_code,precipitation',
		daily: 'weather_code,temperature_2m_max,temperature_2m_min',
		temperature_unit: 'fahrenheit'
	};
	const url = 'https://api.open-meteo.com/v1/forecast';
	const responses = await fetchWeatherApi(url, params);

	const response = responses[0];

	const utcOffsetSeconds = response.utcOffsetSeconds();
	const current = response.current()!;

  const weatherCode = current.variables(1)!.value();
  
  console.log(current.time());
	return {
		updated: new Date((Number(current.time()) + utcOffsetSeconds) * 1000).toISOString(),
		current: {
			temperature: current.variables(0)!.value(),
			weather: weatherCode in weatherCodes ? weatherCodes[weatherCode] : WMO_UNKNOWN
		}
	};
};
