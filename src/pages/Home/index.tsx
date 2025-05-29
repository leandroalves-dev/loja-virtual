
import Benefits from "../../components/Benefits"
import CategoryList from "../../components/CategoryList"
import Container from "../../components/Container"
import FeedbacksClients from "../../components/FeedbacksClients"
import MoreComments from "../../components/MoreComments"
import ProductList from "../../components/ProductList"
import SaleHome from "../../components/SaleHome"
import SlideHome from "../../components/SlideHome"

const Home = () => {
    return (
        <>
            <SlideHome />
            <Container>
                <Benefits />
                <CategoryList />
                <ProductList />                
                <SaleHome />
            </Container>
            <FeedbacksClients />
            <Container>
                <MoreComments />
            </Container>
        </>
        
    )
}

export default Home
