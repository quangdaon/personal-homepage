import { readable } from 'svelte/store';
import { formatDate } from './date';

export interface ClockValues {
	time: string;
	fullTime: string;
	date: string;
}

const getClock = (): ClockValues => {
	const now = new Date();

	return {
		time: formatDate(now, 'time'),
		fullTime: formatDate(now, 'fullTime'),
		date: formatDate(now, 'fullDate')
	};
};

export const currentTime = readable(getClock(), (set) => {
	setInterval(() => {
		set(getClock());
	}, 500);
});
