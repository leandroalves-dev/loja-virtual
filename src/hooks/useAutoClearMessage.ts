import { useEffect, useState } from "react"

export function useAutoClearMessage(timeout = 3000) {
    const [message, setMessage] = useState("")

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(""), timeout)
            return () => clearTimeout(timer)
        }
    }, [message, timeout])

    return { message, setMessage }
}
