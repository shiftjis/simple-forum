import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function main() {
    const exampleUser = await prisma.user.findUnique({ where: { email: "example@gmail.com" } })
    if (!exampleUser) {
        return
    }

    await prisma.forum.create({
        data: {
            topic: "ANNOUNCEMENT",
            sticky: true,

            title: "アナウンス",
            author: exampleUser.uniqueId,
            content: "これはアナウンスです"
        }
    })

    for (let index = 0; index < 15; index++) {
        await prisma.forum.create({
            data: {
                title: `サンプルフォーラム No.${index}`,
                author: "clrmcmvev0000zjezcmagk3id",
                content: "これはサンプルフォーラムです。これはサンプルフォーラムです。\nこれはサンプルフォーラムです。これはサンプルフォーラムです。"
            }
        })
    }
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (reason) => {
    console.log(reason)
    await prisma.$disconnect()
    process.exit(1)
})
