<script lang="ts">
	const { children } = $props();
</script>

<div class="tile">
	{@render children()}
</div>

<style lang="scss">
	.tile {
		display: block;
		background: linear-gradient(45deg, rgba(#f8e607, 0.3), rgba(#040a18, 0.9));
		background-size: 200% 100%;
		background-position: 100% 0;
		padding: 0.5em;
		border-radius: 0.5em;
		transition: all 200ms;
		&:hover {
			background-position: 0 0;
		}
	}
</style>
