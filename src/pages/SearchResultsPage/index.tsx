import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { useFetchProducts } from "../../hooks/useFetchProducts"
import type { Products } from "../../interface"
import Loading from "../../components/Loading"
import Container from "../../components/Container"
import { BsSignpost2Fill } from "react-icons/bs"

const SearchResultsPage = () => {
    const location = useLocation()
    const { products, loading } = useFetchProducts()
    const [filteredProducts, setFilteredProducts] = useState<Products[]>([])

    const queryParams = new URLSearchParams(location.search)
    const searchTerm = queryParams.get("q")?.toLowerCase() || ""

    useEffect(() => {
        const results = products.filter(product =>
            product.title?.toLowerCase().includes(searchTerm)
        )
        setFilteredProducts(results)
    }, [products, searchTerm])

    if (loading) {
        return <Loading />
    }

    return (
        <Container>
            <div className="mt-10">
                <h1 className="text-xl text-white mb-4 flex items-center gap-2"><BsSignpost2Fill /> Resultados para: "{searchTerm}"</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="bg-neutral-800 p-2 rounded text-white">
                            <Link to={`/product/${product.id}`}>
                                <img src={product.imagem} alt={product.title} />
                                <h1 className="text-lg my-1">{product.title}</h1>
                                <p className="text-neutral-500 text-sm">{product.description}</p>
                            </Link>
                        </div>
                    ))}
                    {filteredProducts.length === 0 && <h1 className="text-white">Nenhum produto encontrado.</h1>}
                </div>
            </div>
        </Container>
    )
}

export default SearchResultsPage
