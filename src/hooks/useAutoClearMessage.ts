import { useEffect, useState } from "react"

type MessageType = 'success' | 'warning' | 'error'

interface Feedback {
    message: string
    type: MessageType
}

export function useAutoClearMessage(timeout = 3000) {
    const [feedback, setFeedback] = useState<Feedback | null>(null)

    useEffect(() => {
        if (feedback) {
        const timer = setTimeout(() => setFeedback(null), timeout)
        return () => clearTimeout(timer)
        }
    }, [feedback, timeout])

    return { feedback, setFeedback }
}