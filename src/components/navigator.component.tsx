import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react"
import { Inter, Noto_Sans_JP } from "next/font/google"
import { signOut, useSession } from "next-auth/react"
import { ComponentPropsWithRef, Key } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

type NavigatorProps = ComponentPropsWithRef<"nav">

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"] })
const inter = Inter({ subsets: ["latin"] })
const pages = [
    {
        route: "/threads",
        title: "💥 フォーラム"
    },
    {
        route: "/dashboard",
        title: "😶 ダッシュボード"
    },
]

export default function Navigator(props: NavigatorProps) {
    const { data: session, status } = useSession()
    const router = useRouter()

    const handleAction = async (key: Key) => {
        switch (key) {
            case "settings":
                router.push("/settings")
                break

            case "logout":
                await signOut({
                    callbackUrl: "/",
                })
        }
    }

    return (
        <Navbar {...props} disableAnimation isBordered>
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarBrand>
                <Link className={`${inter.className} font-medium text-xl`} href="/">
                    <span className="text-primary">S</span>
                    imple Forum
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4">
                {pages.map(({ route, title }) => {
                    return (
                        <NavbarItem
                            key={route}
                            className="data-[active=true]:font-bold data-[active=true]:text-primary"
                            isActive={router.route === route}
                        >
                            <Link className="py-1 w-full hover:text-primary" href={route}>
                                {title}
                            </Link>
                        </NavbarItem>
                    )
                })}
            </NavbarContent>

            <NavbarMenu className={`${notoSansJP.className} text-foreground`}>
                {pages.map(({ route, title }) => {
                    return (
                        <NavbarMenuItem
                            key={route}
                            className="data-[active=true]:text-primary"
                            isActive={router.route.startsWith(route)}
                        >
                            <Link className="w-full" href={route}>
                                {title}
                            </Link>
                        </NavbarMenuItem>
                    )
                })}
            </NavbarMenu>

            <NavbarContent justify="end">
                <NavbarItem>
                    {status === "authenticated" ? (
                        <Dropdown className={notoSansJP.className} placement="bottom" radius="sm" disableAnimation>
                            <DropdownTrigger>
                                <Avatar isBordered color="primary" as="button" name={session.user.name} />
                            </DropdownTrigger>

                            <DropdownMenu
                                aria-label="Profile Actions"
                                variant="flat"
                                disabledKeys={["profile"]}
                                onAction={handleAction}>
                                <DropdownSection showDivider>
                                    <DropdownItem key="profile">
                                        <p className="text-foreground">@{session.user.name}</p>
                                        <p className="text-foreground">{session.user.email}</p>
                                    </DropdownItem>
                                </DropdownSection>

                                <DropdownSection>
                                    <DropdownItem key="settings">
                                        <p className="text-primary">設定</p>
                                    </DropdownItem>

                                    <DropdownItem key="logout">
                                        <p className="text-danger">ログアウト</p>
                                    </DropdownItem>
                                </DropdownSection>
                            </DropdownMenu>
                        </Dropdown>
                    ) : (
                        <Button
                            className="hover:border-primary"
                            size="sm"
                            variant="faded"
                            disableAnimation
                            disableRipple
                            onPress={() => router.push("/signup")}
                        >
                            サインアップ
                        </Button>
                    )}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}
