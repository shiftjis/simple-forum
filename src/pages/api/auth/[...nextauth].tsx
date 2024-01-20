import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { AuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import bcrypt from "bcrypt"

import { prisma } from "@/server/database"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            email: string
            name: string
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        email: string
        name: string
    }
}


export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, request) {
                if (!credentials) {
                    return null
                }

                const { email, password } = credentials
                const user = await prisma.user.findUnique({ where: { email } })
                if (!user) {
                    return null
                }

                const { uniqueId, username } = user
                if (!await bcrypt.compare(password, user.password ?? "")) {
                    return null
                }

                return {
                    id: uniqueId,
                    email: email,
                    name: username,
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (!user || !user.email || !user.name) {
                return token
            }

            return {
                ...token,
                id: user.id,
                email: user.email,
                name: user.name,
            }
        },
        async session({ session, token }) {
            if (!token) {
                return session
            }

            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    email: token.email,
                    name: token.name,
                },
            }
        },
    },
    session: {
        maxAge: 86400, // 24 hour
        strategy: "jwt",
    },
    pages: {
        signIn: "/signin",
    },
    secret: process.env.NEXTAUTH_SECRET
} satisfies AuthOptions

export default NextAuth(authOptions)
