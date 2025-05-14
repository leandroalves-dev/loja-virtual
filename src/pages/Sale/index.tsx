import { Link } from "react-router-dom";
//hooks
import { useFetchProducts } from "../../hooks/useFetchProducts"
//components
import Container from "../../components/Container";
import Loading from "../../components/Loading";
//utils
import { renderStars } from "../../utils/renderStars";

const Sale = () => {
    
    const { products, loading } = useFetchProducts();
    const sale = products.filter(item => item.sale === true);

    return (
       <Container>
           <div className="mt-10">
                {loading && <Loading />}
                <h2 className="text-white mb-6 text-2xl">Produtos em Promoção</h2>
                <div className="grid grid-cols-4 gap-3 max-md:grid-cols-3 max-sm:grid-cols-2">
                    {sale.map(product => {
                        const precoComDesconto = (product.price - (product.price * product.discount / 100)).toFixed(2);

                        return (
                            <div key={product.id} className="relative">
                                <Link to={`/product/${product.id}`}>
                                    <img src={product.imagem} alt={product.title} className="bg-neutral-700 p-0.5" />
                                </Link>
                                <h2 className="text-white mt-2">{product.title}</h2>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex flex-col leading-5">
                                        <span className="text-neutral-700 text-[12px] line-through">De R$ {product.price.toFixed(2)}</span>
                                        <span className="text-white">Por R$ {precoComDesconto}</span>
                                    </div>
                                    <span className="flex gap-1">{renderStars(product.rating)}</span>
                                </div>
                                <span className="absolute top-2 right-2 bg-pink-800 rounded-full px-2.5 py-3 text-white text-[12px] shadow shadow-pink-600">
                                    -{product.discount}%
                                </span>
                            </div>
                        );
                    })}

                </div>
            </div>
       </Container> 
    )
}

export default Sale
