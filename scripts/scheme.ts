import { zodToJsonSchema } from 'zod-to-json-schema';
import { FeedSourcesSchema } from '../src/lib/resources/feeds/schemas';
import fs from 'fs';

const schemas = {
	feeds: FeedSourcesSchema
};

await Promise.all(
	Object.entries(schemas).map(([key, zod]) => {
		const schema = zodToJsonSchema(zod);
		const json = JSON.stringify(schema, null);

		return fs.promises.writeFile(`./config/schema/${key}.schema.json`, json, 'utf-8');
	})
);
