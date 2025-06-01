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

export const formatDateString = (date: DateLike, format: DateFormat) => {
	const parsedDate = new Date(date);
	const options = dateTimeFormats[format](parsedDate);

	return formatDate(parsedDate, options);
};

export const formatDate = (
	convertedDate: Date,
	options: Intl.DateTimeFormatOptions | null = null
) => {
	const formatter = new Intl.DateTimeFormat('en-US', options ?? { dateStyle: 'long' });
	return formatter.format(convertedDate);
};

export const formatIsoDate = (date: Date) =>
	date.getFullYear() +
	'-' +
	(date.getMonth() + 1).toString().padStart(2, '0') +
	'-' +
	date.getDate().toString().padStart(2, '0');
