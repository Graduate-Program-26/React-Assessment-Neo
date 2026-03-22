interface GithubBaseEvent {
    id: string,
    type: string,
    createdAt: string,
    repo: {
        name: string
    }
}

interface WatchEvent extends GithubBaseEvent {
    type: "WatchEvent",
    payload: {
        action: "started",
    }
}

interface Commit {
    sha: string,
    message: string
}

interface PushEvent extends GithubBaseEvent {
    type: "PushEvent",
    payload: {
        ref: string,
        commits: Commit[],
    }
}

interface PullRequestEvent extends GithubBaseEvent {
    type: "PullRequestEvent",
    payload: {
        action: "opened" | "closed" | "reopened",
        pullRequest: {
            title: string,
            htmlUrl: string,
        };
    }
}

interface IssuesEvent extends GithubBaseEvent {
    type : "IssuesEvent",
    payload : {
        action : "opened" | "closed" | "reopened" | "edited",
        issue : {
            title : string,
            number: number,
        }
    }
}

export type GithubEvent =
    WatchEvent | PushEvent | PullRequestEvent | IssuesEvent;