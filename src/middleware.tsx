import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized({ token }) {
            return token !== null
        },
    },
    secret: process.env.NEXTAUTH_SECRET
})

export const config = {
    matcher: [
        "/forums/:path*",
        "/users/:path*",
        "/topics/:path*",
        "/tags/:path*",
        "/dashboard",
    ],
}
