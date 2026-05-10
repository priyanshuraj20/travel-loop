import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { nextUrl } = req

  // Basic role-based protection example
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn || req.auth?.user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/api/auth/signin", nextUrl))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
