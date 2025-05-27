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
	const { gitHubRepositories, weather, feeds } = data;
</script>

<Clock />
<Weather {weather} />
<GitHubRepositories repositories={gitHubRepositories} />
<NewsFeed title="General News" feed={feeds.general} />
