import { GithubUser } from "../lib/types/GithubUser";

interface UserProps {
  user: GithubUser;
}

export default function UserInfoCard({ user }: UserProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        {/* User Info container */}
        <div className="flex gap-6 items-start">
          <div className="avatar">
            <div className="w-35 rounded-full">
              <img src={user.avatar} alt={`${user.username}'s avatar image`} />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="card-title text-2xl">
              {user.name || user.username}
            </h2>
            <p className="text-base-content/60">@{user.username}</p>
            {user.bio && <p className="mt-3">{user.bio}</p>}
          </div>
        </div>

        {/*Stats container */}
        <div className="stats stats-horizontal shadow-sm mt-4">
          <div className="stat">
            <div className="stat-title">Followers</div>
            <div className="stat-value">{user.followers}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Following</div>
            <div className="stat-value">{user.following}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Public Repos</div>
            <div className="stat-value">{user.publicRepos}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
