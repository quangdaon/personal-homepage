import type { DateLike } from '$lib/resources/temporal';

export interface FeedDetails {
	title: string;
	url: string;
	icon: string;
}

export interface FeedItem {
	title: string;
	url: string;
	summary: string;
	date: DateLike;
	source: {
		title: string;
		icon: string;
	};
}
