import { Thread, Tag } from "@prisma/client"
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

export async function tagsToObjects(tags: Tag[]) {
    return await Promise.all(tags.map(async (tag) => {
        return tag.name
    }))
}

export async function threadsToObjects(threads: Thread[]) {
    return await Promise.all(threads.map(async (thread) => {
        const authorUser = await prisma.user.findUnique({ where: { uniqueId: thread.author } })

        return {
            uniqueId: thread.uniqueId,
            createdAt: thread.createdAt,
            sticky: thread.sticky,
            viewed: thread.viewed,
            tags: thread.tags,

            author: {
                uniqueId: authorUser?.uniqueId ?? thread.author,
                username: authorUser?.username ?? "不明",
            },
            title: thread.title,
        }
    }))
}
