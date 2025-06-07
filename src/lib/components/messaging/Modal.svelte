<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		open?: boolean;
		children: Snippet;
		title?: Snippet;
		onClosed?: () => void;
	}

	let { open = false, children, title, onClosed }: Props = $props();
	let contentElement: HTMLElement | undefined = $state();

	const bindKeydown = (evt: KeyboardEvent) => {
		if (evt.key === 'Escape') {
			evt.preventDefault();
			onClosed?.();
		}
	};

	const handleWrapperClick = (evt: MouseEvent) => {
		const target = evt.target as HTMLElement;

		if (contentElement && contentElement.contains(target)) return;

		onClosed?.();
	};
</script>

<svelte:document onkeydown={bindKeydown} />

<!-- TODO: Migrate to <dialog> if they ever fix the discrepancy between oepn vs .showModal -->

{#if open}
	<div class="wrapper" onclick={handleWrapperClick} tabindex="-1" aria-hidden="true">
		<div class="content" bind:this={contentElement}>
			<h3 class="header">
				{@render title?.()}
				<button class="close" onclick={() => onClosed?.()}>&times;</button>
			</h3>
			<div class="body">
				{@render children()}
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.wrapper {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: rgba(#000, 0.7);
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.header {
		display: flex;
		padding: 0.25em 0.5em 0 1em;
		margin: 0;
	}

	.close {
		font-size: 2em;
		color: inherit;
		background: none;
		border: none;
		margin-left: auto;
		padding: 0;
		line-height: 0.65;
	}

	.content {
		min-width: 30vw;
		max-width: 60vw;
		margin: auto;
		background: #000;
	}

	.body {
		padding: 0 1em 1em;
	}
</style>
