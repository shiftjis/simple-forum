import { Button, Card, CardBody, CardFooter, CardHeader, Input, Link, Progress, Spacer } from "@nextui-org/react"
import { GetServerSidePropsContext } from "next"
import { getSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import zxcvbn from "zxcvbn"

import { EyeFilledIcon } from "@/components/icons/eye.filled.icon"
import { EyeSlashFilledIcon } from "@/components/icons/eye.splash.icon"
import { PageBackIcon } from "@/components/icons/page.back.icon"

export default function SignUp() {
    const [isVisible, setIsVisible] = useState(false)
    const [passwordScore, setPasswordScore] = useState(0)
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const router = useRouter()

    const shouldDisable = email.trim().length == 0 ||
        password.trim().length == 0 ||
        passwordScore < 3

    const handleSignUp = () => {

    }

    useEffect(() => {
        setPasswordScore(zxcvbn(password).score)
    }, [password])

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="p-5 w-[32rem] rounded-lg">
                <CardHeader>
                    <Button variant="light" isIconOnly disableRipple onPress={() => router.push("/")}>
                        <PageBackIcon />
                    </Button>

                    <Spacer x={2} />
                    <p className="text-xl font-semibold">サインアップ</p>
                </CardHeader>

                <CardBody>
                    <Input
                        onValueChange={setUsername}
                        classNames={{
                            inputWrapper: [
                                "transition-none",
                                "data-[hover=true]:border-primary",
                                "data-[focus=true]:border-primary",
                            ]
                        }}
                        type="text"
                        variant="faded"
                        radius="sm"
                        label="ユーザーネーム"
                        labelPlacement="outside"
                        placeholder="ユーザーネームを入力"
                        isRequired
                    />

                    <Spacer y={4} />

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

                    <Spacer y={1.5} />

                    <Progress
                        aria-label="strength"
                        minValue={0}
                        maxValue={4}
                        value={passwordScore}
                        className="max-w-md"
                        classNames={{
                            base: ["h-2"]
                        }}
                    />
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
                        onPress={handleSignUp}
                    >
                        サインアップする
                    </Button>

                    <Spacer y={2} />

                    <Link className="text-sm text-primary" href="/signin" underline="hover">
                        既にアカウントをお持ちですか？
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
