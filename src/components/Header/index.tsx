import { Link } from "react-router-dom"
//components
import Container from "../Container"
import Nav from "../Nav"
import Welcome from "../Welcome"
import IconFavCart from "../IconFavCart"
import FormSearch from "../FormSearch"

const Header = () => {

    return (
        <>
            <div className="py-2 bg-pink-900 text-white text-sm max-md:hidden">
                <Welcome />         
            </div>
            <header className="bg-neutral-900">
                <Container> 
                    <div className="flex items-center justify-between max-md:justify-center max-md:flex-col min-h-32">
                        <div className="max-md:my-4 max-md:flex max-md:items-center">
                            <div>
                                <Link to="/"><img src="/logo.png" alt="ShopSimples" className="w-56" /></Link>
                            </div>
                            <div className="hidden max-md:absolute max-md:flex top-6 right-6">
                                <IconFavCart />
                            </div>
                        </div>
                        <FormSearch />
                        <div className="flex gap-3 max-md:hidden">
                            <IconFavCart />
                        </div>
                    </div>
                    <Nav />
                </Container>
            </header>
        </>
    )
}

export default Header