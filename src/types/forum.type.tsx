export interface Forum {
    uniqueId: string
    createdAt: string
    sticky: boolean
    viewed: number
    topic: string
    tags: string[]
    author: ForumAuthor
    title: string
    content: string
}

export interface ForumAuthor {
    uniqueId: string
    username: string
}
