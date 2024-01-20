import { Noto_Sans_JP } from "next/font/google"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import Navigator from "./navigator.component"
import Footer from "./footer.component"

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"] })
const hideNavigatorRoutes = [
    "/signup",
    "/signin"
]
const hideFooterRoutes = [
    "/_error"
]

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
    const [isTaller, setIsTaller] = useState(false)
    const router = useRouter()

    const hideNavigator = hideNavigatorRoutes.includes(router.route)
    const hideFooter = hideFooterRoutes.includes(router.route)

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (document !== undefined && window !== undefined) {
                setIsTaller(document.documentElement.scrollHeight > window.innerHeight)
            }
        }, 0)
        return () => clearInterval(intervalId)
    }, [])

    return (
        <main className={`${notoSansJP.className} bg-slate-50 text-foreground select-none`}>
            {hideNavigator ? null : (<Navigator />)}
            {children}
            {hideFooter ? null : <Footer isFixed={!isTaller} />}
        </main>
    )
}
