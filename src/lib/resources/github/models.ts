
export interface GitHubRepository {
	id: number;
	title: string;
	private: boolean;
	url: string;
	updated: Date | string;
	org: string;
	language?: string | null;
	topics: string[];
}
