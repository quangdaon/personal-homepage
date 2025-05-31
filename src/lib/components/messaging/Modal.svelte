<script lang="ts">
	interface Props {
		open?: boolean;
		children: () => any;
		onClosed: () => void;
	}

	let { open = false, children, onClosed }: Props = $props();

	const bindKeydown = (evt: KeyboardEvent) => {
		if (evt.key === 'Escape') {
			evt.preventDefault();
			onClosed();
		}
	};
</script>

<svelte:document onkeydown={bindKeydown} />

<!-- TODO: Migrate to <dialog> if they ever fix the discrepancy between oepn vs .showModal -->

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="wrapper" onclick={() => onClosed()}>
		<div class="content">
			<button class="close" onclick={() => onClosed()}>&times;</button>
			{@render children()}
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

	.close {
		float: right;
		font-size: 2em;
		color: inherit;
		background: none;
		border: none;
	}

	.content {
		max-width: 60vw;
		margin: auto;
		padding: 1em;
		background: #000;
	}
</style>
