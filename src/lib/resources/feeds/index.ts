import type { DateLike } from '$lib/utils/date';
import Parser from 'rss-parser';
const parser = new Parser();

interface FeedDetails {
	title: string;
	url: string;
}

const feedSources = {
	general: [
		{ title: 'New York Times', url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml' },
		{ title: 'NBC News', url: 'http://feeds.nbcnews.com/feeds/topstories' },
		{
			title: 'Google News',
			url: 'https://news.google.com/news/rss/headlines/section/topic/NATION?ned=us&hl=en&gl=US'
		}
	],
	tech: [
		{ title: 'The Hacker News', url: 'https://feeds.feedburner.com/TheHackersNews' },
		{ title: 'CNET News', url: 'http://feeds.feedburner.com/cnet/tcoc.xml' },
		{ title: 'TechCrunch', url: 'https://techcrunch.com/feed/' }
	]
} satisfies Record<string, FeedDetails[]>;

export type FeedSourceKey = keyof typeof feedSources;

export interface FeedItem {
	title: string;
	url: string;
	summary: string;
	date: DateLike;
	source: {
		title: string;
	};
}

export const isValidFeed = (source: string) => source in feedSources;

export const getFeed = async (source: FeedSourceKey): Promise<FeedItem[]> => {
	const feedDetails: FeedDetails[] = feedSources[source];
	const feeds = await Promise.all(
		feedDetails.map(async (details) => {
			const feed = await parser.parseURL(details.url);

			return {
				details,
				feed
			};
		})
	);

	const items = feeds.flatMap(({ details, feed }) => {
		const entries: FeedItem[] = feed.items.map((f) => ({
			title: f.title ?? '',
			url: f.link ?? '',
			summary: f.contentSnippet ?? '',
			date: f.isoDate ?? '',
			source: {
				title: details.title
			}
		}));

		return entries;
	});

	return items.toSorted((a, b) => (b.date > a.date ? 1 : -1));
};
