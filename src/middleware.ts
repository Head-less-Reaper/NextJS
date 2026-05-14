import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

    const token = request.cookies.get("token")?.value;

    const path = request.nextUrl.pathname;

    const isPublicPath =
        path === "/login" || path === "/signup";

    if (!token && !isPublicPath) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    if (token && isPublicPath) {
        return NextResponse.redirect(
            new URL("/", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/signup",
        "/profile/:path*",
    ],
};