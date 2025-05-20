import { Link, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
//icons
import { BsHeart, BsHeartFill, BsTagFill } from "react-icons/bs";
//firebase
import { collection, onSnapshot, query, where } from "firebase/firestore";
//config
import { db } from "../../config/firebaseConfig";
//hooks
import { useFetchProducts } from "../../hooks/useFetchProducts";
import { useAutoClearMessage } from "../../hooks/useAutoClearMessage";
//components
import Loading from "../../components/Loading";
import Container from "../../components/Container";
import Quantity from "../../components/Quantity";
import Button from "../../components/Button";
import MessageSuccess from "../../components/MessageSuccess";
import Breadcrumbs from "../../components/Breadcrumbs";
import Cep from "../../components/Cep";
import Comments from "../../components/Comments";
//context
import { useFavorites } from "../../context/FavoritesContext";
import { renderStars } from "../../utils/renderStars";
//interface
import type { ListComments } from "../../interface";

const ProductDetails = () => {

    const { id } = useParams()
    const { feedback, setFeedback } = useAutoClearMessage();
    const { products, loading } = useFetchProducts();
    const { toggleFavorite, isFavorite } = useFavorites();
    const [quantity, setQuantity] = useState(1);
    const commentsRef = useRef<HTMLDivElement>(null);

    const [comments, setComments] = useState<ListComments[]>([]);
    const [rating, setRating] = useState(0);

    const product = products.find(item => item.id === Number(id))

    useEffect(() => {
        if (!product) return;

        const q = query(collection(db, "comments"), where("productId", "==", product.id));

        const getComments = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...(doc.data() as Omit<ListComments, 'id'>)
            }));

            setComments(data);

            if (data.length > 0) {
                const media = data.reduce((acc, c) => acc + c.rating, 0) / data.length;
                setRating(media);
            } else {
                setRating(0);
            }
        });

        return () => getComments();
    }, [product]);

    const handleFavorite = () => {
        if (!product) return;

        const isFav = isFavorite(product.id);
        toggleFavorite(product);

        if (isFav) {
            setFeedback({ message: 'Favorito removido com sucesso!', type: 'warning'})
        }else{
            setFeedback({ message: 'Favorito adicionado com sucesso!', type: 'success'})
        }  
    };

    const scrollToComments = () => {
        commentsRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    if(loading) return <Loading />
    if(!product) return <p className="text-white">Produto não encontrado!</p>

    return (
        <Container>
            <Breadcrumbs items={[ { label: 'Produtos', to: '/products' }, { label: product.title } ]} />
            <div className="flex gap-6 items-start my-10 max-md:flex-col border-y border-neutral-800 py-4">
                <div className="bg-neutral-950/20 border-4 border-pink-800 w-2/3 max-md:w-full">
                    <img src={product.imagem} alt={product.title} className="object-cover w-full h-[450px]" />
                </div>
                <div className=" w-1/2 self-start max-md:w-full">
                    <div className="bg-neutral-950/20 p-4 mb-4">
                        <div className="flex justify-between items-center">
                            <h1 className="text-white text-2xl">{product.title}</h1>
                            <div className="cursor-pointer" onClick={handleFavorite}>
                                {isFavorite(product.id) ? (
                                    <BsHeartFill color="red" />
                                ) : (
                                    <BsHeart color="#FFF" />
                                )}
                            </div>
                        </div>

                        <div className="flex gap-1 text-white text-sm cursor-pointer hover:underline" onClick={scrollToComments}>
                            {renderStars(Math.round(rating))} ({comments.length})
                        </div>

                        <div className="my-4">
                            <h3 className="text-white mb-1">Descrição do produto</h3>
                            <p className="text-neutral-700 text-sm">{product.description}</p>
                        </div>
                        <div>
                            <h3 className="text-white text-sm">Produto em estoque: <span className="bg-pink-800 rounded px-2 py-1 text-[12px]">{product.qtda}</span></h3>
                        </div>
                        <div className="my-4">
                            <h3 className="text-white text-sm">Quantidade:</h3>
                            <Quantity quantity={quantity} onIncrease={() => setQuantity(q => q + 1)} onDecrease={() => setQuantity(q => (q > 1 ? q - 1 : 1))} />
                        </div>
                        <Button title="Adicionar ao carrinho" />
                    </div>

                    {feedback && <MessageSuccess type={feedback.type} message={feedback.message} />}

                    <div className='border-y-1 border-neutral-800 my-4'></div>

                    <Cep />
                </div>
            </div>

            <div className="bg-neutral-950/20 p-4 mb-10">
                <h3 className="text-white mb-1">Tags:</h3>
                <ul className="flex gap-2">
                    {product.tags.map((tag, index) => (
                        <li key={index} className="flex gap-1 items-center bg-pink-800 text-sm hover:bg-pink-800/50 transition-all ease-in-out delay-100 text-white rounded p-1 px-2">
                            <BsTagFill /> <Link to={`/tags/${tag}`}>{tag}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div ref={commentsRef}>
                <Comments productId={product.id} />
            </div>
           
        </Container>
    )
}

export default ProductDetails