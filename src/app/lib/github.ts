import { GithubUser, GithubUserResponse } from "./types/GithubUser";
import { GithubRepo, GithubRepoResponse } from "./types/GithubRepo";
import { GithubEvent } from "./types/GithubEvent";
import { isGithubEventResponse } from "./utils/githubEventValidator";
import { GithubSearchResponse } from "./types/GithubSearch";

export async function getGithubUser(username: string): Promise<GithubUser> {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    next: { revalidate: 3600 }, // cache for an hour (to avoid exceeding rate limit)
  });

  if (!res.ok) {
    throw new Error("Failed to get user");
  }

  const data: GithubUserResponse = await res.json();

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

export async function getGithubUserRepos(
  username: string,
): Promise<GithubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=6`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to get user repos");
  }

  const data: GithubRepoResponse[] = await res.json();

  return data.map((repo) => ({
    name: repo.name,
    description: repo.description,
    starCount: repo.stargazers_count,
    language: repo.language,
    lastUpdated: repo.updated_at,
  }));
}

export async function getGithubUserEvents(
  username: string,
): Promise<GithubEvent[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/events?per_page=10`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to get user events");
  }

  const data = (await res.json()) as unknown[];

  const events: GithubEvent[] = [];

  for (const item of data) {
    if (!isGithubEventResponse(item)) {
      continue; //skip items that aren't valid event response
    }

    switch (item.type) {
      case "WatchEvent":
        events.push({
          id: item.id,
          type: "WatchEvent",
          createdAt: item.created_at,
          repo: {
            name: item.repo.name,
          },
          payload: {
            action: item.payload.action,
          },
        });
        break;

      case "PushEvent":
        events.push({
          id: item.id,
          type: "PushEvent",
          createdAt: item.created_at,
          repo: {
            name: item.repo.name,
          },
          payload: {
            ref: item.payload.ref,
            commits: item.payload.commits.map((commit) => ({
              sha: commit.sha,
              message: commit.message,
            })),
          },
        });
        break;

      case "PullRequestEvent":
        events.push({
          id: item.id,
          type: "PullRequestEvent",
          createdAt: item.created_at,
          repo: {
            name: item.repo.name,
          },
          payload: {
            action: item.payload.action,
            pullRequest: {
              title: item.payload.pull_request.title,
              htmlUrl: item.payload.pull_request.html_url,
            },
          },
        });
        break;

      case "IssuesEvent":
        events.push({
          id: item.id,
          type: "IssuesEvent",
          createdAt: item.created_at,
          repo: {
            name: item.repo.name,
          },
          payload: {
            action: item.payload.action,
            issue: {
              title: item.payload.issue.title,
              number: item.payload.issue.number,
            },
          },
        });
        break;
    }
  }
  return events;
}

export async function searchForGithubUsers(
  query: string,
): Promise<GithubUser[]> {
  const response = await fetch(
    `https://api.github.com/search/users?q=${encodeURIComponent(query)}`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) throw new Error("Failed to search users");

  const data: GithubSearchResponse = await response.json();

  return data.items.map((item) => ({
    username: item.login,
    name: item.name ?? null,
    avatar: item.avatar_url,
    bio: item.bio ?? null,
    followers: item.followers ?? 0,
    following: item.following ?? 0,
    publicRepos: item.public_repos ?? 0,
    // props with "?? null" and "?? 0" return undefined
  }));
}
