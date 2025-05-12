interface ButtonsProps{
    title: string   
}

const Button = ({ title }: ButtonsProps) => {
    return (
        <button className="bg-pink-900 p-2 px-10 text-white rounded cursor-pointer hover:opacity-80 transition ease-in-out delay-100">{title}</button>
    )
}

export default Button