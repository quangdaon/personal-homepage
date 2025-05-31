import { OPENAI_SECRET_KEY } from '$env/static/private';
import OpenAI from 'openai';
import Parser from 'rss-parser';
import { feedSources } from './config';
import type { FeedDetails, FeedItem } from './models';
const parser = new Parser();

export const isValidFeed = (source: string) => source in feedSources;

export const getFeed = async (source: string): Promise<FeedItem[]> => {
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
				title: details.title,
				icon: details.icon
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
