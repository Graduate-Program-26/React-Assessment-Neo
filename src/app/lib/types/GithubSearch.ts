import { GithubUserResponse } from "./GithubUser";

export interface GithubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUserResponse[];
}
