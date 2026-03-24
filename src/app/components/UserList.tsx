import Link from "next/link";
import type { GithubUser } from "../lib/types/GithubUser";

interface UserListProps {
    results: GithubUser[];
    query: string;
}

export default function UserList({ results, query }: UserListProps) {
    if (results.length === 0) {
        return <p>No users found with "{query}" were found</p>;
    }

    return (
        <ul>
            {results.map((user) => (
                <li key={user.username}>
                    <Link href={`/profile/${user.username}`}>
                        <span>{user.username}</span>
                        <img
                            src={user.avatar}
                            alt={`${user.username} avatar`}

                        />

                    </Link>
                </li>
            ))}
        </ul>
    );
}
