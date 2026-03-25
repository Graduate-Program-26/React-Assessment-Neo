import {
  getGithubUser,
  getGithubUserEvents,
  getGithubUserRepos,
} from "@/app/lib/github";
import UserInfoCard from "@/app/components/UserInfoCard";
import ActivityFeed from "@/app/components/ActivityFeed";
import RepoList from "@/app/components/RepoList";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  try {
    const [user, repos, events] = await Promise.all([
      getGithubUser(username),
      getGithubUserRepos(username),
      getGithubUserEvents(username),
    ]);

    return (
      <div className="min-h-screen bg-base-200 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <UserInfoCard user={user} />

          <div className="grid grid-cols-1 gap-6">
            <div className=" space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Top Repositories</h2>
                <RepoList repos={repos} />
              </div>
            </div>

            <div>
              <ActivityFeed events={events} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">User not found</h2>
            <p>User "{username}" could not be found</p>
          </div>
        </div>
      </div>
    );
  }
}
