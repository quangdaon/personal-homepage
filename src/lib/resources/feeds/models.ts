import type { DateLike } from '$lib/utils/date';

export interface FeedDetails {
	title: string;
	url: string;
}

export interface FeedItem {
	title: string;
	url: string;
	summary: string;
	date: DateLike;
	source: {
		title: string;
	};
}
