import { NextRequest, NextResponse } from "next/server";
import { getSignInUserRequest } from "./pages/api";

// If the incoming req has the "beta" cookie
// then we'll rewrite the req to /beta
export function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("accessToken")?.value;
  const pathname = req.nextUrl.pathname;

  if (pathname === "/auth") return;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (refreshToken) {
    // 여기서 jwt refresh가 필요함.
    getSignInUserRequest(refreshToken);
  } else {
    // 로그인 안했으면 로그인창으로 보내는 로직
    if (pathname === "/여기는 private 경로") {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  if (!refreshToken && pathname.startsWith("/mypage")) {
    return NextResponse.redirect(
      new URL("/?alert=로그인 후 이용 가능한 서비스입니다.", req.url)
    );
  }
}

// Supports both a single value or an array of matches
export const config = {
  matcher: "/",
};
