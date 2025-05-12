import { useState } from "react";
import { BsJustify, BsX } from "react-icons/bs";
import { Link } from "react-router-dom"
import Welcome from "../Welcome";

const Nav = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    
    return (
        <nav> 
            <ul className="grid grid-cols-5 gap-2 text-center text-white max-md:hidden">
                <li className="bg-neutral-950/20 py-2 border border-neutral-950/60"><Link to='/'>Inicio</Link></li>
                <li className="bg-neutral-950/20 py-2 border border-neutral-950/60"><Link to='/about'>Sobre</Link></li>
                <li className="bg-neutral-950/20 py-2 border border-neutral-950/60"><Link to='/products'>Produtos</Link></li>
                <li className="bg-neutral-950/20 py-2 border border-neutral-950/60"><Link to='/offers'>Ofertas</Link></li>
                <li className="bg-neutral-950/20 py-2 border border-neutral-950/60"><Link to='/contact'>Contato</Link></li>
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
                    <ul className="grid grid-rows-5 gap-1 text-white">
                        <li><Link to='/'>Inicio</Link></li>
                        <li><Link to='/about'>Sobre</Link></li>
                        <li><Link to='/products'>Produtos</Link></li>
                        <li><Link to='/offers'>Ofertas</Link></li>
                        <li><Link to='/contact'>Contato</Link></li>
                    </ul>
                </div>
            </div>

        </nav>
    )
}

export default Nav
