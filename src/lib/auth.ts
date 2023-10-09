import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import prismadb from "./db"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import FacebookProvider from "next-auth/providers/facebook"
import TwitterProvider from "next-auth/providers/twitter"

function getGoogleCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  if (!clientId || clientId.length === 0) {
    throw new Error("Missing Google credentials")
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing Google credentials")
  }

  return {
    clientId,
    clientSecret,
  }
}

function getFacebookCredentials() {
  const clientId = process.env.FACEBOOK_CLIENT_ID
  const clientSecret = process.env.FACEBOOK_CLIENT_SECRET

  if (!clientId || clientId.length === 0) {
    throw new Error("Missing Facebook credentials")
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing Facebook credentials")
  }

  return {
    clientId,
    clientSecret,
  }
}
function getTwitterCredentials() {
  const clientId = process.env.TWITTER_CLIENT_ID
  const clientSecret = process.env.TWITTER_CLIENT_SECRET

  if (!clientId || clientId.length === 0) {
    throw new Error("Missing Twitter credentials")
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing Twitter credentials")
  }

  return {
    clientId,
    clientSecret,
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismadb),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),

    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          throw new Error("No se encontro el usuario")
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isCorrectPassword) {
          throw new Error("El email y/0 contraseña son invalidos")
        }

        return user
      },
    }),
    FacebookProvider({
      clientId: getFacebookCredentials().clientId,
      clientSecret: getFacebookCredentials().clientSecret,
    }),
    TwitterProvider({
      clientId: getTwitterCredentials().clientId,
      clientSecret: getTwitterCredentials().clientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const dbResult = await prismadb.user.findUnique({
        where: {
          email: token.email,
        },
      })

      if (!dbResult) {
        if (user) {
          token.email = user!.email
        }

        return token
      }

      return {
        id: dbResult.id,
        name: dbResult.name,
        email: dbResult.email,
        picture: dbResult.image,
      }
    },
    async session({ session, token }) {
      if (token) {
        //session.user!.id = token.id
        session.user!.name = token.name
        session.user!.email = token.email
        session.user!.image = token.picture
      }

      return session
    },
  },
}
