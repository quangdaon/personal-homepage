import { db } from '$lib/server/db';
import { cacheTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { TimeUnit } from '$lib/resources/temporal';

export interface CacheConfig<T> {
	resolver: () => T | Promise<T>;
	duration: TimeUnit;
	bust?: boolean;
}

export const cacheable = async <T>(key: string, config: CacheConfig<T>): Promise<T> => {
	const { resolver, duration, bust = false } = config;
	const now = new Date();

	if (!bust) {
		const cached = await db.select().from(cacheTable).where(eq(cacheTable.key, key)).limit(1);

		if (cached.length && (cached[0].expiration === null || cached[0].expiration > now)) {
			return cached[0].content as T;
		}
	}

	const expiration = duration ? new Date(now.getTime() + duration) : null;

	const resolved = resolver();

	const result = resolved instanceof Promise ? await resolved : resolved;

	const cacheResult: typeof cacheTable.$inferInsert = {
		key,
		saved: now,
		expiration,
		content: JSON.stringify(result)
	};

	await db
		.insert(cacheTable)
		.values(cacheResult)
		.onConflictDoUpdate({
			target: cacheTable.key,
			set: cacheResult,
			where: eq(cacheTable.key, key)
		});

	return result;
};
