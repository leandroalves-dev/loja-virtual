import { Link } from "react-router-dom";
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
            <h2 className="text-white mb-6 text-2xl">Categorias de Produtos</h2>
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2 max-sm:grid-cols-2">
                {categoriasUnicas.map((category, index) => (
                    <Link to={`/category/${category}`} key={index} className="mb-6 bg-pink-800 capitalize text-white text-2xl min-h-[400px] max-lg:min-h-[250px] flex items-center justify-center hover:opacity-90 transition ease-in-out delay-100">
                        {category}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default CategoryList