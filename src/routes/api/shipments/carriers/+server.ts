import { getCarriers } from '$lib/resources/shipments';
import { json } from '@sveltejs/kit';

export async function GET() {
  return json(await getCarriers());
}
