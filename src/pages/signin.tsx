import { Button, Card, CardBody, CardFooter, CardHeader, Input, Link, Spacer } from "@nextui-org/react"
import { getSession, signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"

import { EyeFilledIcon } from "@/components/icons/eye.filled.icon"
import { EyeSlashFilledIcon } from "@/components/icons/eye.splash.icon"
import { PageBackIcon } from "@/components/icons/page.back.icon"
import { GetServerSidePropsContext } from "next"

export default function SignIn() {
    const [isVisible, setIsVisible] = useState(false)
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const router = useRouter()

    const shouldDisable = email.trim().length == 0 ||
        password.trim().length == 0

    const handleSignIn = () => {
        signIn("credentials", {
            email: email,
            password: password,
            callbackUrl: "/forums",
        })
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="p-5 w-[32rem] rounded-lg">
                <CardHeader>
                    <Button variant="light" isIconOnly disableRipple onPress={() => router.push("/")}>
                        <PageBackIcon />
                    </Button>

                    <Spacer x={2} />

                    <p className="text-lg font-semibold">サインイン</p>
                </CardHeader>

                <CardBody>
                    <Input
                        onValueChange={setEmail}
                        classNames={{
                            inputWrapper: [
                                "transition-none",
                                "data-[hover=true]:border-primary",
                                "data-[focus=true]:border-primary",
                            ]
                        }}
                        type="email"
                        variant="faded"
                        radius="sm"
                        label="メールアドレス"
                        labelPlacement="outside"
                        placeholder="メールアドレスを入力"
                        isRequired
                    />

                    <Spacer y={4} />

                    <Input
                        onValueChange={setPassword}
                        classNames={{
                            inputWrapper: [
                                "transition-none",
                                "data-[hover=true]:border-primary",
                                "data-[focus=true]:border-primary",
                            ]
                        }}
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={() => setIsVisible(!isVisible)}>
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                        variant="faded"
                        radius="sm"
                        label="パスワード"
                        labelPlacement="outside"
                        placeholder="パスワードを入力"
                        isRequired
                    />

                    <Spacer y={1} />

                    <Link className="text-sm text-primary" href="/recovery" underline="hover">
                        パスワードをお忘れですか？
                    </Link>
                </CardBody>

                <CardFooter className="flex-col">
                    <Button
                        className="hover:border-primary"
                        variant="faded"
                        radius="sm"
                        disableAnimation
                        disableRipple
                        fullWidth
                        isDisabled={shouldDisable}
                        onPress={handleSignIn}
                    >
                        サインインする
                    </Button>

                    <Spacer y={2} />

                    <Link className="text-sm text-primary" href="/signup" underline="hover">
                        アカウントをお持ちではありませんか？
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context)

    if (session) {
        return {
            redirect: {
                destination: '/forums',
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
}
