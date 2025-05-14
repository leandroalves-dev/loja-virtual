interface MessageSuccessProps {
    message: string;
    type?: 'success' | 'warning' | 'error';
}

const MessageSuccess = ({ message, type = 'success' }: MessageSuccessProps) => {
    const colorClasses = {
        success: 'text-green-300',
        warning: 'text-yellow-300',
        error: 'text-red-400',
    };

    return (
        <p className={`text-sm my-3 ${colorClasses[type]}`}>
            {message}
        </p>
    );
};

export default MessageSuccess;
