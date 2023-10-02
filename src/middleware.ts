import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const publicRoute = request.nextUrl.pathname.includes("/login") || request.nextUrl.pathname.includes("/signup")
  const tokenExist = request.cookies.get("token")?.value || ''
  if(publicRoute &&  tokenExist){
    return NextResponse.redirect(new URL("/",request.nextUrl))
  }
  if(!publicRoute && !tokenExist){
    return NextResponse.redirect(new URL("/login",request.nextUrl))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/signup", "/welcome","/"],
};
