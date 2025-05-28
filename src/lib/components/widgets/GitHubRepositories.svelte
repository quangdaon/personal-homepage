<script lang="ts">
	import type { GitHubRepository } from '$lib/resources/github';
	import Card from '../layout/Card.svelte';
	import Tile from '../layout/Tile.svelte';
	import FormattedDateTime from '../utils/FormattedDateTime.svelte';
	import Paginator from '../utils/Paginator.svelte';

	type Props = {
		repositories: GitHubRepository[];
	};

	const { repositories }: Props = $props();

	const pageSize = 6;
	let page: number = $state(1);
	let pageStartIndex = $derived((page - 1) * pageSize);
	let maxPage = $derived(Math.ceil(repositories.length / pageSize));
	let pageRepos = $derived(repositories.slice(pageStartIndex, pageStartIndex + pageSize));

	const getTitle = (repo: GitHubRepository) => {
		let title = repo.title;

		if (repo.org) title += ` (${repo.org})`;

		return title;
	};
</script>

<Card>
	<h3>Recent Repositories</h3>

	<ul>
		{#each pageRepos as repo}
			{@const title = getTitle(repo)}
			<li>
				<a href={repo.url}>
					<Tile>
						<h4>{#if repo.private}🔒{/if} {title}</h4>
						<p class="detail">
							<b>{repo.language}</b> |
							<i>Last Updated <FormattedDateTime date={repo.updated?.toString()} /></i>
						</p>
					</Tile>
				</a>
			</li>
		{/each}
	</ul>

	<Paginator current={page} max={maxPage} onNavigated={(p) => (page = p)} />
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
