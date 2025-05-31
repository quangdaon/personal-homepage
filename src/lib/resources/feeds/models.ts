import type { DateLike } from '$lib/resources/temporal';
import { z } from 'zod';
import type { FeedDetailsSchema, FeedSourcesSchema } from './schemas';

export type FeedDetails = z.infer<typeof FeedDetailsSchema>;
export type FeedSources = z.infer<typeof FeedSourcesSchema>;

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
