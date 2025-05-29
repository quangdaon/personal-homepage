import { OPENAI_SECRET_KEY } from '$env/static/private';
import type { DateLike } from '$lib/utils/date';
import OpenAI from 'openai';
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

export const generateAiSummary = async (articles: string[]) => {
	const openai = new OpenAI({
		apiKey: OPENAI_SECRET_KEY
	});

	const gptMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
		{
			role: 'system',
			content:
				'Given a JSON list of news articles, generate a very brief TLDR-style summary of the most interesting or impactful developments. Output your response as a single short plaintext paragraph (e.g. no Markdown).'
		},
		{
			role: 'user',
			content: JSON.stringify(articles)
		}
	];

	const chatCompletion = await openai.chat.completions.create({
		messages: gptMessages,
		model: 'gpt-4o-mini',
		temperature: 1,
		max_completion_tokens: 240
	});

	const answer = chatCompletion.choices[0];

	return answer.message;
};
