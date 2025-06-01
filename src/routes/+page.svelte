<script lang="ts">
	import Clock from '$lib/components/widgets/Clock.svelte';
	import GitHubRepositories from '$lib/components/widgets/GitHubRepositories.svelte';
	import NewsFeed from '$lib/components/widgets/NewsFeed.svelte';
	import Shipments from '$lib/components/widgets/shipments/Shipments.svelte';
	import Weather from '$lib/components/widgets/Weather.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const { gitHubRepositories, weather, feeds, shipments, aiSummaryEnabled } = data;
</script>

<main class="container">
	<div class="header">
		<Clock />
	</div>
	<div class="content">
		<div class="aside">
			<Weather {weather} />
			<Shipments {shipments} />
		</div>
		<div class="news">
			<NewsFeed {feeds} {aiSummaryEnabled} />
		</div>
		<div class="aside">
			<GitHubRepositories repositories={gitHubRepositories} />
		</div>
	</div>
</main>

<style lang="scss">
	.container {
		@media only screen and (min-width: 1200px) {
			height: 100vh;
			display: flex;
			flex-direction: column;
		}
	}

	.header {
		flex: 0 0 1;
		margin: 2em 0 0;
	}

	.content {
		@media only screen and (min-width: 1200px) {
			display: flex;
			flex: 1 1 auto;
		}
	}

	.news {
		:global(.card) {
			flex: 1 1 0;
		}
		@media only screen and (min-width: 1200px) {
			flex: 0 0 60%;
			display: flex;
			flex-direction: column;
		}
	}

	.aside {
		flex: 1 1 0;
		display: flex;
		flex-direction: column;
		:global(.card) {
			flex: 0 0 auto;
		}
		:global(.card:last-child) {
			flex: 1 1 0;
		}
	}
</style>
