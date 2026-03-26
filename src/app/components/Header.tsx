import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { handleSignOut } from "../lib/actions/auth";
import { auth } from "@/auth";

export default async function Header() {
  const session = await auth();
  const username = session?.user?.githubUsername;
  return (
    <header className="navbar bg-base-300 px-7">
      <div className="flex-1">
        <Link
          href={`/profile/${username}`}
          className="
          text-xl 
          font-bold 
          tracking-tight 
          hover:text-blue dark:hover:text-blue-300
          active:scale-100
          transition-all duration-150
          "
        >
          MyGithub Dashboard
        </Link>
        <ThemeToggle />
      </div>

      <nav className="hidden lg:flex flex-none gap-2">
        <Link href="/dashboard" className="btn btn-ghost btn-sm">
          Search
        </Link>
        <form action={handleSignOut}>
          <button type="submit" className="btn btn-ghost btn-sm">
            Sign out
          </button>
        </form>
      </nav>

      <div className="flex lg:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-6 w-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-200 rounded-box shadow-lg w-40 p-2 mt-2"
          >
            <li>
              <Link href="/dashboard">Search</Link>
            </li>
            <li>
              <form action={handleSignOut}>
                <button type="submit" className="w-full text-left">
                  Sign out
                </button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
