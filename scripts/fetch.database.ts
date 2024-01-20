import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function main() {
    console.log(await prisma.user.findMany())
    console.log(await prisma.forum.findMany())
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (reason) => {
    console.log(reason)
    await prisma.$disconnect()
    process.exit(1)
})
