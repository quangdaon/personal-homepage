<script lang="ts">
	import Clock from '$lib/components/widgets/Clock.svelte';
	import GitHubRepositories from '$lib/components/widgets/GitHubRepositories.svelte';
	import Weather from '$lib/components/widgets/Weather.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const { gitHubRepositories, weather } = data;
</script>

<Clock />
<Weather {weather} />
<GitHubRepositories repositories={gitHubRepositories} />
