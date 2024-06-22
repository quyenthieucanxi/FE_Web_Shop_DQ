
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
          return token?.role === "Admin" || token?.role === "Seller"
        }
        return Boolean(token)
      }
    }
  }
  
  )


  // See "Matching Paths" below to learn more
export const config = {
  matcher: ['/post','/mypost','/myLikePost','/order/:path*','/shop','/settings/:path*','/order/:path*','/admin/:path*','/chat/:path*']
}