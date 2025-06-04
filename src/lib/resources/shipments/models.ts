import type {
	shipmentCarriersTable,
	shipmentsTable,
	shipmentStatusesTable
} from '$lib/server/db/schema';

export interface ShipmentDetails {
	label: string;
	message: string;
	trackingUrl: string;
}

export type ShipmentTable = typeof shipmentsTable.$inferSelect & {
	status: typeof shipmentStatusesTable.$inferSelect | null;
} & { carrier: typeof shipmentCarriersTable.$inferSelect | null };
