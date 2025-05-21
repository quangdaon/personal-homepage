<script lang="ts">
	import type { GitHubRepository } from '$lib/resources/github/github';
	import Card from '../layout/Card.svelte';

	type Props = {
		repositories: GitHubRepository[];
	};

	const { repositories }: Props = $props();

	const getTags = (repo: GitHubRepository) => {
		const tags = [];

		// if (repo.org) tags.push(repo.org);
		if (repo.private) tags.push('private');
		return tags;
	};
</script>

<Card>
	<h3>Recent Repositories</h3>

	<ul>
		{#each repositories as repo}
			{@const tags = getTags(repo)}
			<li>
				<a href={repo.url}>{repo.title}</a>
				{#if tags.length}({tags.join(', ')}){/if}
				| {repo.language}
			</li>
		{/each}
	</ul>
</Card>
