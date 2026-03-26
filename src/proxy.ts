import  {auth}  from "@/auth"

import { NextResponse } from "next/server"

export const proxy = auth((req) => {
  const userLoggedIn: boolean = !!req.auth
  const onLoginPage: boolean = req.nextUrl.pathname === "/"

  // User not logged in + not on the login page → redirect to login
  if (!userLoggedIn && !onLoginPage) {
    const loginUrl = new URL("/", req.nextUrl.origin)
    return NextResponse.redirect(loginUrl)
  }

  if (userLoggedIn && onLoginPage) {
    const dashboardUrl = new URL("/dashboard", req.nextUrl.origin)
    return NextResponse.redirect(dashboardUrl)
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}