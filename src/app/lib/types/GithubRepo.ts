export interface GithubRepo {
    name: string,
    description: string,
    starCount: number,
    language: string,
    lastUpdated: string,
}
export interface GithubRepoResponse {
  name: string;
  description: string;
  stargazers_count: number;
  language: string ;
  updated_at: string;
}