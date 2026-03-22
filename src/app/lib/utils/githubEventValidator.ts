import { GithubEventResponse } from "../types/GithubEvent";

export function isGithubEventResponse(obj: unknown): obj is GithubEventResponse {
    if (typeof obj !== "object" || obj === null) {
        return false
    }

    const event = obj as Record<string, unknown>;

    //Check that shared props exist for every event
    if (
        typeof event.id !== "string" ||
        typeof event.type !== "string" ||
        typeof event.created_at !== "string" ||
        typeof event.repo !== "object" ||
        event.repo === null
    ) {
        return false;
    }

    const repo = event.repo as Record<string, unknown>;
    if (typeof repo.name !== "string") {
        return false
    }

    if (typeof event.payload !== "object" || event.payload === null) {
        return false
    }


    const payload = event.payload as Record<string, unknown>;

    //check that event specific props exist for each event
    switch (event.type) {
        case "WatchEvent":
            return payload.action === "started";

        case "PushEvent":
            return (
                typeof payload.ref === "string" &&
                Array.isArray(payload.commits) &&
                payload.commits.length > 0  // push event requires 1+ commits
            );

        case "PullRequestEvent":
            return (
                typeof payload.action === "string" &&
                typeof payload.pull_request === "object" &&
                payload.pull_request !== null
            );

        case "IssuesEvent":
            return (
                typeof payload.action === "string" &&
                typeof payload.issue === "object" &&
                payload.issue !== null
            );

        //unknown event (ignore)
        default:
            return false;
    }
}