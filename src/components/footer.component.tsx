import { Spacer } from "@nextui-org/react"
import { ComponentPropsWithoutRef } from "react"

export interface FooterProps extends ComponentPropsWithoutRef<"footer"> {
    isFixed?: boolean
}

export default function Footer({ isFixed }: FooterProps) {
    const defaultStyle = "flex justify-center items-center w-full h-12 bottom-0 bg-slate-50 border-t-1 text-sm"

    return (
        <footer className={isFixed ? "fixed " + defaultStyle : defaultStyle}>
            <p>Simple Forum</p>
            <Spacer x={10} />
            <p>Made by ❤️</p>
        </footer>
    )
}
