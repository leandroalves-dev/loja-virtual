interface ButtonsProps{
    title: string
    className?: string 
}

const Button = ({ title, className }: ButtonsProps) => {
    return (
        <button className={` ${className ?? ''} bg-pink-900 p-2 text-white rounded cursor-pointer hover:opacity-80 transition ease-in-out delay-100`}>{title}</button>
    )
}

export default Button