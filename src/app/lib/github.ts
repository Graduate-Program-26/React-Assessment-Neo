import { GithubUser } from "./types/GithubUser";
import { GithubRepo, GithubRepoResponse } from "./types/GithubRepo";



export async function getGithubUser(username: string): Promise<GithubUser> {
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
        publicRepos: data.public_repos
    };
}


export async function getGithubUserRepos(username: string): Promise<GithubRepo[]> {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);

    if (!res.ok) {
        throw new Error("Failed to get  repos")
    }

    const data: GithubRepoResponse[] = await res.json();

    return data.map((repo) => (
        {
            name: repo.name,
            description: repo.description,
            starCount: repo.stargazers_count,
            language: repo.language,
            lastUpdated: repo.updated_at,
        }
    ))

}





