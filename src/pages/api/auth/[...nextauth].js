import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      return profile?.email?.endsWith("@wildrootscompany.com");
    },
    async redirect({ url, baseUrl }) {
      return baseUrl; 
    },
    async session({ session, token, user }) {
      console.log("Session callback:", { session, token, user });
      if (token.picture) {
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      // On initial sign in, add profile picture to JWT token
      console.log("JWT callback:", { token, account, profile });
      if (profile?.picture) {
        token.picture = profile.picture;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    accessDenied: "/access-denied",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
