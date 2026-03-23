export interface GithubUser {
  username: string;
  name: string;
  avatar: string;
  bio: string | null;
  followers: number;
  following: number;
  publicRepos: number;
}

export interface GithubUserResponse {
  login: string;
  name: string;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
}
