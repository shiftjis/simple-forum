import { PrismaClient, Tag } from "@prisma/client"

const prisma = new PrismaClient()

export async function main() {
    const exampleUser = await prisma.user.findUnique({ where: { email: "example@gmail.com" } })
    if (!exampleUser) {
        return
    }

    await prisma.tag.create({
        data: {
            name: "Announcement"
        }
    })

    await prisma.tag.create({
        data: {
            name: "Test Tag"
        }
    })

    await prisma.thread.create({
        data: {
            sticky: true,
            tags: [
                "Announcement"
            ],

            title: "アナウンス",
            author: exampleUser.uniqueId,
            content: "これはアナウンスです"
        }
    })

    for (let index = 0; index < 15; index++) {
        await prisma.thread.create({
            data: {
                tags: [
                    "Test Tag",
                    "Test Tag"
                ],

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
