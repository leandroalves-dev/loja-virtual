import { Link, useLocation } from "react-router-dom"
import { useState } from "react";
//icons
import { BsJustify, BsX } from "react-icons/bs";
//components
import Welcome from "../Welcome";

const Nav = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const { pathname } = useLocation();

     const navItems = [
        { label: "Início", to: "/" },
        { label: "Sobre", to: "/about" },
        { label: "Produtos", to: "/products" },
        { label: "Ofertas", to: "/sale" },
        { label: "Contato", to: "/contact" },
    ];

    return (
        <nav> 
            <ul className="grid grid-cols-5 gap-2 text-center text-white max-md:hidden">
                {navItems.map(({ label, to }) => (
                    <li key={to} className={`py-2 border cursor-pointer border-neutral-950/60 rounded transition ${pathname === to ? "bg-pink-900 text-white" : "bg-neutral-950/20 hover:bg-pink-900 hover:text-white"}`}>
                        <Link to={to} className="block w-full h-full">{label}</Link>
                    </li>
                ))}
            </ul>

            <div className='md:hidden absolute top-5 left-3'>
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    {!menuOpen && (
                        <BsJustify size={30} className='text-white cursor-pointer' />
                    )}
                </button>
            </div>     

            {/*MENU MOBILE*/}
            <div className={`fixed top-0 right-0 w-64 h-full bg-neutral-950 z-99  transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
                <button className="absolute top-2 right-2 text-white cursor-pointer" onClick={() => setMenuOpen(false)}>
                   <BsX size={30} />
                </button>  

                <div className="py-2 bg-pink-900 text-white text-sm">
                    <Welcome />         
                </div>                
                
                <div className="mt-3 px-3">
                    <ul className="grid grid-rows-5 gap-1 text-white" onClick={() => setMenuOpen(false)}>
                        {navItems.map(({ label, to }) => (
                            <li key={to} className={`py-2 cursor-pointer transition ${pathname === to ? "text-pink-900" : "hover:text-pink-900"}`}>
                                <Link to={to} className="block w-full h-full">{label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </nav>
    )
}

export default Nav
