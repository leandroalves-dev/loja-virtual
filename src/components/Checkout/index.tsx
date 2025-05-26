import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useAuth } from "../../context/AuthContext"

import type { Cep } from "../../interface"


import Container from "../Container"
import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../../config/firebaseConfig"
import Loading from "../Loading"
import Input from "../Input"
import Button from "../Button"
import { useCart } from "../../context/CartContext"
import { useNavigate } from "react-router-dom"
import { useAutoClearMessage } from "../../hooks/useAutoClearMessage"
import MessageSuccess from "../MessageSuccess"

const Checkout = () => {

    const { user } = useAuth()
    const { cart, subTotalPrice, totalPrice, clearCart } = useCart()
    const { register, setValue, handleSubmit } = useForm<Cep>()        
    const [loading, setLoading] = useState(true);
    const { feedback, setFeedback } = useAutoClearMessage();

    const navigate = useNavigate()

    useEffect(() => {

        if(!user) return

        const fetchUserData = async() => {

            const docRef = doc(db, 'users', user.uid)
            const response = await getDoc(docRef)

            if(response.exists()){
                const data = response.data();

                setValue('name', data.name || '')                
                setValue('lastname', data.lastname || '')
                setValue('email', data.email || '')
                setValue('cep', data.cep || '')
                setValue('localidade', data.localidade || '')
                setValue('neighborhood', data.neighborhood || '')
                setValue('estado', data.estado || '')
                setValue('phone', data.phone || '')
                setValue('n', data.n || '')
                setValue('complement', data.complement || '')
                setValue('phone', data.phone || '')
                setValue('address', data.address || '')
                setValue('ref', data.ref || '')
            }

            setLoading(false)
            console.log('Dados do usuário', response.data())
        }

        fetchUserData()

    },[user, setValue])


    const onSubmit = async (data: Cep) => {
        if(!user) return

        const orderData = {
            userId: user.uid,
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: {
                cep: data.cep,
                address: data.address,
                neighborhood: data.neighborhood,
                city: data.localidade,
                state: data.estado,
                n: data.n,
                complement: data.complement,
                reference: data.ref || ''
            },
            items: cart.map(item => ({
                id: item.id,
                imagem: item.imagem,
                title: item.title,
                price: item.price,
                quantity: item.quantity
            })),
            subTotal: subTotalPrice,
            total: totalPrice,
            createdAt: serverTimestamp()
        }

        try {
            
            await addDoc(collection(db, 'orders'), orderData)
            setFeedback({ message: 'Pedido finalizado com sucesso!', type: 'success' })
     
            clearCart();

            await new Promise(resolve => setTimeout(resolve, 2000));
            navigate('/order-success', { state: { order: orderData } });

        } catch (error) {
            console.log('Erro ao salvar o pedido', error)
        }

        console.log("Dados para finalizar pedido:", data);
    };

    return (
        <Container>
            <div>
                {loading ? (
                    <Loading />
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex items-start gap-6 max-md:flex-col max-md:gap-0">
                            <div className="bg-neutral-950/30 border border-neutral-950/60 mt-6 p-4 w-2/2 max-md:w-full">
                                <p className="text-white text-[12px] mb-2">* Campos obrigatorios</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label=""
                                        type="text"
                                        placeholder="* Nome"
                                        register={register("name")}
                                    />
                                    <Input
                                        label=""
                                        type="text"
                                        placeholder="* Sobrenome"
                                        register={register("lastname")}
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <Input
                                        label=""
                                        type="text"
                                        placeholder="* (xx) xxxxxxxxx - telefone"
                                        register={register("phone")}
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <Input
                                        label=""
                                        type="text"
                                        placeholder="* xxxxx-xxx - cep"
                                        register={register("cep")}
                                    />
                                    <Input
                                        label=""
                                        type="text"
                                        placeholder="* Endereço"
                                        register={register("address")}
                                    /> 
                                    <Input
                                        label=""
                                        type="text"
                                        placeholder="* Bairro"
                                        register={register("neighborhood")}
                                    />
                                </div>
                                <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2">
                                    <Input
                                        label=""
                                        type="text"
                                        placeholder="* Estado"
                                        register={register("estado")}
                                    />
                                    <Input
                                        label=""
                                        type="text"
                                        placeholder="* Cidade"
                                        register={register("localidade")}
                                    />
                                    <Input
                                        label=""
                                        type="text"
                                        placeholder="* Numero"
                                        register={register("n")}
                                    />
                                    <Input
                                        label=""
                                        type="text"
                                        placeholder="Complemento"
                                        register={register("complement")}
                                    />
                                </div>
                                <div className="grid grid-cols-1">
                                    <Input
                                        label=""
                                        type="text"
                                        placeholder="Ponto de referência (opcional)"
                                        register={register("ref")}
                                    />
                                </div>
                            </div>
                            <div className="bg-neutral-950/30 border border-neutral-950/60 mt-6 p-4 w-1/2 self-start max-md:w-full">
                                <div className="grid grid-cols-1">
                                    <p className="text-[10px] text-neutral-600 leading-3 my-1">A confirmação e o acompanhamento de seu pedido serão enviados ao seu e-mail.</p>
                                    <Input
                                        label=""
                                        type="text"
                                        placeholder="* E-mail"
                                        register={register("email")}
                                    />
                                </div>
                               
                                <div>
                                    <Button title="Finalizar compra" />
                                </div>
                            </div>
                        </div>
                        {feedback && <MessageSuccess type={feedback.type} message={feedback.message} />}
                    </form>
                )}
            </div>
        </Container>
    )
}

export default Checkout