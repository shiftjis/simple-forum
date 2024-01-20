import { BreadcrumbItem, Breadcrumbs, Chip, Link, Spacer, Spinner } from "@nextui-org/react"
import { Inter } from "next/font/google"
import { GetStaticPropsContext } from "next"
import { useEffect, useState } from "react"

import { fetchWithStyle } from "@/common/fetch.with.style"
import { Forum } from "@/types/forum.type"

const inter = Inter({ subsets: ["latin"] })

export default function Forum({ slug }: { slug: string }) {
    const [forum, setForum] = useState<Forum | undefined>(undefined)

    useEffect(() => {
        fetchWithStyle(`/api/forums/${slug}`).then((payload) => {
            setForum(payload)
        })
    }, [])

    return forum !== undefined ? (
        <div className="px-4 py-4 min-h-full bg-slate-50 sm:px-[calc(100%/5.5)] sm:py-12">
            <Breadcrumbs>
                <BreadcrumbItem href="/forums">フォーラム</BreadcrumbItem>
                <BreadcrumbItem>{forum.title}</BreadcrumbItem>
            </Breadcrumbs>

            <Spacer y={2} />

            <div className="p-4 border-1">
                <p className="font-semibold text-3xl">{forum.title}</p>
                <Spacer y={2} />

                <div className="flex">
                    <Chip className="mx-[2px]" color="primary" size="sm" radius="sm">
                        <Link className={`${inter.className} text-background text-sm`} href={`/topics/${forum.topic}`}>
                            {forum.topic.charAt(0) + forum.topic.slice(1).toLowerCase()}
                        </Link>
                    </Chip>

                    {forum.tags.length > 0 ? forum.tags.map((tag, index) => {
                        return <Chip className="mx-[2px]" color="default" size="sm" radius="sm">
                            <Link className={`${inter.className} text-foreground text-sm`} href={`/tags/${tag}`}>
                                {tag.charAt(0) + tag.slice(1).toLowerCase()}
                            </Link>
                        </Chip>
                    }) : null}
                </div>

                <Spacer y={4} />

                <p>{forum.content}</p>
            </div>
        </div>
    ) : (
        <div className="flex items-center justify-center h-[calc(100%-4rem)]">
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
