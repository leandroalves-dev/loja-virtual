interface MessageSuccessProps{
    message: string
}

const MessageSuccess = ({ message }: MessageSuccessProps) => {
    return (
        <p className="text-green-300 border-green-300 text-sm my-3">{message}</p>
    )
}

export default MessageSuccess