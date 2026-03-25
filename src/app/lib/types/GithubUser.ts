export interface GithubUser {
  id: number;
  username: string;
  name: string;
  avatar: string;
  bio: string | null;
  followers: number;
  following: number;
  publicRepos: number;
}

export interface GithubUserResponse {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
}
