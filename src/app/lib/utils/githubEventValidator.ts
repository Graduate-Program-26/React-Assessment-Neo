import { GithubEventResponse } from "../types/GithubEvent";

export function isGithubEventResponse(obj: unknown): obj is GithubEventResponse {
    if (typeof obj !== "object" || obj === null) {
        return false
    }

    const event = obj as Record<string, unknown>;

    // Verifies that event props exist and are correctly typed
    return (
        typeof event.id === "string" &&
        typeof event.type === "string" &&
        typeof event.created_at === "string" &&
        typeof event.repo === "object" &&
        event.repo !== null &&
        typeof (event.repo as Record<string, unknown>).name === "string" &&
        (
            event.type === "WatchEvent" ||
            event.type === "PushEvent" ||
            event.type === "PullRequestEvent" ||
            event.type === "IssuesEvent"
        )
    )
}