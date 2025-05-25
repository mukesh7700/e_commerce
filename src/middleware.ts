import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/registration";

  const manualToken = request.cookies.get("token")?.value;
  const nextAuthToken = request.cookies.get("next-auth.session-token")?.value;

  const isAuthenticated = manualToken || nextAuthToken;

  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/login", "/registration"],
};
