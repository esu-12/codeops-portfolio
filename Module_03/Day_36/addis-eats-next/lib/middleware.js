import { NextResponse } from "next/server";

export function middleware(request) {
const session = request.cookies.get("session");
if (!session) {
const url = new URL("/signin", request.url);
url.searchParams.set("next", request.nextUrl.pathname);
return NextResponse.redirect(url);
}
return NextResponse.next();
}