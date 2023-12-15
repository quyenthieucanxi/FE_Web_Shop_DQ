
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"


export default withAuth(
  function middleware(req : NextRequestWithAuth) {
    console.log(req.nextauth.token)
    console.log(req.nextUrl.pathname)
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname.includes("/admin")) {
          return token?.role === "User"
        }
        return Boolean(token)
      }
    }
  }
  
  )


  // See "Matching Paths" below to learn more
export const config = {
  matcher: ['/post','/mypost','/settings/:path*','/order/:path*','/admin/:path*']
}