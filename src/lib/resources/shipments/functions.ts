import { db } from '$lib/server/db';
import { formatDateString } from '../temporal';
import type { ShipmentDetails, ShipmentTable } from './models';

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
