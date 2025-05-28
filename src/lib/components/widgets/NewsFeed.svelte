<script lang="ts">
	import type { FeedItem, FeedSourceKey } from '$lib/resources/feeds';
	import Card from '../layout/Card.svelte';
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

	interface FeedSelector {
		value: FeedSourceKey;
		label: string;
	}

	const feedSelectors: FeedSelector[] = [
		{ value: 'general', label: 'General' },
		{ value: 'tech', label: 'Tech' }
	];

	const setFeed = (val: FeedSourceKey) => {
		if (val === activeFeed) return;
		activeFeed = val;
		page = 1;
	};
</script>

<Card>
	<h3>Latest News</h3>
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
