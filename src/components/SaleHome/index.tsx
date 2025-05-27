import { useMemo } from "react";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import Loading from "../Loading";
import { Link } from "react-router-dom";

const SaleHome = () => {

    const { products, loading } = useFetchProducts();

    const sale = useMemo(() => {
        return products.filter(item => item.sale === true);
    }, [products]);

    const selectedSales = useMemo(() => {
        const shuffled = [...sale].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 2);
    }, [sale]);

    
    console.log('selectedSales', selectedSales)

    return (
        <div className="mb-10 mt-6 border-t border-b border-neutral-800 py-8">
            {loading && <Loading />}
            <h2 className="text-white mb-6 text-2xl">Produto em oferta</h2>
            {selectedSales.map((product, index) => {
                const precoComDesconto = (product.price - (product.price * product.discount / 100)).toFixed(2);

                return(
                    <div className={`flex justify-between ${ index % 2 !== 0 ? 'flex-row-reverse': ''} max-md:flex-col`}>
                        <div className="flex justify-center basis-3/5 items-center relative">
                            <img src={product.imagem} alt={product.title} />
                            <span className="absolute top-2 right-2 bg-pink-800 rounded-full px-2.5 py-3 text-white text-[12px] shadow shadow-pink-600">
                                -{product.discount}%
                            </span>
                        </div>
                        <div className="flex flex-col basis-3/5 justify-center bg-neutral-800/10">
                            <div className={`flex flex-col px-10 ${ index % 2 === 0 ? 'max-md:px-0': ''} max-md:my-8`}>
                                <h2 className="text-3xl text-white mb-3">{product.title}</h2>
                                <p className="text-white">{product.description}</p>
                                <div className="mt-4 flex flex-col">
                                    <span className="text-neutral-700 text-md line-through">De R$ {product.price.toFixed(2)}</span>
                                    <span className="text-white text-2xl">Por R$ {precoComDesconto}</span>    
                                </div>                                
                                <Link to={`/product/${product.id}`} className="text-white w-32 mt-6 bg-pink-800 py-2 px-8 hover:opacity-80 transition ease-in-out delay-100">Ver mais</Link>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SaleHome