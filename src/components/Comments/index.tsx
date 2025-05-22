import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
//icons
import { BsStar, BsStarFill } from "react-icons/bs"
//firebase
import { addDoc, collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
//config
import { db } from "../../config/firebaseConfig";
//components
import Input from "../Input";
import Button from "../Button";
import Loading from "../Loading";
import MessageSuccess from "../MessageSuccess";
//hooks
import { useAutoClearMessage } from "../../hooks/useAutoClearMessage";
//context
import { useAuth } from "../../context/AuthContext"
//interface
import type { ListComments } from "../../interface";

const schema = z.object({
    name: z.string().min(1,'Preencha o campo nome'),
    message: z.string().min(1, 'Preencha o campo de mensagem'),
})

type FormData = z.infer<typeof schema>

const Comments = ({ productId }: { productId: number }) => {
    const commentsRef = useRef<HTMLDivElement>(null);
    const { userData } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema)})
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState<ListComments[]>([])
    const [loading, setLoading] = useState(true);
    const defaultImage = "https://i.pinimg.com/236x/a8/da/22/a8da222be70a71e7858bf752065d5cc3.jpg"; 
    const { feedback, setFeedback } = useAutoClearMessage();

    const scrollToComments = () => {
        commentsRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    //Permite ver atulalização em tempo real
    useEffect( () => {
        
        const commentsQuery = query(collection(db, 'comments'), where('productId', '==', productId), orderBy('createdAt','desc'))
        const getComments = onSnapshot(commentsQuery, (comments) => {
            const data: ListComments[] = comments.docs.map(comment => ({
                 id: comment.id,
                ...(comment.data() as Omit<ListComments, 'id'>)
            }))

            setComments(data)
            setLoading(false)
        })

        return () => getComments()
    },[])

    const onsubmit = async (data: FormData) => {

        if(rating === 0){
            setFeedback({ message: 'Por favor, selecione uma nota com as estrelas!', type: 'warning' });
            return
        }

        await addDoc(collection(db, 'comments'), {
            name: data.name,
            message: data.message,
            rating: rating,
            imagem: userData?.imagem ?? null,
            createdAt: new Date(),
            productId: productId
        })
        
        reset();
        setRating(0);
        setFeedback({ message: 'Comentário criado com sucesso!', type: 'success' });
    }

    if(comments.length > 0){
        console.log('COMENTARIOS', comments)
    }


    return (
        <div className="mb-10">
            <div className="flex justify-between items-center">
                <h2 className="text-white text-lg flex items-center gap-1"><BsStarFill /> Avaliação dos Clientes</h2>
                <button className="bg-pink-800 py-1 px-2 text-white rounded cursor-pointer" onClick={scrollToComments}>Avaliar</button>
            </div>

            {loading ? (
                <Loading />
            ) : comments.length === 0 ? (
                <h1 className="text-pink-800 text-md py-2">No momento não há nenhum comentário.</h1>
            ) : (
                comments.map(comment => (
                    <div key={comment.id} className="mt-6 border-b border-neutral-800 pb-8">
                        <div className="flex gap-1 items-center mb-3 text-yellow-300">
                            {[1, 2, 3, 4, 5].map((star) =>
                                comment.rating >= star ? <BsStarFill key={star} /> : <BsStar key={star} />
                            )}
                        </div>
                        <div className="flex items-start gap-2 text-white">
                            <div className="w-16 h-16 flex justify-center items-center">
                                <img src={comment.imagem || defaultImage} />
                            </div>
                            <div className="flex flex-col text-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <h2 className="font-bold">{comment.name}</h2> 
                                    <span>-</span>
                                    <span className="text-neutral-500">
                                        {comment.createdAt?.toDate().toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'})} às
                                        {comment.createdAt?.toDate().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <p>{comment.message}</p>
                            </div>
                        </div>
                    </div>
                ))
            )}
            <div ref={commentsRef} className="mt-10">
                <h1 className="text-white text-2xl mb-2">Deixe seu comentário:</h1>
                <form onSubmit={handleSubmit(onsubmit)}>
                    <Input
                        label="Seu nome"
                        type="text"
                        placeholder="Insira seu nome"
                        register={register('name')}
                        error={errors.name?.message}    
                    />
                    <div className="mb-2">
                        <label className="text-white mb-1 block">Mensagem</label>
                        <textarea {...register('message')} className="p-2.5 rounded text-sm placeholder:text-white/30 border border-white/10 w-full text-white focus:outline-none">
                        </textarea>
                    </div>
                    <div className="flex gap-1 items-center mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button type="button" key={star} onClick={() => setRating(star)} className="text-yellow-300 text-xl">
                                {rating >= star ? <BsStarFill /> : <BsStar />}
                            </button>
                        ))}
                    </div>
                    <Button title="Deixar comentário" />
                    {feedback && <MessageSuccess type={feedback.type} message={feedback.message} />}
                </form>
            </div>
        </div>
    )
}

export default Comments