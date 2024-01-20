import { Spacer } from "@nextui-org/react"
import { useEffect, useState } from "react"

import ForumItem from "@/components/forum.item.component"
import { fetchWithStyle } from "@/common/fetch.with.style"
import { Forum } from "@/types/forum.type"

export default function Forums() {
    const [forums, setForums] = useState<Forum[]>([])

    useEffect(() => {
        fetchWithStyle("/api/forums").then((payload) => {
            setForums(payload)
        })
    }, [])

    return (
        <div className="px-4 py-4 min-h-full bg-slate-50 sm:px-[calc(100%/5.5)] sm:py-12">
            <p className="text-xl font-bold">フォーラム一覧 - {forums ? forums.length : 0}</p>

            <Spacer y={5} />

            {forums ? forums.filter((forum) => forum.sticky).map((forum, index) => {
                return <ForumItem key={forum.uniqueId} forum={forum} index={index} />
            }) : null}

            <Spacer y={5} />

            {forums ? forums.filter((forum) => !forum.sticky).map((forum, index) => {
                return <ForumItem key={forum.uniqueId} forum={forum} index={index} />
            }) : null}
        </div>
    )
}
