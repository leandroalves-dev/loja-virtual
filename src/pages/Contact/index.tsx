import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
//firebase
import { addDoc, collection, Timestamp } from "firebase/firestore"
//config
import { db } from "../../config/firebaseConfig"
//components
import Container from "../../components/Container"
import Input from "../../components/Input"
import Button from "../../components/Button"
import MessageSuccess from "../../components/MessageSuccess"
//hooks
import { useAutoClearMessage } from "../../hooks/useAutoClearMessage"

const schema = z.object({
    name: z.string().min(1, 'Preencha o nome'),
    email: z.string().email('E-mail invalido'),
    subject: z.string().min(1, 'Preencha o Assunto'),
    message: z.string().min(1, 'Preencha o Assunto')
})

type FormData = z.infer<typeof schema>

const Contact = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema)})
    const { feedback, setFeedback } = useAutoClearMessage();

    const onSubmit = async(data: FormData) => {
        try {
            await addDoc(collection(db, "contacts"), {
                ...data,
                createdAt: Timestamp.now(),
            })
            
            reset();
            setFeedback({ message: "Formulário enviado com sucesso!", type: 'success' });
        } catch (error) {
            console.log('Erro ao registar contato', error);
        }
    }

    return (
        <Container>
            <div className="w-2xl mt-10 mx-auto max-md:w-auto">
                <h1 className="text-white text-2xl text-center">Central de Relacionamento</h1>
                <p className="text-white text-sm mb-10 text-center">Preencha o formulário abaixo com sua dúvida que nossa equipe responderá rapidamente.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Input
                            label="Nome"
                            type="text"
                            placeholder="Insira seu nome"
                            register={register('name')}
                            error={errors.name?.message}
                        />
                        <Input
                            label="E-mail"
                            type="text"
                            placeholder="Insira seu e-mail"
                            register={register('email')}
                            error={errors.email?.message}
                        />
                        <Input
                            label="Assunto"
                            type="text"
                            placeholder="Insira o assunto"
                            register={register('subject')}
                            error={errors.name?.message}
                        />
                        <div className="flex flex-col mb-4">
                            <label className="text-white">Mensagem</label>
                            <textarea {...register('message')} className="border border-white/10 p-2.5 rounded text-sm placeholder:text-white/30 text-white focus:outline-none"></textarea>
                        </div>
                        <Button title="Enviar" className="px-10" />
                        {feedback && <MessageSuccess type={feedback.type} message={feedback.message} />}
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default Contact
