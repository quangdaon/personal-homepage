export type DateLike = string | Date;

export const formatDateTimeString = (date: DateLike) => {
	return formatDateString(date, {
		dateStyle: 'long',
		timeStyle: 'short',
		hour12: false
	});
};

export const formatDateString = (
	date: DateLike,
	options: Intl.DateTimeFormatOptions | null = null
) => {
	const parsedDate = new Date(date);

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
