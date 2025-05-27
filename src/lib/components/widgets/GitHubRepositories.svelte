<script lang="ts">
	import type { GitHubRepository } from '$lib/resources/github';
	import Card from '../layout/Card.svelte';
	import Tile from '../layout/Tile.svelte';
	import FormattedDateTime from '../utils/FormattedDateTime.svelte';

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

	const getTitle = (repo: GitHubRepository) => {
		let title = repo.title;

		if(repo.org) title += ` (${repo.org})`

		return title;
	};
</script>

<Card>
	<h3>Recent Repositories</h3>

	<ul>
		{#each repositories as repo}
			{@const title = getTitle(repo)}
			<li>
				<a href={repo.url}>
					<Tile>
						<h4>{title}</h4>
						<p class="detail">
							<b>{repo.language}</b> |
							<i>Last Updated <FormattedDateTime date={repo.updated?.toString()} /></i>
						</p>
					</Tile>
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
	li {
		margin: 1em 0;
		line-height: 1;

		a {
			text-decoration: none;
			&:hover {
				h4 {
					text-decoration: underline;
				}
			}
		}
	}

	.detail {
		font-size: 0.75em;
	}
</style>
