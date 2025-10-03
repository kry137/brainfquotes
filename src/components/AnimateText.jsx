import { useMemo } from "react";

export default function AnimateText({ text, splitBy='', delay=5 }) {
    const splitted = useMemo(() => {
        const parts = text.split(splitBy);
        
        // Tambahkan kembali karakter yang di-split
        for (let i = 0; i < parts.length - 1; i++) {
            parts[i] += splitBy;
        }

        return parts;
    }, [text, splitBy]);

    return (
        <>
            { splitted.map((text, i) => 
                    <span key={i+'-'+text} className="motion-safe:animate-flip-up inline-block"
                        style={{ animationDelay: delay * i + 'ms' }}
                    >
                        {text.replace(' ', '\u00A0') }
                    </span>
            ) }
        </>
    )
}