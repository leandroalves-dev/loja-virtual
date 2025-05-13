import { useRef } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { BsStar, BsStarFill } from "react-icons/bs"
import Input from "../Input";
import Button from "../Button";

const schema = z.object({
    name: z.string().min(1,'Preencha o campo nome'),
    message: z.string().min(1, 'Preencha o campo de mensagem')
})

type FormData = z.infer<typeof schema>

const Comments = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema)})
    const commentsRef = useRef<HTMLDivElement>(null);

    const scrollToComments = () => {
        commentsRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const onsubmit = (data: FormData) => {
        console.log(data);
    }

    return (
        <div className="mb-10">
            <div className="flex justify-between items-center">
                <h2 className="text-white text-lg flex items-center gap-1"><BsStarFill /> Avaliação dos Clientes</h2>
                <button className="bg-pink-800 py-1 px-2 text-white rounded cursor-pointer" onClick={scrollToComments}>Avaliar</button>
            </div>
            <div className="mt-6 border-b border-neutral-800 pb-8">
                <div className="flex gap-1 items-center mb-3 text-yellow-300">
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStar />
                    <BsStar />
                </div>
                <div className="flex items-start gap-2 text-white">
                    <div className="bg-blue-400 w-16 h-16 flex justify-center items-center text-3xl">R</div>
                    <div className="flex flex-col text-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <h2 className="font-bold">Ronaldo da silva</h2> 
                            <span>-</span>
                            <span className="text-neutral-500">13/05/2025 às 15:36</span>
                        </div>
                        <p>Comentário de teste 1</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 border-b border-neutral-800 pb-8">
                <div className="flex gap-1 items-center mb-3 text-yellow-300">
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStar />
                    <BsStar />
                </div>
                <div className="flex items-start gap-2 text-white">
                    <div className="bg-green-400 w-16 h-16 flex justify-center items-center text-3xl">A</div>
                    <div className="flex flex-col text-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <h2 className="font-bold">Ana Paula</h2> 
                            <span>-</span>
                            <span className="text-neutral-500">17/05/2025 às 20:16</span>
                        </div>
                        <p>Comentário de teste 2</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 border-b border-neutral-800 pb-8">
                <div className="flex gap-1 items-center mb-3 text-yellow-300">
                    <BsStarFill />
                    <BsStarFill />
                    <BsStar />
                    <BsStar />
                    <BsStar />
                </div>
                <div className="flex items-start gap-2 text-white">
                    <div className="bg-orange-400 w-16 h-16 flex justify-center items-center text-3xl">G</div>
                    <div className="flex flex-col text-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <h2 className="font-bold">Gracielle</h2> 
                            <span>-</span>
                            <span className="text-neutral-500">22/05/2025 às 12:16</span>
                        </div>
                        <p>Comentário de teste 4</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 border-b border-neutral-800 pb-8">
                <div className="flex gap-1 items-center mb-3 text-yellow-300">
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                </div>
                <div className="flex items-start gap-2 text-white">
                    <div className="bg-amber-700 w-16 h-16 flex justify-center items-center text-3xl">C</div>
                    <div className="flex flex-col text-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <h2 className="font-bold">Carina</h2> 
                            <span>-</span>
                            <span className="text-neutral-500">26/05/2025 às 09:45</span>
                        </div>
                        <p>Comentário de teste 5</p>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <div className="flex gap-1 items-center mb-3 text-yellow-300">
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStar />
                    <BsStar />
                </div>
                <div className="flex items-start gap-2 text-white">
                    <div className="bg-red-400 w-16 h-16 flex justify-center items-center text-3xl">L</div>
                    <div className="flex flex-col text-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <h2 className="font-bold">Lucio Mauro</h2> 
                            <span>-</span>
                            <span className="text-neutral-500">19/05/2025 às 11:26</span>
                        </div>
                        <p>Comentário de teste 3</p>
                    </div>
                </div>
            </div>
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
                    <div>
                        <label className="text-white mb-1 block">Mensagem</label>
                        <textarea {...register('message')} className="p-2.5 rounded text-sm placeholder:text-white/30 border border-white/10 w-full text-white focus:outline-none">
                        </textarea>
                    </div>
                    <Button title="Deixar comentário" />
                </form>
            </div>
        </div>
    )
}

export default Comments