import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function main() {
    await prisma.thread.deleteMany()
    await prisma.user.deleteMany()
    console.log("Database has been reset")
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (reason) => {
    console.log(reason)
    await prisma.$disconnect()
    process.exit(1)
})
