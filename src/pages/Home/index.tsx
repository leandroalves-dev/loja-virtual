
import Container from "../../components/Container"
import ProductList from "../../components/ProductList"
import SlideHome from "../../components/SlideHome"

const Home = () => {
    return (
        <>
            <SlideHome />
            <Container>
                <ProductList />
            </Container>
        </>
        
    )
}

export default Home
