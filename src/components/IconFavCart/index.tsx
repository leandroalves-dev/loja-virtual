import { BsCart2, BsHeart } from "react-icons/bs"

const IconFavCart = () => {
    return (
        <>
            <div className="cursor-pointer text-white hover:text-white/30 transition ease-in-out delay-100 max-md:mr-3"><BsHeart size={24} /></div>
            <div className="cursor-pointer text-white hover:text-white/30 ease-in-out delay-100"><BsCart2 size={24} /></div>
        </>
    )
}

export default IconFavCart