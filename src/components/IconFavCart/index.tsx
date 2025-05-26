// icons
import { BsCart2, BsHeart } from "react-icons/bs"
// components
import Minicart from "../MiniCart"
import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"

const IconFavCart = () => {

    const { isCartOpen, setIsCartOpen } = useCart();

    return (
        <div className="relative flex gap-4 items-center max-md:gap-0">
            <div className="cursor-pointer text-white hover:text-white/30 transition ease-in-out delay-100 max-md:mr-3">
                <Link to='/favorites'>
                    <BsHeart size={24} />
                </Link>
            </div>

            <div className="cursor-pointer text-white hover:text-white/30 transition ease-in-out delay-100" onClick={() => setIsCartOpen(!isCartOpen)}>
                <BsCart2 size={24} />
            </div>

            <div className={`fixed top-0 right-0 h-full w-[350px] bg-neutral-900 border border-neutral-800/60 z-40 transform transition-transform duration-300 ease-in-out ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
                <Minicart  />
            </div>
        </div>
    )
}

export default IconFavCart
