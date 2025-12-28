import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  const isLoginPath = pathname === "/";
  const isHomePath = pathname.startsWith("/home");

  if (!token && isHomePath) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (token && isLoginPath) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home/:path*"],
};
