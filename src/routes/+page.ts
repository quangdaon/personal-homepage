export async function load({ fetch }) {
	return {
		weather: await (await fetch('/api/weather')).json(),
		gitHubRepositories: await (await fetch('/api/github/repositories')).json()
	};
}
