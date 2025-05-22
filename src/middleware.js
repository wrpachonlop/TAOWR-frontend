// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// export async function middleware(req) {
//   console.log("Middleware triggered");
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   // const isAuth = !!token;
//   // const isLoginPage = req.nextUrl.pathname === "/login";

//   // // Redirect to login if not authenticated
//   // if (!isAuth && !isLoginPage) {
//   //   return NextResponse.redirect(new URL("/login", req.url));
//   // }

//   // // Prevent authenticated users from visiting login
//   // if (isAuth && isLoginPage) {
//   //   return NextResponse.redirect(new URL("/", req.url));
//   // }

//   // return NextResponse.next();
// }

// // Apply to all routes
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
// middleware.js
// middleware.js
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      return !!token; // ✅ Only allow access if user is logged in
    },
  },
});

export const config = {
  matcher: [
    // Protect all routes except:
    // - /login (your login page)
    // - /api (NextAuth and other backend routes)
    // - /_next (Next.js internals)
    "/((?!api|_next|login).*)",
  ],
};

