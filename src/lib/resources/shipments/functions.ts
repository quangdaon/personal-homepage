import { db } from '$lib/server/db';
import { formatDateString } from '../temporal';
import { shipmentsTable } from './db';
import type { AddShipmentModel, CarrierDetails, ShipmentDetails, ShipmentTable } from './models';

const formatString = (str: string, ...args: string[]) => {
  return str.replace(/{(\d+)}/g, (_, i) => args[i]);
}

export const getShipments = async (): Promise<ShipmentDetails[]> => {
	const shipments = await db.query.shipmentsTable.findMany({
		with: {
			carrier: true,
			status: true
		}
	});

	const results: ShipmentDetails[] = shipments.map((e) => ({
		label: e.label,
		message: getMessage(e),
		trackingUrl: e.trackingUrl ?? ''
	}));

	return results;
};

export const addShipment = async (model: AddShipmentModel) => {
	const carrier = await db.query.shipmentCarriersTable.findFirst({
		where(table, { eq }) {
			return eq(table.key, model.carrier);
		}
	});

	if (!carrier) throw new Error(`Invalid carrier: ${model.carrier}`);

	const shipment: typeof shipmentsTable.$inferInsert = {
		label: model.label,
		trackingNumber: model.trackingNumber,
		statusId: 1,
		carrierId: carrier.id
	};

	if (carrier.trackingUrlFormat) {
		shipment.trackingUrl = formatString(carrier.trackingUrlFormat, model.trackingNumber);
	}

	await db.insert(shipmentsTable).values(shipment);
};

export const getCarriers = async (): Promise<CarrierDetails[]> => {
	const shipments = await db.query.shipmentCarriersTable.findMany();

	const results: CarrierDetails[] = shipments.map((e) => ({
		key: e.key,
		label: e.label
	}));

	return results;
};

function getMessage(e: ShipmentTable): string {
	if (e.status === null) return 'Status Unresolvable';

	switch (e.status.key) {
		case 'unchecked':
			return `Pending data retrieval...`;
		case 'delivered':
			return `Package delivered ${formatDateString(e.deliveryWindowEnd!, 'relative')}`;
	}

	return `${e.status.label} | Expected ${formatDateString(e.deliveryWindowEnd!, 'full')}`;
}
