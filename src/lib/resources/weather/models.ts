import type { WeatherDetails } from './weatherCodes';


export interface WeatherReport {
	updated: string;
	current: {
		temperature: number;
		weather: WeatherDetails;
	};
}
