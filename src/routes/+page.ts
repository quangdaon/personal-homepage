export async function load({ fetch }) {
	return {
		gitHubRepositories: await (await fetch('/api/github/repositories')).json()
	};
}
