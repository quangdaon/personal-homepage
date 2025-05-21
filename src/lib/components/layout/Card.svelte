<script lang="ts">
	const { children } = $props();
</script>

<div class="card">
	{@render children()}
</div>

<style>
	.card {
		padding: 1em;
    color: var(--color-foreground);
		background: var(--color-card);
		backdrop-filter: blur(0.5em);
    margin: 1em;
    border-radius: 1em;
	}

	.card :global(a) {
		color: inherit;
	}
</style>
