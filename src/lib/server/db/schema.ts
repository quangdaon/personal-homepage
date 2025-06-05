import { json, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
export * from '../../resources/shipments/db';

export const cacheTable = pgTable('cache', {
	key: varchar('key').primaryKey(),
	content: json('content'),
	saved: timestamp('saved_at'),
	expiration: timestamp('expires_at')
});

