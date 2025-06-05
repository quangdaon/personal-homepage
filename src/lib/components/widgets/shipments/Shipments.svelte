<script lang="ts">
	import Card from '$lib/components/layout/Card.svelte';
	import Tile from '$lib/components/layout/Tile.svelte';
	import type { ShipmentDetails } from '$lib/resources/shipments';

	interface Props {
		shipments: ShipmentDetails[];
	}

	const { shipments }: Props = $props();
</script>

<Card>
	{#snippet title()}
		Upcoming Deliveries
	{/snippet}
	<ul>
		{#each shipments as shipment}
			<li>
				<a href={shipment.trackingUrl}>
					<Tile>
						<h4>{shipment.label}</h4>
						<p class="detail">
							{shipment.message}
						</p>
					</Tile>
				</a>
			</li>
		{/each}
	</ul>
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
