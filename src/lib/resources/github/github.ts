import { GITHUB_TOKEN } from '$env/static/private';
import { Octokit } from '@octokit/core';

const octokit = new Octokit({
	auth: GITHUB_TOKEN
});

export interface GitHubRepository {
	id: number;
	title: string;
	private: boolean;
	url: string;
  updated: Date | null;
	org: string;
	language?: string | null;
  topics: string[];
}

export const getRepositories = async (): Promise<GitHubRepository[]> => {
	const repos = await octokit.request('GET /user/repos', {
		sort: 'pushed',
		direction: 'desc',
		per_page: 12,
		headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		}
	});

	const result = repos.data.map(
		(e): GitHubRepository => ({
			id: e.id,
			title: e.name,
      url: e.url,
      updated: e.updated_at ? new Date(e.updated_at) : null,
			org: e.owner.type === 'Organization' ? e.owner.login : '',
			private: e.visibility !== 'public',
			language: e.language,
			topics: e.topics ?? []
		})
	);

	return result;
};
