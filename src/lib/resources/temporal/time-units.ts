export type TimeUnit = (number & { __brand: 'TimeUnit' }) | null;

export const Time = {
	never: null as TimeUnit,
	seconds: (s: number): TimeUnit => (s * 1000) as TimeUnit,
	minutes: (m: number): TimeUnit => (m * 60 * 1000) as TimeUnit,
	hours: (h: number): TimeUnit => (h * 60 * 60 * 1000) as TimeUnit,
	days: (d: number): TimeUnit => (d * 24 * 60 * 60 * 1000) as TimeUnit
};
