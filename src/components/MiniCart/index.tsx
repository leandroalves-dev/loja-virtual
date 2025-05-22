//icons
import { BsTrash, BsX } from "react-icons/bs";
//components
import Button from "../Button";
import Quantity from "../Quantity";
import { useCart } from "../../context/CartContext";

interface MiniCartProps{
    setIsCartOpen: (open: boolean) => void
}

const Minicart = ({ setIsCartOpen }: MiniCartProps) => {

    const { cart, removeFromCart, increaseQuantity, decreaseQuantity, totalQuantity, subTotalPrice, totalPrice  } = useCart()

    return (
        <div className="min-h-screen flex flex-col">
            <header className="flex items-center justify-between p-4">
                <h2 className="text-lg text-white">Seu Carrinho ({totalQuantity})</h2>
                <button className="cursor-pointer" onClick={() => setIsCartOpen(false)}><BsX size={30} color="#FFF" /></button>               
            </header>

            <div className="flex flex-col justify-between flex-1 text-sm">                
                <div className='overflow-y-auto max-h-[350px]'>
                        {cart.length === 0 ? (
                            <h1 className="text-white text-lg flex flex-1 min-h-[350px] justify-center items-center">Carrinho vazio</h1>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className="p-4 flex justify-between border-b-1 border-b-neutral-800/60">

                                    <div className="flex gap-2">
                                        <div className="bg-neutral-800 p-2 text-white w-20 flex justify-center items-center">
                                            <img src={item.imagem} alt={item.title} />
                                        </div>
                                        <div className="text-white">
                                            <h2 className="mb-1 text-sm">{item.title}</h2>
                                            <p className="text-[10px]">R$ {item.price}</p>
                                            <Quantity 
                                                quantity={item.quantity} 
                                                onIncrease={() => increaseQuantity(item.id)} 
                                                onDecrease={() => decreaseQuantity(item.id)} 
                                            />

                                        </div>
                                    </div>
                                    <div>
                                        <button className="cursor-pointer text-white hover:text-pink-600" onClick={() => removeFromCart(item.id)}><BsTrash size={14} /></button>
                                    </div>

                                </div>
                            ))
                        )}
                        
                </div>

                {cart.length !== 0 && (
                    <div className="p-4 text-white">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-md">Subtotal:</span>
                            <span className="text-md">R$ {subTotalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-lg">Total:</span>
                            <span className="text-lg">R$ {totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                )}
                
            </div>
            {cart.length !== 0 && (
                <div className="flex justify-between items-center m-3 gap-2 text-white">
                    <Button title="Finalizar compra" className="w-full text-sm" />
                    <button className="py-2 bg-gray-800 px-2 w-full text-sm cursor-pointer rounded hover:opacity-80 transition ease-in-out delay-100">Cancelar compra</button>
                </div>
            )}
            
        </div>
    )
}

export default Minicart