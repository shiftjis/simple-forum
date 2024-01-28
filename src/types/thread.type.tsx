export interface Thread {
    uniqueId: string
    createdAt: string
    sticky: boolean
    viewed: number
    tags: String[]

    author: Author
    title: string
    content: string
}

export interface Author {
    uniqueId: string
    username: string
}

export interface Tag {
    name: string
}
