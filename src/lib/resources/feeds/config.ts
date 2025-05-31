import type { FeedDetails } from './models';

export const feedSources = {
	general: [
		{
			title: 'New York Times',
			url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
			icon: '/images/icons/feeds/nyt.png'
		},
		{
			title: 'NBC News',
			url: 'http://feeds.nbcnews.com/feeds/topstories',
			icon: '/images/icons/feeds/nbc.png'
		},
		{
			title: 'Google News',
			url: 'https://news.google.com/news/rss/headlines/section/topic/NATION?ned=us&hl=en&gl=US',
			icon: '/images/icons/feeds/google-news.png'
		},
		{ title: 'CNN', url: 'http://rss.cnn.com/rss/edition.rss', icon: '/images/icons/feeds/cnn.png' }
	],
	local: [
		{
			title: 'WISN 12',
			url: 'https://www.wisn.com/local-news-rss',
			icon: '/images/icons/feeds/wisn12.png'
		},
		{
			title: 'Spectrum News',
			url: 'http://spectrumlocalnews.com/services/contentfeed.wi%7Cmilwaukee%7Cnews.landing.rss',
			icon: '/images/icons/feeds/spectrum-news.png'
		}
	],
	tech: [
		{
			title: 'The Hacker News',
			url: 'https://feeds.feedburner.com/TheHackersNews',
			icon: '/images/icons/feeds/hacker-news.png'
		},
		{
			title: 'CNET News',
			url: 'http://feeds.feedburner.com/cnet/tcoc.xml',
			icon: '/images/icons/feeds/cnet.png'
		},
		{
			title: 'TechCrunch',
			url: 'https://techcrunch.com/feed/',
			icon: '/images/icons/feeds/techcrunch.png'
		},
		{
			title: 'NASA',
			url: 'https://www.nasa.gov/rss/dyn/breaking_news.rss',
			icon: '/images/icons/feeds/nasa.png'
		}
	]
} satisfies Record<string, FeedDetails[]>;

export type FeedSourceKey = keyof typeof feedSources;
