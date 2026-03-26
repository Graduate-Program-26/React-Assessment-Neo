import { NextRequest, NextResponse } from "next/server";
import { searchForGithubUsers } from "../../lib/github";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const query = request.nextUrl.searchParams.get("q");

  if (query === null || query.trim() === "") {
    return NextResponse.json({ error: "Query is null" }, { status: 400 });
  }

  try {
    const users = await searchForGithubUsers(query.trim());
    return NextResponse.json(users);
  } catch {
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
