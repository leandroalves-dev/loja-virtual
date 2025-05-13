import { Link, useParams } from "react-router-dom"
import { useFetchProducts } from "../../hooks/useFetchProducts";
import Loading from "../../components/Loading";
import Container from "../../components/Container";
import Quantity from "../../components/Quantity";
import { useState } from "react";
import Button from "../../components/Button";
import { BsHeart, BsHeartFill, BsTagFill } from "react-icons/bs";
import { useFavorites } from "../../context/FavoritesContext";
import MessageSuccess from "../../components/MessageSuccess";
import { useAutoClearMessage } from "../../hooks/useAutoClearMessage";
import { renderStars } from "../../utils/renderStars";
import Breadcrumbs from "../../components/Breadcrumbs";

const ProductDetails = () => {

    const { id } = useParams()
    const { products, loading } = useFetchProducts();
    const [quantity, setQuantity] = useState(1);
    const { toggleFavorite, isFavorite } = useFavorites();
    const { message: success, setMessage: setSuccess } = useAutoClearMessage()
    const [messageType, setMessageType] = useState<'success' | 'warning' | 'error'>('success');

    const product = products.find(item => item.id === Number(id))

    if(loading) return <Loading />
    if(!product) return <p className="text-white">Produto não encontrado!</p>

    const handleFavorite = () => {

        if (!product) return;

        const isFav = isFavorite(product.id);
        toggleFavorite(product);

        if (isFav) {
            setSuccess('Favorito removido com sucesso!')
            setMessageType('warning');
        }else{
            setSuccess('Favorito adicionado com sucesso!')
            setMessageType('success');
        }  
    };

    return (
        <Container>
            <Breadcrumbs items={[
                { label: 'Produtos', to: '/products' },
                { label: product.title }
            ]} />
            <div className="flex gap-6 items-start my-10 max-md:flex-col border-y border-neutral-800 py-4">
                <div className="bg-neutral-950/20 border-4 border-pink-800 w-2/3 max-md:w-full">
                    <img src={product.imagem} alt={product.title} className="object-cover w-full h-[450px]" />
                </div>
                <div className=" w-1/2 self-start max-md:w-full">
                    <div className="bg-neutral-950/20 p-4 mb-6">
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
                        <div className="flex gap-1">{renderStars(product.rating)}</div>
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

                    {success && <MessageSuccess message={success} type={messageType} />}

                    <div className='border-y-1 border-neutral-800 my-6'></div>

                    <div className="bg-neutral-950/20 p-4">
                        <h3 className="text-white mb-1">Tags:</h3>
                        <ul className="flex gap-2">
                            {product.tags.map((tag, index) => (
                                <li key={index} className="flex gap-1 items-center bg-pink-800 text-sm hover:bg-pink-800/50 transition-all ease-in-out delay-100 text-white rounded p-1 px-2">
                                    <BsTagFill /> <Link to={`/tags/${tag}`}>{tag}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div>
                 <h2>COMENTÁRIOS</h2>
            </div>
           
        </Container>
    )
}

export default ProductDetails