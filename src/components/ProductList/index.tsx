import { Link } from "react-router-dom";
import { renderStars } from "../../utils/renderStars";
import Loading from "../Loading";
import { useFetchProducts } from "../../hooks/useFetchProducts";

const ProductList = () => {

    const { products, loading } = useFetchProducts();

    const destaques = products.filter(item => item.emphasis === true);

    return (
        <div>
            {loading && <Loading />}
            <h2 className="text-white mb-6 text-2xl">Produtos em Destaques</h2>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-3 max-sm:grid-cols-2">
                {destaques.map(product => (
                    <div key={product.id}>
                        <Link to={`/product/${product.id}`}>
                            <img src={product.imagem} alt={product.title} className="bg-neutral-700 p-0.5" />
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
    )
}

export default ProductList