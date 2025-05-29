<script lang="ts">
	import type { FeedItem, FeedSourceKey } from '$lib/resources/feeds';
	import { tick } from 'svelte';
	import Card from '../layout/Card.svelte';
	import Loader from '../utils/Loader.svelte';
	import Paginator from '../utils/Paginator.svelte';

	interface Props {
		feeds: Record<string, FeedItem[]>;
	}

	const { feeds }: Props = $props();

	const pageSize = 20;
	let activeFeed: FeedSourceKey = $state('general');
	let feed = $derived(feeds[activeFeed]);
	let page: number = $state(1);
	let pageStartIndex = $derived((page - 1) * pageSize);
	let maxPage = $derived(Math.ceil(feed.length / pageSize));
	let feedItems = $derived(feed.slice(pageStartIndex, pageStartIndex + pageSize));

	let summariesCache: Partial<Record<FeedSourceKey, Promise<string>>> = {};
	let summaryAborter: AbortController | undefined;
	let isSummaryPending = $state(false);

	interface FeedSelector {
		value: FeedSourceKey;
		label: string;
	}

	const feedSelectors: FeedSelector[] = [
		{ value: 'general', label: 'General' },
		{ value: 'tech', label: 'Tech' }
	];

	const setFeed = (val: FeedSourceKey) => {
		if (summaryAborter) {
			summaryAborter.abort();
			isSummaryPending = false;
		}
		if (val === activeFeed) return;
		activeFeed = val;
		page = 1;
	};

	const summarize = async () => {
		summaryAborter = new AbortController();

		isSummaryPending = true;
		const summary = await getCacheableSummary(activeFeed);
		isSummaryPending = false;

		if (!summaryAborter.signal.aborted) alert(summary);
	};

	const getCacheableSummary = async (key: FeedSourceKey) => {
		const found = summariesCache[key];

		if (found) return await found;

		const summary = found ?? generateSummary(key);
		summariesCache[key] = summary;

		return summary;
	};

	const generateSummary = async (key: FeedSourceKey) => {
		const feed = feeds[key];
		const articles = feed.map((e) => e.summary);
		const response = await fetch('/api/feeds/summarize', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(articles)
		});

		const result = await response.json();

		return result.content;
	};
</script>

<Card>
	<h3>
		Latest News
		<button
			disabled={isSummaryPending}
			onclick={() => summarize()}
			title="Summarize"
			aria-label="Summarize"
		>
			{#if isSummaryPending}
				<Loader />
			{:else}
				<iconify-icon icon="subway:paragraph-5"></iconify-icon>
			{/if}
		</button>
	</h3>
	<div class="nav">
		{#each feedSelectors as selector}
			<button onclick={() => setFeed(selector.value)} class:active={activeFeed === selector.value}>
				{selector.label}
			</button>
		{/each}
	</div>
	<ul>
		{#each feedItems as entry}
			<li><a title={entry.source.title} href={entry.url}>{entry.title}</a></li>
		{/each}
	</ul>

	<Paginator current={page} max={maxPage} onNavigated={(p) => (page = p)} />
</Card>

<style lang="scss">
	h3 {
		display: flex;
		justify-content: space-between;
		button {
			background: none;
			border: none;
			color: var(--color-foreground);
		}
	}
	.nav {
		button {
			margin-right: 0.5em;
			border-radius: 1em;
			border: none;
			padding: 0.25em 0.75em;
			cursor: pointer;
			background: none;
			color: var(--color-foreground);
			font-size: 0.75em;
			&:hover {
				background: rgba(#fff, 0.2);
			}
			&.active {
				background: var(--color-foreground);
				color: #000;
			}
		}
	}
</style>
