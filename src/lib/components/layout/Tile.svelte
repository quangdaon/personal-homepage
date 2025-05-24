<script lang="ts">
	const { children } = $props();
</script>

<div class="tile">
	{@render children()}
</div>

<style lang="scss">

  .tile {
    display: block;
    background: rgba(#050505, 0.9);
    padding: 0.5em;
    border-radius: 0.5em;
  }
</style>
