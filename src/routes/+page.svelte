<script lang="ts">
	import Clock from '$lib/components/widgets/Clock.svelte';
	import GitHubRepositories from '$lib/components/widgets/GitHubRepositories.svelte';
	import NewsFeed from '$lib/components/widgets/NewsFeed.svelte';
	import Weather from '$lib/components/widgets/Weather.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const { gitHubRepositories, weather, feeds, aiSummaryEnabled } = data;
</script>

<main class="container">
	<div class="header">
		<Clock />
	</div>
	<div class="content">
		<div class="news">
			<NewsFeed {feeds} {aiSummaryEnabled} />
		</div>
		<div class="aside">
			<Weather {weather} />
			<GitHubRepositories repositories={gitHubRepositories} />
		</div>
	</div>
</main>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.header {
		flex: 0  0 1;
		margin: 2em 0 0;
	}

	.content {
		display: flex;
		flex: 1 1 auto;
	}

	.news {
		flex: 0 0 70%;
		display: flex;
		flex-direction: column;
		:global(.card) {
			flex: 1 1 0;
		}
	}

	.aside {
		flex: 1 1 auto;
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