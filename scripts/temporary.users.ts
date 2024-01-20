import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export async function main() {
    const password = await bcrypt.hash("password", 10)

    const createdUser = await prisma.user.create({
        data: {
            roles: ["ADMIN"],
            email: "example@gmail.com",
            username: "サンプルユーザー",
            password: password,
        }
    })
    console.log(`Created ${createdUser.uniqueId}`)
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (reason) => {
    console.error(reason)
    await prisma.$disconnect()
    process.exit(1)
})
