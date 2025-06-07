<script lang="ts">
	import Loader from './Loader.svelte';

	interface Props {
		loading?: boolean;
		disabled?: boolean;
		label: string;
		icon: string;
		onclick: (evt: MouseEvent) => void;
	}

	const { label, icon, onclick, loading = false, disabled = false }: Props = $props();

	const isDisabled = $derived(loading || disabled);
</script>

<button disabled={isDisabled} {onclick} title={label} aria-label={label}>
	{#if loading}
		<Loader />
	{:else}
		<iconify-icon {icon}></iconify-icon>
	{/if}
</button>

<style>
	button {
		background: none;
		border: none;
		color: var(--color-foreground);
	}
</style>
