import { GithubRepo } from "../lib/types/GithubRepo";

interface RepoProps {
  repo: GithubRepo;
}

export default function RepoInfoCard({ repo }: RepoProps) {
  const formattedDate = new Date(repo.lastUpdated).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  });

  return (
    <div className="card bg-base-100 border border-base-300 ">
      <div className="card-body p-4">
        <div className="flex justify-between items-start gap-2">
          {repo.name}

          <div className="flex items-center gap-1 text-sm shrink-0">
            <span>⭐</span>
            <span>{repo.starCount}</span>
          </div>
        </div>

        {repo.description && (
          <p className="text-sm text-base-content/70 line-clamp-2">
            {repo.description}
          </p>
        )}

        <div className="flex gap-3 items-center text-xs text-base-content/60 mt-2">
          {repo.language && (
            <span className="badge badge-outline badge-sm">
              {repo.language}
            </span>
          )}
          <span>Last updated {formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
