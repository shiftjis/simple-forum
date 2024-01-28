import { Spacer } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { Thread } from "@prisma/client"

import { fetchWithStyle } from "@/common/fetch.with.style"
import ForumItem from "@/components/thread.component"

export default function Threads() {
    const [threads, setThreads] = useState<Thread[]>([])

    useEffect(() => {
        fetchWithStyle("/api/threads").then((payload) => {
            setThreads(payload)
        })
    }, [])

    return (
        <div className="px-4 py-4 min-h-full bg-slate-50 sm:px-[calc(100%/5.5)] sm:py-12">
            <p className="text-xl font-bold">スレッド一覧 - {threads ? threads.length : 0}</p>

            <Spacer y={5} />

            {threads ? threads.filter((forum) => forum.sticky).map((forum, index) => {
                return <ForumItem key={forum.uniqueId} forum={forum} index={index} />
            }) : null}

            <Spacer y={5} />

            {threads ? threads.filter((forum) => !forum.sticky).map((forum, index) => {
                return <ForumItem key={forum.uniqueId} forum={forum} index={index} />
            }) : null}
        </div>
    )
}
