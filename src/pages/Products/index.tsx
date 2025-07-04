import { useState } from "react"
import { Link } from "react-router-dom"
//components
import Container from "../../components/Container"
import Loading from "../../components/Loading"
import Pagination from "../../components/Pagination"
import ImageProducts from "../../components/ImageProducts/ImageProducts"
//hooks
import { useFetchProducts } from "../../hooks/useFetchProducts"
//utils
import { renderStars } from "../../utils/renderStars"

const Products = () => {

    const { products, loading } = useFetchProducts();
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const paginatedData = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    return (
        <Container>
            <div className="mt-10">
                {loading && <Loading />}
                <h2 className="text-white mb-6 text-2xl">Nossos Produtos</h2>
                <div className="grid grid-cols-4 gap-3 max-md:grid-cols-3 max-sm:grid-cols-2">
                    {paginatedData.map(product => (
                        <div key={product.id}>
                        <Link to={`/product/${product.id}`} className="max-md:w-72">
                            <ImageProducts src={product.imagem} alt={product.title} />
                        </Link>
                        <h2 className="text-white mt-2">{product.title}</h2>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-neutral-700">R$ {product.price}</span>
                                <span className="flex gap-1">{renderStars(product.rating)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {products.length > itemsPerPage && (
                <div className="my-6">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
            )}
        </Container>
    )
}

export default Products
