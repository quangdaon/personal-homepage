<script lang="ts">
	import Card from '$lib/components/layout/Card.svelte';
	import Tile from '$lib/components/layout/Tile.svelte';
	import IconButton from '$lib/components/utils/IconButton.svelte';
	import Loader from '$lib/components/utils/Loader.svelte';
	import type { ShipmentDetails } from '$lib/resources/shipments';
	import AddShipment from './AddShipment.svelte';

	interface Props {
		shipments: ShipmentDetails[];
	}

	let { shipments }: Props = $props();

	let addShipmentOpen = $state(false);
	let loading = $state(false);

	const startAddShipment = () => {
		addShipmentOpen = true;
	};

	const refreshShipments = async () => {
		loading = true;
		const resp = await fetch('/api/shipments');
		shipments = await resp.json();
		loading = false;
	};
</script>

<AddShipment
	open={addShipmentOpen}
	onClosed={() => (addShipmentOpen = false)}
	onCreated={refreshShipments}
/>

<Card>
	{#snippet title()}
		Upcoming Deliveries
	{/snippet}

	{#snippet controls()}
		<IconButton label="Refresh" icon="mdi:refresh" onclick={refreshShipments} />
		<IconButton label="Add Shipment" icon="mdi:plus" onclick={startAddShipment} />
	{/snippet}

	{#if loading}
		<Loader />
	{:else if !shipments.length}
		<p>No upcoming deliveries.</p>
	{:else}
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
	{/if}
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
