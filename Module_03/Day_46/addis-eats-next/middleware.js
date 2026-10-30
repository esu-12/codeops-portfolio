// addis-eats-next/middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get("addis-eats-session")?.value;
  const secret = process.env.SESSION_SECRET;

  let session = null;

  if (token && secret && secret.length >= 32) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(secret),
        { algorithms: ["HS256"] }
      );

      if (
        typeof payload.sub === "string" &&
        ["customer", "staff"].includes(payload.role)
      ) {
        session = { id: payload.sub, role: payload.role };
      }
    } catch {
      // Invalid or expired session.
    }
  }

  if (!session) {
    const url = new URL("/login", request.url);
    url.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(url);
  }

  if (
    (pathname === "/kitchen" || pathname.startsWith("/kitchen/")) &&
    session.role !== "staff"
  ) {
    return NextResponse.redirect(new URL("/menu", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/checkout/:path*",
    "/orders/:path*",
    "/kitchen/:path*",
  ],
};