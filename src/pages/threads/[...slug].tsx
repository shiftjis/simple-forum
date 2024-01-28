import { BreadcrumbItem, Breadcrumbs, Chip, Link, Spacer, Spinner } from "@nextui-org/react"
import { GetStaticPropsContext } from "next"
import { useEffect, useState } from "react"
import { Thread } from "@prisma/client"
import { Inter } from "next/font/google"

import { fetchWithStyle } from "@/common/fetch.with.style"

const inter = Inter({ subsets: ["latin"] })

export default function Thread({ slug }: { slug: string }) {
    const [thread, setThread] = useState<Thread | undefined>(undefined)

    useEffect(() => {
        fetchWithStyle(`/api/threads/${slug}`).then((payload) => {
            setThread(payload)
        })
    }, [])

    return thread !== undefined ? (
        <div className="px-4 py-4 min-h-full bg-slate-50 sm:px-[calc(100%/5.5)] sm:py-12">
            <Breadcrumbs>
                <BreadcrumbItem href="/threads">スレッド一覧</BreadcrumbItem>
                <BreadcrumbItem>{thread.title}</BreadcrumbItem>
            </Breadcrumbs>

            <Spacer y={2} />

            <div className="p-4 border-1">
                <p className="font-semibold text-3xl">{thread.title}</p>
                <Spacer y={2} />

                <div className="flex">
                    {/* <Chip className="h-[22px] mx-[2px] rounded-md" color="primary" size="sm">
                        <Link className={`${inter.className} text-background text-sm`} href={`/topics/${thread.topic}`}>
                            {thread.topic.charAt(0) + thread.topic.slice(1).toLowerCase()}
                        </Link>
                    </Chip> */}

                    {thread.tags.length > 0 ? thread.tags.map((tag, index) => {
                        return <Chip className="h-[22px] mx-[2px] rounded-md" color="default" size="sm">
                            <Link className={`${inter.className} text-foreground text-sm`} href={`/tags/${tag.toLowerCase()}`}>
                                {tag}
                            </Link>
                        </Chip>
                    }) : null}
                </div>

                <Spacer y={4} />

                <p>{thread.content}</p>
            </div>
        </div>
    ) : (
        <div className="flex items-center justify-center h-60">
            <Spinner size="lg" />
        </div>
    )
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: "blocking",
    }
}

export async function getStaticProps(context: GetStaticPropsContext) {
    if (context.params === undefined) {
        return { notFound: true }
    }

    return {
        props: {
            slug: context.params.slug
        }
    }
}
