import { GithubUser } from "./GithubUser";

export type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; results: GithubUser[]; query: string }
  | { status: "error"; message: string };
