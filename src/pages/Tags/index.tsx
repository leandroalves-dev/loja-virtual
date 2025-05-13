import { Link, useParams } from "react-router-dom"
//icons
import { BsFillBookmarkFill, BsTagFill } from "react-icons/bs"
//hooks
import { useFetchProducts } from "../../hooks/useFetchProducts"
//utils
import { renderStars } from "../../utils/renderStars"
//components
import Loading from "../../components/Loading"
import Container from "../../components/Container"

const Tags = () => {

    const { tags } = useParams()
    const { products, loading } = useFetchProducts()

    if(!tags) return

    const tagFilter = products.filter(item => item.tags.includes(tags))

    

    return (
        <Container>
            <div className="mt-10">
                {loading && <Loading />}
                <div className={`flex items-center gap-1 mb-6`}>
                    <BsFillBookmarkFill size={18} /> 
                    <h2 className="text-white capitalize">#{tags}</h2>
                </div>

                {tagFilter.length === 0 && !loading && (
                    <p className="text-white">Nenhum produto encontrado com essa tag.</p>
                )}

                <div className="grid grid-cols-4 gap-3 max-sm:grid-cols-2 max-md:grid-cols-3">
                    {tagFilter.map(product => (
                        <Link to={`/product/${product.id}`} key={product.id} className="bg-neutral-900">
                            <img src={product.imagem} alt={product.title} className="h-48 w-full object-cover" />
                            <h3 className="text-white mt-2">{product.title}</h3>
                            <span className="text-neutral-700">R$ {product.price}</span>
                            <span className="text-yellow-400 text-sm flex gap-1">{renderStars(product.rating)}</span>
                            <span className="flex items-center gap-1 text-sm text-white/70 mt-1">
                                <BsTagFill /> {product.tags.join(', ')}
                            </span>
                        </Link>
                    ))}
                </div>
                
            </div>
        </Container>
    )
}

export default Tags