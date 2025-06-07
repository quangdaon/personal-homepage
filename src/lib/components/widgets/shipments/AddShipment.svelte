<script lang="ts">
	import Modal from '$lib/components/messaging/Modal.svelte';
	import type { AddShipmentModel, CarrierDetails } from '$lib/resources/shipments/models';
	import { onMount } from 'svelte';

	interface Props {
		open: boolean;
		onClosed?: () => void;
		onCreated?: () => void;
	}

	let { open, onClosed, onCreated }: Props = $props();

	let carriers: CarrierDetails[] = $state([]);
	const errors: string[] = $state([]);

	onMount(async () => {
		const response = await fetch('/api/shipments/carriers');
		carriers = await response.json();
	});

	const model: AddShipmentModel = $state({
		label: '',
		trackingNumber: '',
		carrier: 'usps'
	});

	const submit = async (evt: SubmitEvent) => {
		evt.preventDefault();

		try {
			const response = await fetch('/api/shipments', {
				method: 'POST',
				body: JSON.stringify(model),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error(await response.text());
			}

			onCreated?.();
			onClosed?.();

			model.label = '';
			model.trackingNumber = '';
			model.carrier = 'usps';
		} catch (error) {
			const err = error as Error;
			const details = JSON.parse(err.message) as any;

			errors.push(details.error);
		}
	};
</script>

<Modal {open} {onClosed}>
	{#snippet title()}
		Add New Shipment
	{/snippet}
	<form onsubmit={submit}>
		{#if errors.length}
			<ul class="errors">
				{#each errors as err}
					<li>{err}</li>
				{/each}
			</ul>
		{/if}

		<div class="field">
			<label for="shipment-label">Label</label>
			<input id="shipment-label" type="text" required bind:value={model.label} />
		</div>
		<div class="field">
			<label for="shipment-tracking-number">Tracking #</label>
			<input id="shipment-tracking-number" type="text" required bind:value={model.trackingNumber} />
		</div>
		<div class="field">
			<label for="shipment-carrier">Carrier</label>
			<select name="shipment-carrier" id="shipment-carrier" required bind:value={model.carrier}>
				{#each carriers as carrier}
					<option value={carrier.key}>{carrier.label}</option>
				{/each}
			</select>
		</div>
		<button>Submit</button>
	</form>
</Modal>

<style>
	.errors {
		margin: 0;
		padding-left: 1em;
		font-size: 0.75em;
		color: red;
	}
</style>
