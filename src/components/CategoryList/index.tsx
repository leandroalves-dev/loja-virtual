import { Link } from "react-router-dom";
//icons
import { BsBookmarkFill } from "react-icons/bs";
//hooks
import { useFetchProducts } from "../../hooks/useFetchProducts"
//components
import Loading from "../Loading";

const CategoryList = () => {  
    const { products, loading } = useFetchProducts()
    const categoriasUnicas = [...new Set(products.map(item => item.category))];

    return (
        <div className="mt-10">
            {loading && <Loading />}           
            <h2 className="text-white mb-6 text-2xl flex items-center gap-2"><BsBookmarkFill /> Categorias de Produtos</h2>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2 max-sm:grid-cols-2">
                {categoriasUnicas.map((category, index) => (
                    <Link to={`/category/${category}`} key={index} className="mb-6 bg-pink-800 p-1 capitalize text-white text-2xl min-h-[400px] max-lg:min-h-[250px] flex items-center justify-center hover:opacity-60 transition ease-in-out delay-100">
                        {category === 'alimento' ? (
                            <div className="relative">
                                <img src="./categoria_alimento.jpg" alt="Alimento" />
                                <h2 className="absolute text-3xl font-bold text-shadow-2xs flex justify-center items-center w-full h-full top-0">{category}</h2>
                            </div>
                        ) : category === 'bebida' ? (
                            <div className="relative">
                                <img src="./categoria_bebida.jpg" alt="Bebida" />
                                <h2 className="absolute text-3xl font-bold text-shadow-2xs flex justify-center items-center w-full h-full top-0">{category}</h2>
                            </div>
                        ) : category === 'higiene' ? (
                            <div className="relative">
                                <img src="./categoria_higiene.jpg" alt="Higiene" />
                                <h2 className="absolute text-3xl font-bold text-shadow-2xs flex justify-center items-center w-full h-full top-0">{category}</h2>
                            </div>
                        ) : category === 'limpeza' ? (
                            <div className="relative">
                                <img src="./categoria_limpeza.jpg" alt="Limpeza" />
                                <h2 className="absolute text-3xl font-bold text-shadow-2xs flex justify-center items-center w-full h-full top-0">{category}</h2>
                            </div>
                        ) : null}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default CategoryList