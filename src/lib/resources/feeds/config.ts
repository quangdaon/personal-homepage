import type { FeedDetails } from './models';

export const feedSources = {
	general: [
		{ title: 'New York Times', url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml' },
		{ title: 'NBC News', url: 'http://feeds.nbcnews.com/feeds/topstories' },
		{
			title: 'Google News',
			url: 'https://news.google.com/news/rss/headlines/section/topic/NATION?ned=us&hl=en&gl=US'
		},
		{ title: 'CNN', url: 'http://rss.cnn.com/rss/edition.rss' }
	],
	local: [
		{ title: 'WISN 12', url: 'https://www.wisn.com/local-news-rss' },
		{
			title: 'Spectrum News',
			url: 'http://spectrumlocalnews.com/services/contentfeed.wi%7Cmilwaukee%7Cnews.landing.rss'
		}
	],
	tech: [
		{ title: 'The Hacker News', url: 'https://feeds.feedburner.com/TheHackersNews' },
		{ title: 'CNET News', url: 'http://feeds.feedburner.com/cnet/tcoc.xml' },
		{ title: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
		{ title: 'NASA', url: 'https://www.nasa.gov/rss/dyn/breaking_news.rss' }
	]
} satisfies Record<string, FeedDetails[]>;

export type FeedSourceKey = keyof typeof feedSources;
