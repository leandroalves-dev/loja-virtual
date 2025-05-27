
import CategoryList from "../../components/CategoryList"
import Container from "../../components/Container"
import FeedbacksClients from "../../components/FeedbacksClients"
import ProductList from "../../components/ProductList"
import SlideHome from "../../components/SlideHome"

const Home = () => {
    return (
        <>
            <SlideHome />
            <Container>
                <CategoryList />
                <ProductList />
                <FeedbacksClients />
            </Container>
        </>
        
    )
}

export default Home
