interface ButtonsProps{
    title: string
    className?: string
    onClick?: () => void 
}

const Button = ({ title, className, onClick }: ButtonsProps) => {
    return (
        <button onClick={onClick} className={` ${className ?? ''} bg-pink-900 p-2 text-white rounded cursor-pointer hover:opacity-80 transition ease-in-out delay-100`}>{title}</button>
    )
}

export default Button