import { Link } from "react-router-dom";
import { renderStars } from "../../utils/renderStars";
import Loading from "../Loading";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import ImageProducts from "../ImageProducts/ImageProducts";

const ProductList = () => {

    const { products, loading } = useFetchProducts();

    const destaques = products.filter(item => item.emphasis === true);
    
    return (
        <div>
            {loading && <Loading />}
            <h2 className="text-white mb-6 text-2xl">Produtos em Destaques</h2>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-3 max-sm:grid-cols-2">
                {destaques.map(product => (
                    <div key={product.id} className="mb-8">
                        <Link to={`/product/${product.id}`}>
                            <ImageProducts src={product.imagem} alt={product.title} />
                        </Link>
                        <h2 className="text-white mt-2">{product.title}</h2>
                        <div className="flex items-end min-h-[40px] justify-between mt-2">
                            <div className="flex flex-col leading-5">
                                {product.sale && (
                                    <span className="text-neutral-700 text-sm line-through">
                                    R$ {product.price.toFixed(2)}
                                    </span>
                                )}
                                <span className="text-white">
                                    R$ {product.sale
                                    ? (product.price - (product.price * product.discount / 100)).toFixed(2)
                                    : product.price.toFixed(2)}
                                </span>
                            </div>
                            <span className="flex gap-1">{renderStars(product.rating)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductList