import { db } from '$lib/server/db';
import { formatDateString, Time } from '../temporal';
import { shipmentCarriersTable, shipmentsTable, shipmentStatusesTable } from './db';
import type { AddShipmentModel, CarrierDetails, ShipmentDetails, ShipmentTable } from './models';
import { SHIPMENTS_POST_DELIVERY_THRESHOLD } from '$env/static/private';
import { and, eq, isNull, lt, or, sql } from 'drizzle-orm';

const formatString = (str: string, ...args: string[]) => {
	return str.replace(/{(\d+)}/g, (_, i) => args[i]);
};

export const getShipments = async (): Promise<ShipmentDetails[]> => {
	const shipments = await db
		.select()
		.from(shipmentsTable)
		.leftJoin(shipmentStatusesTable, eq(shipmentsTable.statusId, shipmentStatusesTable.id))
		.where(
			or(
				sql`${shipmentStatusesTable.final} = false`,
				and(
					isNull(shipmentsTable.deliveryWindowEnd),
					lt(
						sql`EXTRACT(EPOCH FROM NOW() - ${shipmentsTable.lastChecked}) * 1000`,
						Time.days(+SHIPMENTS_POST_DELIVERY_THRESHOLD)
					)
				),
				lt(
					sql`EXTRACT(EPOCH FROM NOW() - ${shipmentsTable.deliveryWindowEnd}) * 1000`,
					Time.days(+SHIPMENTS_POST_DELIVERY_THRESHOLD)
				)
			)
		)
		.leftJoin(shipmentCarriersTable, eq(shipmentsTable.carrierId, shipmentCarriersTable.id));

	const results: ShipmentDetails[] = shipments.map((e) => ({
		label: e.shipments.label,
		message: getMessage({
			...e.shipments,
			status: e.shipment_statuses,
			carrier: e.shipment_carriers
		}),
		trackingUrl: e.shipments.trackingUrl ?? ''
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
	const shipments = await db.query.shipmentCarriersTable.findMany({
		orderBy(table, { asc }) {
			return asc(table.id);
		}
	});

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
		case 'unsupported':
			return `Shipped by ${e.carrier?.label}. Tracking is not supported.`;
		case 'delivered':
			return `Package delivered ${formatDateString(e.deliveryWindowEnd!, 'relative')}`;
	}

	let message = e.status.label;

	if (e.deliveryWindowEnd)
		message = `${message} | Expected ${formatDateString(e.deliveryWindowEnd, 'full')}`;

	return message;
}
