
import CategoryList from "../../components/CategoryList"
import Container from "../../components/Container"
import ProductList from "../../components/ProductList"
import SlideHome from "../../components/SlideHome"

const Home = () => {
    return (
        <>
            <SlideHome />
            <Container>
                <CategoryList />
                <ProductList />
            </Container>
        </>
        
    )
}

export default Home
