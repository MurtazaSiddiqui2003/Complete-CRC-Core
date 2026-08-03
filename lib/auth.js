// Very small, very simple login system.
//
// There's only ONE admin (your boss / you), so we skipped a full user
// system with NextAuth, usernames, password resets, etc. Instead:
//
//   1. Boss types the password on /admin/login
//   2. If it matches ADMIN_PASSWORD (in .env.local), we set a cookie
//      whose value is your secret ADMIN_SESSION_SECRET.
//   3. Every /admin/* page checks that the cookie matches that secret.
//
// Nobody can guess ADMIN_SESSION_SECRET (it's a long random string only
// the server knows), so this is safe enough for a small business site.
// If you ever need multiple admin accounts, that's when it's worth
// upgrading to NextAuth (like the older CRC Core build).

export const SESSION_COOKIE_NAME = "crc_admin_session";

export function isCorrectPassword(password) {
  return Boolean(password) && password === process.env.ADMIN_PASSWORD;
}

export function isValidSessionCookie(cookieValue) {
  return Boolean(cookieValue) && cookieValue === process.env.ADMIN_SESSION_SECRET;
}
