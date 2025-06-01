import { relations } from 'drizzle-orm';
import { integer, json, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const cacheTable = pgTable('cache', {
	key: varchar('key').primaryKey(),
	content: json('content'),
	saved: timestamp('saved_at'),
	expiration: timestamp('expires_at')
});

export const shipmentStatusesTable = pgTable('shipment_statuses', {
	id: serial('id').primaryKey(),
	key: varchar('key', { length: 50 }).notNull().unique(),
	label: varchar('label', { length: 50 }).notNull().unique()
});

export const shipmentProvidersTable = pgTable('shipment_providers', {
	id: serial('id').primaryKey(),
	label: varchar('label', { length: 50 }).notNull().unique(),
	icon: varchar('icon', { length: 256 })
});

export const shipmentsTable = pgTable('shipments', {
	id: serial('id').primaryKey(),
	label: varchar('label').notNull(),
	trackingNumber: varchar('tracking_number', { length: 100 }).notNull().unique(),
	trackingUrl: varchar('tracking_url', { length: 256 }),
	expected: timestamp('expected_at'),
	lastLocation: varchar('last_location', { length: 100 }),
	lastChecked: timestamp('last_checked_at'),
	thumbnailUrl: varchar('thumbnail_url', { length: 256 }),
	statusId: integer('status_id').references(() => shipmentStatusesTable.id),
	providerId: integer('provider_id').references(() => shipmentProvidersTable.id)
});

export const shipmentRelations = relations(shipmentsTable, ({ one }) => ({
	status: one(shipmentStatusesTable, {
		fields: [shipmentsTable.statusId],
		references: [shipmentStatusesTable.id]
	}),
	provider: one(shipmentProvidersTable, {
		fields: [shipmentsTable.providerId],
		references: [shipmentProvidersTable.id]
	})
}));
