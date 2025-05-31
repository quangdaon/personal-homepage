<script lang="ts">
	interface Props {
		current: number;
		max: number;
		onNavigated: (page: number) => void;
		hideRelativeControls?: boolean;
	}

	const { current, max, onNavigated, hideRelativeControls = max < 5 }: Props = $props();

	const getOptions = (current: number, max: number) => {
		const start = Math.max(1, Math.min(max - 4, current - 2));
		const end = Math.min(max, start + 4);
		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	};

	const options = $derived(getOptions(current, max));
</script>

<div class="paginator">
	{#if !hideRelativeControls}
		<button class="relative" disabled={current <= 1} onclick={() => onNavigated(1)}>&laquo;</button>
		<button class="relative" disabled={current <= 1} onclick={() => onNavigated(current - 1)}
			>&lsaquo;</button
		>
	{/if}
	{#each options as option}
		<button disabled={option === current} onclick={() => onNavigated(option)}>{option}</button>
	{/each}
	{#if !hideRelativeControls}
		<button class="relative" disabled={current >= max} onclick={() => onNavigated(current + 1)}
			>&rsaquo;</button
		>
		<button
			class="relative"
			disabled={current >= max}
			title="Page {max}"
			onclick={() => onNavigated(max)}>&raquo;</button
		>
	{/if}
</div>

<style lang="scss">
	.paginator {
		display: flex;
		justify-content: center;
		margin-top: auto;
		button {
			cursor: pointer;
			margin: 0 0.125em;
			background: none;
			border: none;
			color: inherit;
			opacity: 0.7;
			font-family: var(--font-mono);
			&:disabled,
			&:hover {
				opacity: 1;
			}
			&:disabled {
				cursor: default;
			}
			&.relative:disabled {
				opacity: 0.2;
			}
		}
	}
</style>
