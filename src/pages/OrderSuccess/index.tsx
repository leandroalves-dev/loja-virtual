/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
//components
import Container from "../../components/Container"

const OrderSuccess = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state?.order;

    useEffect(() => {
        if(!order){
            navigate('/')
        }
    },[order, navigate])

    if (!order) return null;

    return (
        <Container>
            <div className="bg-neutral-950 p-6 rounded shadow-md mt-6 text-center">
                <h1 className="text-3xl  text-green-700 mb-4">Pedido realizado com sucesso!</h1>
                <p className="text-md text-green-700">Obrigado pela sua compra, {order.name}!</p>
                <div className="mt-4 text-left">
                <h2 className="mb-2 text-lg text-white">Resumo do Pedido:</h2>
                <ul className="list-disc text-md text-white/70">
                    {order.items.map((item: any) => (
                        <li key={item.id} className="flex gap-5 mb-3">
                            <div className="w-32 p-1 bg-pink-800">
                                <img src={item.imagem} alt={item.title} />
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-white text-lg mb-2">{item.title}</h2>
                                <span>Quantidade: {item.quantity}x</span>
                                <span>Preço: {item.price.toFixed(2)}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <p className="mt-3 text-white">Total gasto: R$ {order.total.toFixed(2)}</p>
                </div>
            </div>
        </Container>
    )
}

export default OrderSuccess