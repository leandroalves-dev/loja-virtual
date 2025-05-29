import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import Api from "../../api/axios";
import type { Products } from "../../interface";
import type { ListComments } from "../../interface";
import { Link } from "react-router-dom";
import { BsBookmarkFill } from "react-icons/bs";


const ProdutosComentados = () => {
    const [products, setProducts] = useState<Products[]>([]);
    const [commentedProducts, setCommentedProducts] = useState<Products[]>([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await Api.get("/product-loja.json");
            const allProducts: Products[] = response.data;
            setProducts(allProducts);

            const unsubscribe = onSnapshot(collection(db, "comments"), snapshot => {
                const comments: ListComments[] = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as Omit<ListComments, "id">),
            }));

            // Pega os IDs únicos dos produtos que foram comentados
            const commentedProductIds = Array.from(new Set(comments.map(c => c.productId)));

            // Filtra os produtos que têm comentários
            const filtered = allProducts.filter(product => commentedProductIds.includes(product.id));
                setCommentedProducts(filtered);
            });

            return () => unsubscribe();
            } catch (error) {
                console.error("Erro ao buscar produtos ou comentários", error);
            }
        };

        fetchData();
    }, []);

    console.log('commentedProducts', commentedProducts)

    return (
        <>
             {commentedProducts.length !== 0 && (
                <div className="p-4 text-white">
                    <h2 className="text-white mb-6 text-2xl flex items-center gap-2"><BsBookmarkFill /> Produtos mais comentados</h2>
                    <div className="grid grid-cols-3 gap-3 max-md:grid-cols-2">
                        {commentedProducts.map(product => (
                            <Link to={`/product/${product.id}`} key={product.id} className="bg-neutral-800 p-2 rounded mb-2">
                                <img src={product.imagem} alt="" />
                                <h2 className="text-lg my-2">{product.title}</h2>
                                <p className="text-neutral-500 text-sm">{product.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
             ) }
        </>
        
    );
};

export default ProdutosComentados;
