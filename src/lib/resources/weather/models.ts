export interface WeatherGroup {
	description: string;
}

export interface WeatherDetails {
	wmoCode?: number;
	description: string;
	group?: WeatherGroup;
}

export interface WeatherReport {
	updated: string;
	current: {
		temperature: number;
		weather: WeatherDetails;
	};
}
