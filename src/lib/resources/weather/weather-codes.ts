import type { WeatherGroup, WeatherDetails } from './models';

// #region Groups
const WMO_GROUP_CLEAR: WeatherGroup = {
	description: 'Clear'
};

const WMO_GROUP_CLOUDY: WeatherGroup = {
	description: 'Cloudy'
};

const WMO_GROUP_FOG: WeatherGroup = {
	description: 'Fog'
};

const WMO_GROUP_DRIZZLE: WeatherGroup = {
	description: 'Drizzle'
};

const WMO_GROUP_FREEZING_DRIZZLE: WeatherGroup = {
	description: 'Freezing Drizzle'
};

const WMO_GROUP_RAIN: WeatherGroup = {
	description: 'Rain'
};

const WMO_GROUP_FREEZING_RAIN: WeatherGroup = {
	description: 'Freezing Rain'
};

const WMO_GROUP_SNOW: WeatherGroup = {
	description: 'Snow'
};

const WMO_GROUP_SNOW_GRAINS: WeatherGroup = {
	description: 'Snow Grains'
};

const WMO_GROUP_RAIN_SHOWERS: WeatherGroup = {
	description: 'Rain Showers'
};

const WMO_GROUP_SNOW_SHOWERS: WeatherGroup = {
	description: 'Snow Showers'
};

const WMO_GROUP_THUNDERSTORM: WeatherGroup = {
	description: 'Thunderstorm'
};

const WMO_GROUP_THUNDERSTORM_HAIL: WeatherGroup = {
	description: 'Thunderstorm w/ Hail'
};
// #endregion

// #region Details
const WMO_0_CLEAR: WeatherDetails = {
	wmoCode: 0,
	description: 'Clear',
	group: WMO_GROUP_CLEAR
};

const WMO_1_MOSTLY_CLEAR: WeatherDetails = {
	wmoCode: 1,
	description: 'Mostly Clear',
	group: WMO_GROUP_CLOUDY
};

const WMO_2_PARTLY_CLOUDY: WeatherDetails = {
	wmoCode: 2,
	description: 'Partly Cloudy',
	group: WMO_GROUP_CLOUDY
};

const WMO_3_OVERCAST: WeatherDetails = {
	wmoCode: 3,
	description: 'Overcast',
	group: WMO_GROUP_CLOUDY
};

const WMO_45_FOG: WeatherDetails = {
	wmoCode: 45,
	description: 'Foggy',
	group: WMO_GROUP_FOG
};

const WMO_48_RIME_FOG: WeatherDetails = {
	wmoCode: 48,
	description: 'Depositing Rime Fog',
	group: WMO_GROUP_FOG
};

const WMO_51_LIGHT_DRIZZLE: WeatherDetails = {
	wmoCode: 51,
	description: 'Light Drizzle',
	group: WMO_GROUP_DRIZZLE
};

const WMO_53_MODERATE_DRIZZLE: WeatherDetails = {
	wmoCode: 53,
	description: 'Moderate Drizzle',
	group: WMO_GROUP_DRIZZLE
};

const WMO_55_DENSE_DRIZZLE: WeatherDetails = {
	wmoCode: 55,
	description: 'Dense Drizzle',
	group: WMO_GROUP_DRIZZLE
};

const WMO_56_LIGHT_FREEZING_DRIZZLE: WeatherDetails = {
	wmoCode: 56,
	description: 'Light Freezing Drizzle',
	group: WMO_GROUP_FREEZING_DRIZZLE
};

const WMO_57_DENSE_FREEZING_DRIZZLE: WeatherDetails = {
	wmoCode: 57,
	description: 'Dense Freezing Drizzle',
	group: WMO_GROUP_FREEZING_DRIZZLE
};

const WMO_61_LIGHT_RAIN: WeatherDetails = {
	wmoCode: 61,
	description: 'Light Rain',
	group: WMO_GROUP_RAIN
};

const WMO_63_MODERATE_RAIN: WeatherDetails = {
	wmoCode: 63,
	description: 'Moderate Rain',
	group: WMO_GROUP_RAIN
};

const WMO_65_HEAVY_RAIN: WeatherDetails = {
	wmoCode: 65,
	description: 'Heavy Rain',
	group: WMO_GROUP_RAIN
};

const WMO_66_LIGHT_FREEZING_RAIN: WeatherDetails = {
	wmoCode: 66,
	description: 'Light Freezing Rain',
	group: WMO_GROUP_FREEZING_RAIN
};

const WMO_67_HEAVY_FREEZING_RAIN: WeatherDetails = {
	wmoCode: 67,
	description: 'Heavy Freezing Rain',
	group: WMO_GROUP_FREEZING_RAIN
};

const WMO_71_LIGHT_SNOW: WeatherDetails = {
	wmoCode: 71,
	description: 'Light Snow',
	group: WMO_GROUP_SNOW
};

const WMO_73_MODERATE_SNOW: WeatherDetails = {
	wmoCode: 73,
	description: 'Moderate Snow',
	group: WMO_GROUP_SNOW
};

const WMO_75_HEAVY_SNOW: WeatherDetails = {
	wmoCode: 75,
	description: 'Heavy Snow',
	group: WMO_GROUP_SNOW
};

const WMO_77_SNOW_GRAINS: WeatherDetails = {
	wmoCode: 77,
	description: 'Snow Grains',
	group: WMO_GROUP_SNOW_GRAINS
};

const WMO_80_SLIGHT_RAIN_SHOWERS: WeatherDetails = {
	wmoCode: 80,
	description: 'Slight Rain Showers',
	group: WMO_GROUP_RAIN_SHOWERS
};

const WMO_81_MODERATE_RAIN_SHOWERS: WeatherDetails = {
	wmoCode: 81,
	description: 'Moderate Rain Showers',
	group: WMO_GROUP_RAIN_SHOWERS
};

const WMO_82_VIOLENT_RAIN_SHOWERS: WeatherDetails = {
	wmoCode: 82,
	description: 'Violent Rain Showers',
	group: WMO_GROUP_RAIN_SHOWERS
};

const WMO_85_SLIGHT_SNOW_SHOWERS: WeatherDetails = {
	wmoCode: 85,
	description: 'Slight Snow Showers',
	group: WMO_GROUP_SNOW_SHOWERS
};

const WMO_86_HEAVY_SNOW_SHOWERS: WeatherDetails = {
	wmoCode: 86,
	description: 'Heavy Snow Showers',
	group: WMO_GROUP_SNOW_SHOWERS
};

const WMO_95_THUNDERSTORM: WeatherDetails = {
	wmoCode: 95,
	description: 'Thunderstorm',
	group: WMO_GROUP_THUNDERSTORM
};

const WMO_96_THUNDERSTORM_SLIGHT_HAIL: WeatherDetails = {
	wmoCode: 96,
	description: 'Thunderstorm w/ Slight Hail',
	group: WMO_GROUP_THUNDERSTORM_HAIL
};

const WMO_99_THUNDERSTORM_HEAVY_HAIL: WeatherDetails = {
	wmoCode: 99,
	description: 'Thunderstorm w/ Heavy Hail',
	group: WMO_GROUP_THUNDERSTORM_HAIL
};

export const WMO_UNKNOWN: WeatherDetails = {
	description: 'Unknown'
};
// #endregion

export const weatherCodes: Record<number, WeatherDetails> = {
	0: WMO_0_CLEAR,
	1: WMO_1_MOSTLY_CLEAR,
	2: WMO_2_PARTLY_CLOUDY,
	3: WMO_3_OVERCAST,
	45: WMO_45_FOG,
	48: WMO_48_RIME_FOG,
	51: WMO_51_LIGHT_DRIZZLE,
	53: WMO_53_MODERATE_DRIZZLE,
	55: WMO_55_DENSE_DRIZZLE,
	56: WMO_56_LIGHT_FREEZING_DRIZZLE,
	57: WMO_57_DENSE_FREEZING_DRIZZLE,
	61: WMO_61_LIGHT_RAIN,
	63: WMO_63_MODERATE_RAIN,
	65: WMO_65_HEAVY_RAIN,
	66: WMO_66_LIGHT_FREEZING_RAIN,
	67: WMO_67_HEAVY_FREEZING_RAIN,
	71: WMO_71_LIGHT_SNOW,
	73: WMO_73_MODERATE_SNOW,
	75: WMO_75_HEAVY_SNOW,
	77: WMO_77_SNOW_GRAINS,
	80: WMO_80_SLIGHT_RAIN_SHOWERS,
	81: WMO_81_MODERATE_RAIN_SHOWERS,
	82: WMO_82_VIOLENT_RAIN_SHOWERS,
	85: WMO_85_SLIGHT_SNOW_SHOWERS,
	86: WMO_86_HEAVY_SNOW_SHOWERS,
	95: WMO_95_THUNDERSTORM,
	96: WMO_96_THUNDERSTORM_SLIGHT_HAIL,
	99: WMO_99_THUNDERSTORM_HEAVY_HAIL,
	9999: WMO_UNKNOWN
};
