import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
//hooks
import { useAutoClearMessage } from "../../hooks/useAutoClearMessage"
//components
import Container from "../../components/Container"
import Input from "../../components/Input"
import MessageSuccess from "../../components/MessageSuccess"
import Button from "../../components/Button"

const schema = z.object({
    email: z.string().nonempty("E-mail é obrigatório").email("E-mail inválido")
})

type FormData = z.infer<typeof schema>


const ForgotPassword = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema)})
    const { feedback, setFeedback } = useAutoClearMessage();

    const onSubmit = (data: FormData) => {
        console.log(data);
        reset()
        setFeedback({ message: "Um e-mail foi enviado para esse endereço, basta você clicar no link e recuperar sua senha.", type: 'success'});
    };

    return (
        <Container>
            <div className="mt-6 max-w-[400px] mx-auto mb-10">
                <header>
                    <h1 className="text-white text-lg">Recuperar o acesso</h1>
                </header>
                <form onSubmit={handleSubmit(onSubmit)} className="bg-neutral-950/30 border border-neutral-950/60 mt-6 p-4">
                    <Input
                        label="Esqueceu a senha?"
                        type="text"
                        placeholder="Insira o seu e-mail"
                        register={register("email")}
                        error={errors.email?.message}
                    />
                    {feedback && <MessageSuccess type={feedback.type} message={feedback.message} />}
                    <div>
                        <Button title="Recuperar" />
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default ForgotPassword