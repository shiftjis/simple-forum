import { Button, Spacer } from "@nextui-org/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

export default function Home() {
    const { status } = useSession()
    const router = useRouter()

    return (
        <div className="flex flex-col h-full">
            <section className="flex flex-col justify-center items-center h-[30rem] bg-primary">
                <p className="text-3xl text-white font-bold">シンプルフォーラムへようこそ！</p>
                <p className="text-3xl text-white font-bold">シンプルな説明！</p>

                <Spacer y={16} />

                {status === "authenticated" ? (
                    <Button
                        className="bg-white"
                        variant="faded"
                        disableAnimation
                        disableRipple
                        onPress={() => router.push("/threads")}
                    >
                        フォーラムに行く
                    </Button>
                ) : (
                    <div className="flex">
                        <Button
                            className="bg-white"
                            variant="faded"
                            disableAnimation
                            disableRipple
                            onPress={() => router.push("/signin")}
                        >
                            サインインする
                        </Button>

                        <Spacer x={5} />

                        <Button
                            className="bg-white"
                            variant="faded"
                            disableAnimation
                            disableRipple
                            onPress={() => router.push("/signup")}
                        >
                            サインアップする
                        </Button>
                    </div>
                )}
            </section>

            <section className="flex flex-col justify-center items-center h-[15rem]">
                <p className="text-3xl font-bold">ここにも説明！</p>
            </section>
        </div>
    )
}
