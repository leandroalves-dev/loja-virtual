import { Link, useParams } from "react-router-dom"
//icons
import { BsFillBookmarkFill } from "react-icons/bs"
//hooks
import { useFetchProducts } from "../../hooks/useFetchProducts"
//utils
import { renderStars } from "../../utils/renderStars"
//components
import Loading from "../../components/Loading"
import Container from "../../components/Container"
import Breadcrumbs from "../../components/Breadcrumbs"

const Category = () => {

    const { category } = useParams()
    const { products, loading } = useFetchProducts()

    const categoryFilter = products.filter(item => item.category === category)

    return (
        <Container>
            <div>
                {loading && <Loading />}
                <Breadcrumbs items={[
                    { label: 'Categoria', to: '/products' },
                    { label: category ?? 'Categoria' }
                ]} />
                <div className={`flex items-center gap-1 my-10 ${category === 'alimento' ? 'text-green-800' : category === 'higiene' ? 'text-blue-800' : 'text-yellow-400'}`}>
                    <BsFillBookmarkFill size={18} /> 
                    <h2 className="text-white capitalize">{category}</h2>
                </div>
                <div className="grid grid-cols-4 gap-3 max-md:grid-cols-3 max-sm:grid-cols-2">
                    {categoryFilter.map(category => (
                        <div key={category.id}>
                            <Link to={`/product/${category.id}`}>
                                <img src={category.imagem} alt={category.title} className="bg-neutral-700 p-0.5" />
                            </Link>
                            <h2 className="text-white mt-2">{category.title}</h2>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-neutral-700">R$ {category.price}</span>
                                <span className="flex gap-1">{renderStars(category.rating)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    )
}

export default Category