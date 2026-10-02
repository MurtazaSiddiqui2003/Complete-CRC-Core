import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, isValidSessionCookie } from "./lib/auth";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  if (pathname === "/admin/login" || pathname.startsWith("/api/admin/login")) {
    return NextResponse.next();
  }

  const isContentApi =
    pathname.startsWith("/api/") && !pathname.startsWith("/api/admin");

  if (isContentApi && method === "GET") {
    return NextResponse.next();
  }

  if (method !== "GET" && pathname.startsWith("/api/")) {
    const origin = request.headers.get("origin");
    if (origin) {
      try {
        if (new URL(origin).origin !== request.nextUrl.origin) {
          return NextResponse.json({ error: "Cross-origin request blocked." }, { status: 403 });
        }
      } catch {
        return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
      }
    }
  }

  const cookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!(await isValidSessionCookie(cookie))) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Not logged in." }, { status: 401 });
    }

    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};