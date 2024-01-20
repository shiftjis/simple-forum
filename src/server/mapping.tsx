import { Forum } from "@prisma/client"
import { prisma } from "./database"

export function wrapStyle(status: number, reason: any, body: any) {
    return {
        header: {
            status: status,
            reason: reason,
        },
        payload: body,
    }
}

export async function forumsToObjects(forums: Forum[]) {
    return await Promise.all(forums.map(async (forum) => {
        const authorUser = await prisma.user.findUnique({ where: { uniqueId: forum.author } })
        return {
            uniqueId: forum.uniqueId,
            createdAt: forum.createdAt,
            sticky: forum.sticky,
            viewed: forum.viewed,
            topic: forum.topic,
            tags: forum.tags,
            author: {
                uniqueId: authorUser?.uniqueId ?? forum.author,
                username: authorUser?.username ?? "不明",
            },
            title: forum.title,
        }
    }))
}
