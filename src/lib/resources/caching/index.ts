import { db } from '$lib/server/db';
import { cacheTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { TimeUnit } from '$lib/resources/temporal';

export const cacheable = async <T>(
	key: string,
	resolver: () => T | Promise<T>,
	durationMs: TimeUnit
): Promise<T> => {
	const now = new Date();
	const cached = await db.select().from(cacheTable).where(eq(cacheTable.key, key)).limit(1);

	if (cached.length && (cached[0].expiration === null || cached[0].expiration > now)) {
		return cached[0].content as T;
	}

	const expiration = durationMs ? new Date(now.getTime() + durationMs) : null;

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
