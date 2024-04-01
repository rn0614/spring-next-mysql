import { NextRequest, NextResponse } from "next/server";
import { getSignInUserRequest } from "./pages/api";

// If the incoming req has the "beta" cookie
// then we'll rewrite the req to /beta
export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/auth";
  const token = request.cookies.get("accessToken")?.value;

  if (!token || token === "null") return NextResponse.redirect(url);
  const response = await getSignInUserRequest(token);
  if (response?.code !== "SU") return NextResponse.redirect(url);

  return NextResponse.next();
}

// Supports both a single value or an array of matches
export const config = {
  matcher: ["/board/write"],
};
