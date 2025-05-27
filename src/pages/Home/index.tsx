
import CategoryList from "../../components/CategoryList"
import Container from "../../components/Container"
import FeedbacksClients from "../../components/FeedbacksClients"
import ProductList from "../../components/ProductList"
import SaleHome from "../../components/SaleHome"
import SlideHome from "../../components/SlideHome"

const Home = () => {
    return (
        <>
            <SlideHome />
            <Container>
                <CategoryList />
                <ProductList />                
                <SaleHome />
            </Container>
            <FeedbacksClients />
        </>
        
    )
}

export default Home
