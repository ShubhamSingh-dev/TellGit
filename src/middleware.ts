import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("better-auth.session_token");

  // A basic check to see if the session cookie is present.
  // We cannot use the full `auth.api.getSession` in the edge middleware
  // because it imports `better-auth` which uses Node.js APIs (like `eval` in telemetry or `crypto` indirectly)
  // that are not supported in the Edge runtime.
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/ask/:path*", "/meetings/:path*", "/create/:path*", "/billing/:path*", "/join/:path*"],
};
