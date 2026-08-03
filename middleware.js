// This runs BEFORE any /admin page loads. It checks for a valid login
// cookie and bounces people to /admin/login if they don't have one.
// This is the "lock on the door" for the whole admin panel.

import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, isValidSessionCookie } from "./lib/auth";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // Always allow the login page itself, and the API route that checks
  // the password -- otherwise nobody could ever log in.
  if (pathname === "/admin/login" || pathname.startsWith("/api/admin/login")) {
    return NextResponse.next();
  }

  // For the content API routes (/api/case-studies, /api/blog, etc.) the
  // public website needs to READ data (GET requests) with no login at
  // all -- that's how the homepage shows case studies to visitors.
  // Only WRITING data (POST/PUT/DELETE) requires being logged in.
  const isContentApi = pathname.startsWith("/api/") && !pathname.startsWith("/api/admin");
  if (isContentApi && method === "GET") {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!isValidSessionCookie(cookie)) {
    // API requests get a JSON error; admin pages get redirected to login.
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Not logged in." }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Runs for every /admin page AND every content API route.
// The public marketing pages (/, /about, etc.) are never touched by this.
export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
