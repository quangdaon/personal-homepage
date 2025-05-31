import { OPENAI_SECRET_KEY } from '$env/static/private';

export async function load() {
	return {
		aiSummaryEnabled: !!OPENAI_SECRET_KEY
	};
}
