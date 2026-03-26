import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    jwt({ token, profile }) {
      if (profile) {
        token.githubUsername = (profile as { login: string }).login;
      }
      return token;
    },

    session({ session, token }) {
      session.user.githubUsername = token.githubUsername as string;
      return session;
    },
  },
});
