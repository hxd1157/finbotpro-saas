import NextAuth, { type NextAuthConfig } from "next-auth"
import Apple from "next-auth/providers/apple"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Apple({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" }
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
