import NextAuth, { DefaultSession } from "next-auth";
import { User } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    username?: string;
    backend?: string;
    id: string;
  }

  interface Session {
    user: {
      id: string;
      username?: string | null | undefined;
      backend?: string | null | undefined;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string | null | undefined;
    backend?: string | null | undefined;
  }
}
