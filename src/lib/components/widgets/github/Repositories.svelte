<script lang="ts">
	import IconButton from '$lib/components/utils/IconButton.svelte';
	import type { GitHubRepository } from '$lib/resources/github';
	import Card from '../../layout/Card.svelte';
	import Tile from '../../layout/Tile.svelte';
	import FormattedDate from '../../utils/FormattedDate.svelte';
	import Paginator from '../../utils/Paginator.svelte';

	type Props = {
		repositories: GitHubRepository[];
	};

	let { repositories }: Props = $props();
	let loading = $state(false);

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
	
	const refreshRepos = async () => {
		loading = true;
		const resp = await fetch('/api/github/repositories?bustCache=true');
		repositories = await resp.json();
		loading = false;
	};
</script>

<Card>
	{#snippet title()}
		Recent Repositories
	{/snippet}

	{#snippet controls()}
		<IconButton {loading} label="Refresh" icon="mdi:refresh" onclick={refreshRepos} />
	{/snippet}

	<ul>
		{#each pageRepos as repo}
			{@const title = getTitle(repo)}
			<li>
				<a href={repo.url}>
					<Tile>
						<h4>
							{#if repo.private}🔒{/if}
							{title}
						</h4>
						<p class="detail">
							<b>{repo.language}</b> |
							<i>Last Updated <FormattedDate date={repo.updated} format="full" /></i>
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
		margin: 0;
	}
	li {
		margin: 0 0 1em;
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
