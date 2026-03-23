import { GithubEvent } from "../lib/types/GithubEvent";

interface EventProps {
  events: GithubEvent[];
}

function formatEventType(event: GithubEvent): string {
  const repoName = event.repo.name;

  switch (event.type) {
    case "PushEvent":
      return `Pushed to ${repoName}`;

    case "PullRequestEvent":
      return `Opened PR in ${repoName}`;

    case "IssuesEvent":
      return `Created issue in ${repoName}`;

    case "WatchEvent":
      return `Starred ${repoName}`;
  }
}

export default function ActivityFeed({ events }: EventProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title">Recent Activity</h3>

        <div className="space-y-3">
          {events.map((event) => {
            const eventDate = new Date(event.createdAt).toLocaleDateString(
              "en-ZA",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              },
            );

            return (
              <div key={event.id}>
                <p className="text-sm font-medium">{formatEventType(event)}</p>
                <p className="text-xs text-base-content/60">
                  On the {eventDate}
                </p>
                <div className="divider my-2"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
