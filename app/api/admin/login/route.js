import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, isCorrectPassword } from "../../../../lib/auth";

// Called when someone submits the password on /admin/login.
export async function POST(request) {
  const { password } = await request.json();

  if (!isCorrectPassword(password)) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });

  // Set the login cookie. httpOnly means JavaScript in the browser can't
  // read it (safer against XSS). It lasts 7 days, then they log in again.
  response.cookies.set(SESSION_COOKIE_NAME, process.env.ADMIN_SESSION_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return response;
}
