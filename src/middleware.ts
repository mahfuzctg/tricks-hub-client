/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode, JwtPayload } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

    // Authentication 
  const accessToken = cookies().get("accessToken")?.value;


  if (!accessToken) {
    return NextResponse.redirect(new URL(pathname ? `/login?redirect=${pathname}` : "/login", request.url))
  }

  //Role based authorization
  let decoded = null;
  decoded = jwtDecode(accessToken) as JwtPayload
  const role = decoded?.role;


  if (role === "admin" && pathname.match(/^\/admin-dashboard/)) {
    return NextResponse.next();
  }
  if (role === "user" && pathname.match(/^\/user-dashboard/)) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/dashboard/:page*",
    "/admin-dashboard/:page*",
  ],
};