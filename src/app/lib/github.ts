import { GithubUser } from "./types/GithubUser";
import { GithubRepo } from "./types/GithubRepo";
import { GithubEvent } from "./types/GithubEvent";

export async function getGithubUser (username : string): Promise<GithubUser> {
    const res = await fetch(`https://api.github.com/users/${username}`);

     if (!res.ok) {
        throw new Error("Failed to get user")
     }

     const data = await res.json();

    return {
    username: data.login,
    name: data.name,
    avatar: data.avatar_url,
    bio: data.bio,
    followers: data.followers,
    following: data.following,
    publicRepos: data.public_repos,
  };
}

