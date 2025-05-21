<script lang="ts">
	import GitHubRepositories from '$lib/components/GitHubRepositories.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	};

	const { data }: Props = $props();
	const { gitHubRepositories } = data;
</script>

<GitHubRepositories repositories={gitHubRepositories} />
