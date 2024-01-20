import { Avatar, Card, CardBody, Link, Spacer, Tooltip } from "@nextui-org/react"
import { useRouter } from "next/router"

import { Forum } from "@/types/forum.type"

export default function ForumItem({ forum, index }: { forum: Forum, index: number }) {
    const router = useRouter()

    function getTimeDifference(date: string): string {
        const timeDifference = new Date().getTime() - new Date(date).getTime()
        const minutes = Math.floor(timeDifference / (1000 * 60))
        const hours = Math.floor(timeDifference / (1000 * 60 * 60))
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
        const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365))

        if (minutes < 60) {
            return `約 ${minutes} 分前`
        } else if (hours < 24) {
            return `約 ${hours} 時間前`
        } else if (days < 365) {
            return `約 ${days} 日前`
        } else {
            return `約 ${years} 年前`
        }
    }

    return (
        <Card className={`w-full rounded-none shadow-none ${index === 0 ? "border-none" : "border-t-1"}`}>
            <CardBody className="flex-row px-3 py-5 items-center w-full">
                <Tooltip className="text-foreground" showArrow content={forum.author.username} closeDelay={100}>
                    <Avatar
                        onClick={() => router.push(`/users/${forum.author.uniqueId}`)}
                        className="whitespace-nowrap overflow-hidden"
                        name={forum.author.username}
                        as="button"
                    />
                </Tooltip>
                <Spacer x={3} />

                <div className="flex flex-col whitespace-nowrap overflow-hidden">
                    <Link
                        className="text-lg font-medium overflow-hidden text-ellipsis"
                        underline="hover"
                        href={`/forums/${forum.uniqueId}`}
                    >
                        {forum.title}
                    </Link>

                    <p className="text-xs overflow-hidden text-ellipsis">
                        {getTimeDifference(forum.createdAt)}
                    </p>
                </div>
            </CardBody>
        </Card>
    )
}
