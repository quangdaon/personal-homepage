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
			<li class="tile">
				<a href={repo.url}>
					<div>
						<h4>{repo.title}</h4>
						<p class="detail"><b>{repo.language}</b> | <i>Last Updated {repo.updated}</i></p>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</Card>

<style lang="scss">
	ul {
		list-style-type: none;
		padding: 0;
	}
	.tile {
		margin: 1em 0;
		line-height: 1;

		a {
			text-decoration: none;
			display: block;
			background: #050505;
			padding: 0.5em;
			border-radius: 0.5em;

			&:hover {
				h4 {
					text-decoration: underline;
				}
			}	
		}

		h4 {
			margin: 0 0 0.5em;
		}

		p {
			margin: 0;
		}
	}

	.detail {
		font-size: 0.75em;
	}
</style>
