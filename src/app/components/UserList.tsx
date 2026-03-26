import Link from "next/link";
import type { GithubUser } from "../lib/types/GithubUser";
import SearchUserCard from "./SearchUserCard";

interface UserListProps {
  results: GithubUser[];
  query: string;
}

export default function UserList({ results, query }: UserListProps) {
  if (results.length === 0) {
    return <p>No users found with "{query}" was found</p>;
  }

  return (
    <section className="flex flex-wrap justify-center gap-5">
      {results.map((user) => (
        <Link key={user.id} href={`/profile/${user.username}`}>
          <SearchUserCard
            id={user.id}
            username={user.username}
            avatar={user.avatar}
          />
        </Link>
      ))}
    </section>
  );
}
