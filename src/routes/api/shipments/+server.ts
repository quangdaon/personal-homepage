import { addShipment, getShipments } from '$lib/resources/shipments';
import type { AddShipmentModel } from '$lib/resources/shipments/models';
import { json, type RequestHandler } from '@sveltejs/kit';

export async function GET() {
	return json(await getShipments());
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data: AddShipmentModel = await request.json();

		await addShipment(data);

		return new Response(null, { status: 201 });
  } catch (error) {
    const err = error as Error;
		return json({ error: err.message }, { status: 500 });
	}
};
