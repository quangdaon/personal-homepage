<script lang="ts">
	import type { FeedItem } from '$lib/resources/feeds';
	import Card from '../layout/Card.svelte';
	import Paginator from '../utils/Paginator.svelte';

	interface Props {
		title: string;
		feed: FeedItem[];
	}

	const { title, feed }: Props = $props();

	const pageSize = 8;
	let page: number = $state(1);
	let pageStartIndex = $derived((page - 1) * pageSize);
	let maxPage = $derived(Math.ceil(feed.length / pageSize));
	let feedItems = $derived(feed.slice(pageStartIndex, pageStartIndex + pageSize));
</script>

<Card>
	<h3>{title}</h3>
	<ul>
		{#each feedItems as entry}
			<li><a title={entry.source.title} href={entry.url}>{entry.title}</a></li>
		{/each}
	</ul>

	<Paginator current={page} max={maxPage} onNavigated={(p) => (page = p)} />
</Card>
