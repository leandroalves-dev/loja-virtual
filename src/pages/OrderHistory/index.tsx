/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
//firebase
import { collection, getDocs, query, where } from "firebase/firestore";
//config
import { db } from "../../config/firebaseConfig";
//context
import { useAuth } from "../../context/AuthContext";
//container
import Container from "../../components/Container";
//interface
import type { Order } from "../../interface";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";

const OrderHistory = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 3
    const totalPages = Math.ceil(orders.length / itemsPerPage);
    const paginatedData = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (!user) return;

                const ordersRef = collection(db, "orders");
                const q = query(ordersRef, where("userId", "==", user.uid));
                const snapshot = await getDocs(q);

                const fetchedOrders = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...(doc.data() as Omit<Order, 'id'>),
                }));

                setOrders(fetchedOrders);
            } catch (error) {
                console.log('Erro ao buscar os pedidos', error);
            } finally{
                setLoading(false)
            }
        };

        fetchOrders();
    }, [user]);

    return (
        <Container>
            <h1 className="text-2xl text-white mt-6">Meus Pedidos</h1>
           
            {loading ? (
                <Loading />
            ) :  paginatedData.length === 0 ? (
                <h2 className="text-white mt-4">Você ainda não fez nenhum pedido.</h2>
            ) : (
                <ul className="mt-4">
                    {paginatedData.map(order => (
                        <li key={order.id} className="bg-neutral-900 mb-6 pb-6 text-white border-b border-neutral-800">
                            <p className="text-sm mb-2 text-white/60">
                                Pedido feito em: <span className="text-pink-600">{order.createdAt?.toDate().toLocaleDateString()}</span>
                            </p>
                            <ul className="list-none grid grid-cols-3 gap-4">
                                {order.items.map(item => (
                                <li key={item.id} className="flex gap-5 mb-4">
                                    <div className="w-28 p-1 border-2 border-pink-800">
                                        <img src={item.imagem} alt={item.title} className="w-28 h-full" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-white text-lg mb-1">{item.title}</h2>
                                        <span className="text-white/70">Quantidade: {item.quantity}x</span>
                                        <span className="text-white/70">Preço: R$ {item.price.toFixed(2)}</span>
                                    </div>
                                </li>
                                ))}
                            </ul>
                            <p className="mt-2 font-semibold text-white">Total: R$ {order.total.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            )}

            {orders.length > itemsPerPage && (
                <div className="my-6">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
            )}
        </Container>
    );
};

export default OrderHistory;
