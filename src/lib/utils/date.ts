export const convertDate = (date: Date) =>
	new Date(date.setMinutes(date.getMinutes() + date.getTimezoneOffset()));

export const formatDateTimeString = (date: string) =>
	formatDateString(date, { dateStyle: 'long', timeStyle: 'medium' });

export const formatDateString = (
	date: string,
	options: Intl.DateTimeFormatOptions | null = null
) => {
	const parsedDate = new Date(date);
	const convertedDate = convertDate(parsedDate);

	return formatDate(convertedDate, options);
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
