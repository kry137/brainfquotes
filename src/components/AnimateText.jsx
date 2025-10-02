import { useMemo } from "react"

export default function AnimateText({ text }) {
    const splitted = useMemo(() => text.split(''), [text]);

    return (
        <>
            { splitted.map((char, ind) => {
                <span key={ind} className="animate-fade animate-duration-[50ms] inline-block">
                    {char}
                </span>
            }) }
        </>
    )
}