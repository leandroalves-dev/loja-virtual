import Container from "../Container"
import Search from "../Search"
import Nav from "../Nav"
import Welcome from "../Welcome"
import IconFavCart from "../IconFavCart"

const Header = () => {

    return (
        <>
            <div className="py-2 bg-pink-900 text-white text-sm max-md:hidden">
                <Welcome />         
            </div>
            <header className="bg-neutral-900">
                <Container>
                    <div className="flex items-center justify-between max-md:justify-center max-md:flex-col min-h-32">
                        <div className="max-md:my-4">
                            <img src="./logo.png" alt="ShopSimples" className="w-56" />
                        </div>
                        <Search />
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