import { useEffect, useState } from "react";
import type { Products } from "../interface";
import Api from "../api/axios";

export function useFetchProducts(){
     const [products, setProducts] = useState<Products[]>([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {

        const fetchProducts = async() => {
            try {

                const response = await Api.get('/product-loja.json')
                setProducts(response.data);
                console.log('Produtos: ', response.data)
                
            } catch (error) {
                console.log('Erro ao buscar os produtos', error);
            } finally{
                setLoading(false)
            }
        }

        fetchProducts()

    },[])

    return { products, loading };
}