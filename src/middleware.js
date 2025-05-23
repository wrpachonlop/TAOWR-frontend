
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
    "/((?!api|_next|login).*)",
  ],
};

