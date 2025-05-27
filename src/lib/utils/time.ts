import { readable } from 'svelte/store';

export interface ClockValues {
	time: string;
	fullTime: string;
	date: string;
}

const getClock = (): ClockValues => {
	const now = new Date();

	const timeFormatter = new Intl.DateTimeFormat('en-US', { timeStyle: 'short', hour12: false });
	const fullTimeFormatter = new Intl.DateTimeFormat('en-US', { timeStyle: 'long', hour12: false });
	const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' });
	return {
		time: timeFormatter.format(now),
		fullTime: fullTimeFormatter.format(now),
		date: dateFormatter.format(now)
	};
};

export const currentTime = readable(getClock(), (set) => {
	setInterval(() => {
		set(getClock());
	}, 500);
});
