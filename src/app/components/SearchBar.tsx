"use client";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [isQuery, setQuery] = useState("");

  function handleSubmit() {
    const searchQuery = isQuery.trim();
    onSearch(searchQuery);
  }

  return (
    <div>
      <label className="label font-bold mx-3">Github Username </label>
      <div className="join">
        <input
          type="text"
          placeholder="Enter username"
          className="input join-item flex-1"
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          type="submit"
          className="btn bg-black text-white join-item"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
    </div>
  );
}
