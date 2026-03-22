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
        action: "started"
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
        }
    }
}

interface IssuesEvent extends GithubBaseEvent {
    type: "IssuesEvent",
    payload: {
        action: "opened" | "closed" | "reopened" | "edited",
        issue: {
            title: string,
            number: number
        }
    }
}

export type GithubEvent =
    WatchEvent | PushEvent | PullRequestEvent | IssuesEvent;


// Event API Response types
interface GithubEventResponseBase {
    id: string,
    type: string,
    created_at: string,
    repo: {
        name: string
    }
}

interface WatchEventResponse extends GithubEventResponseBase {
    type: "WatchEvent",
    payload: {
        action: "started"
    }
}

interface CommitResponse {
    sha: string,
    message: string
}

interface PushEventResponse extends GithubEventResponseBase {
    type: "PushEvent",
    payload: {
        ref: string,
        commits: CommitResponse[]
    }
}


interface PullRequestEventResponse extends GithubEventResponseBase {
    type: "PullRequestEvent",
    payload: {
        action: "opened" | "closed" | "reopened",
        pull_request: {
            title: string,
            html_url: string
        }
    }
}

interface IssuesEventResponse extends GithubEventResponseBase {
    type: "IssuesEvent",
    payload: {
        action: "opened" | "closed" | "reopened" | "edited",
        issue: {
            title: string,
            number: number
        }
    }
}

export type GithubEventResponse =
    WatchEventResponse | PushEventResponse | PullRequestEventResponse | IssuesEventResponse;