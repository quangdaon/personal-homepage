<script lang="ts">
	import { browser } from '$app/environment';
	import IconButton from '$lib/components/utils/IconButton.svelte';
	import type { FeedItem } from '$lib/resources/feeds';
	import { tick } from 'svelte';
	import Card from '../../layout/Card.svelte';
	import Modal from '../../messaging/Modal.svelte';
	import FormattedDate from '../../utils/FormattedDate.svelte';
	import Paginator from '../../utils/Paginator.svelte';

	interface Props {
		feeds: Record<string, FeedItem[]>;
		aiSummaryEnabled: boolean;
	}

	const props: Props = $props();

	const aiSummaryEnabled = props.aiSummaryEnabled;
	let feeds = $state(props.feeds);

	const pageSize = !browser || document.body.clientWidth > 1200 ? 20 : 4;
	let activeFeed = $state('general');
	let feed = $derived(feeds[activeFeed]);
	let page: number = $state(1);
	let pageStartIndex = $derived((page - 1) * pageSize);
	let maxPage = $derived(Math.ceil(feed.length / pageSize));
	let feedItems = $derived(feed.slice(pageStartIndex, pageStartIndex + pageSize));

	let summaryAborter: AbortController | undefined;
	let isSummaryPending = $state(false);
	let summary = $state('');
	let summaryOpen = $state(false);

	let feedAborter: AbortController | undefined;
	let isFeedPending = $state(false);

	interface FeedSelector {
		value: string;
		label: string;
	}

	const feedSelectors: FeedSelector[] = [
		{ value: 'general', label: 'General' },
		{ value: 'local', label: 'Local' },
		{ value: 'tech', label: 'Tech' }
	];

	const setFeed = (val: string) => {
		if (summaryAborter) {
			summaryAborter.abort();
			isSummaryPending = false;
			feedAborter?.abort();
			isFeedPending = false;
		}
		if (val === activeFeed) return;
		activeFeed = val;
		page = 1;
	};

	const summarize = async () => {
		summaryAborter = new AbortController();

		isSummaryPending = true;
		summary = await generateSummary(activeFeed);
		isSummaryPending = false;

		if (!summaryAborter.signal.aborted) summaryOpen = true;
	};

	const generateSummary = async (key: string) => {
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

	const refreshFeed = async () => {
		feedAborter = new AbortController();
		const feedKey = activeFeed;
		isFeedPending = true;
		const resp = await fetch(`/api/feeds/${feedKey}?bustCache=true`);
		feeds = { ...feeds, [feedKey]: await resp.json() };
		isFeedPending = false;

		if (feedAborter.signal.aborted) return;

		page = 1;
	};
</script>

<Card>
	{#snippet title()}
		Latest News
	{/snippet}

	{#snippet controls()}
		{#if aiSummaryEnabled}
			<IconButton
				onclick={() => summarize()}
				loading={isSummaryPending}
				icon="subway:paragraph-5"
				label="Summarize"
			/>
		{/if}
		<IconButton onclick={refreshFeed} loading={isFeedPending} icon="mdi:refresh" label="Refresh" />
	{/snippet}

	<div class="nav">
		{#each feedSelectors as selector}
			<button onclick={() => setFeed(selector.value)} class:active={activeFeed === selector.value}>
				{selector.label}
			</button>
		{/each}
	</div>
	<ul class="feed-list">
		{#each feedItems as entry}
			<li class="feed-item">
				<img
					class="feed-icon"
					src={entry.source.icon}
					alt={entry.source.title}
					title={entry.source.title}
				/>
				{#if entry.date}
					<FormattedDate date={entry.date} format="relative" /> &mdash;
				{/if}
				<a href={entry.url}>{entry.title}</a>
			</li>
		{/each}
	</ul>

	<Paginator current={page} max={maxPage} onNavigated={(p) => (page = p)} />
</Card>

<Modal open={summaryOpen} onClosed={() => (summaryOpen = false)}>
	{#snippet title()}
		{feedSelectors.find((e) => e.value === activeFeed)?.label} News Summary
	{/snippet}
	{summary}
</Modal>

<style lang="scss">
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

	.feed {
		&-list {
			list-style-type: none;
			padding: 0;
		}
		&-icon {
			display: inline-block;
			vertical-align: middle;
			width: 1.2em;
			margin-right: 0.25em;
			aspect-ratio: 1;
		}
	}
</style>
