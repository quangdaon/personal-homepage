export type DateLike = string | Date;

function isToday(date: Date) {
	const today = new Date();
	return (
		date.getFullYear() === today.getFullYear() &&
		date.getMonth() === today.getMonth() &&
		date.getDate() === today.getDate()
	);
}

const dateTimeFormats = {
	date() {
		return { dateStyle: 'long' };
	},
	fullDate() {
		return { dateStyle: 'full' };
	},
	time() {
		return { timeStyle: 'short', hour12: false };
	},
	fullTime() {
		return { timeStyle: 'long', hour12: false };
	},
	full() {
		return {
			dateStyle: 'long',
			timeStyle: 'short',
			hour12: false
		};
	},
	relative(date: Date) {
		return isToday(date)
			? { timeStyle: 'short', hour12: false }
			: { month: 'short', day: '2-digit' };
	}
} satisfies Record<string, (date: Date) => Intl.DateTimeFormatOptions>;

export type DateFormat = keyof typeof dateTimeFormats;

export const formatDateString = (date: DateLike, format: DateFormat) =>
	formatDate(new Date(date), format);

export const formatDate = (convertedDate: Date, format: DateFormat) => {
	const options = dateTimeFormats[format](convertedDate);
	const formatter = new Intl.DateTimeFormat('en-US', options);
	return formatter.format(convertedDate);
};

export const formatIsoDate = (date: Date) =>
	date.getFullYear() +
	'-' +
	(date.getMonth() + 1).toString().padStart(2, '0') +
	'-' +
	date.getDate().toString().padStart(2, '0');
