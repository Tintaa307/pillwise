import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's name. */
      id: string | null | undefinded
      name: string | null | undefinded
      email: string | null | undefinded
      image: string | null | undefinded
    }
  }
}
