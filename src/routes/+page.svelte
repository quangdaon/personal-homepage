<script lang="ts">
	import GitHubRepositories from '$lib/components/widgets/GitHubRepositories.svelte';
	import Weather from '$lib/components/widgets/Weather.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const { gitHubRepositories, weather } = data;
</script>

<Weather {weather} />
<GitHubRepositories repositories={gitHubRepositories} />
