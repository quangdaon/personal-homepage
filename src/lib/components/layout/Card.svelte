<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		title?: Snippet;
		controls?: Snippet;
	}

	const { children, title, controls }: Props = $props();
</script>

<div class="card">
	{#if title || controls}
		<h3>
			{@render title?.()}
			{#if controls}
				<div class="controls">
					{@render controls()}
				</div>
			{/if}
		</h3>
	{/if}
	{@render children()}
</div>

<style lang="scss">
	.card {
		padding: 1em;
		color: var(--color-foreground);
		background: var(--color-card);
		backdrop-filter: var(--effect-card);
		margin: 1em;
		border-radius: 1em;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		:global(a) {
			color: inherit;
		}

		h3 {
			display: flex;
			justify-content: space-between;
		}

		.controls {
			display: none;
		}

		&:hover .controls {
			display: block;
		}
	}
</style>
