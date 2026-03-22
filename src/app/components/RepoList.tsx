import { GithubRepo } from '../lib/types/GithubRepo';
import RepoInfoCard from './RepoInfoCard';

interface RepoListProps {
  repos: GithubRepo[]
}

export default function RepoList({ repos }: RepoListProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {repos.map((repo) => (
        <RepoInfoCard key={repo.name} repo={repo} />
      ))}
    </div>
  )
}