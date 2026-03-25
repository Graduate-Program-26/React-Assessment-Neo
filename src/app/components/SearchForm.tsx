"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import UserList from "../components/UserList";
import { GithubUser } from "../lib/types/GithubUser";
import type { SearchState } from "../lib/types/Search";

export default function SearchForm() {
  const [state, setState] = useState<SearchState>({ status: "idle" });

  async function handleSearch(query: string) {
    setState({ status: "loading" });

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`,
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const results: GithubUser[] = await response.json();
      setState({ status: "success", results, query });
    } catch {
      setState({ status: "error", message: "Error. Please try again." });
    }
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <SearchBar onSearch={handleSearch} />

      {state.status === "error" && <p>{state.message}</p>}

      {state.status === "success" && (
        <UserList results={state.results} query={state.query} />
      )}
    </div>
  );
}
