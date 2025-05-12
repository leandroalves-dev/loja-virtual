import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
//hoooks
import { useAutoClearMessage } from "../../hooks/useAutoClearMessage"
//components
import Container from "../../components/Container"
import Input from "../../components/Input"
import MessageSuccess from "../../components/MessageSuccess"
import Button from "../../components/Button"

const schema = z.object({
    email: z.string().email('E-mail invalido'),
    password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres')
})

type FormData = z.infer<typeof schema>

const Login = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema)})
    const { message: success, setMessage: setSuccess } = useAutoClearMessage()

    const onSubmit = (data: FormData) => {
        console.log(data);
        reset()
        setSuccess("Login realizado com sucesso!");
    };
    
    return (
        <Container>
            <div className="mt-6 max-w-[400px] mx-auto mb-10">
                <header>
                    <h1 className="text-white text-lg">Logar com os dados abaixo</h1>
                </header>
                <form onSubmit={handleSubmit(onSubmit)} className="bg-neutral-950/30 border border-neutral-950/60 mt-6 p-4">
                    <Input
                        label="E-mail"
                        type="text"
                        placeholder="Insira o seu e-mail"
                        register={register("email")}
                        error={errors.email?.message}
                    />
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="Insira sua senha"
                        register={register("password")}
                        error={errors.password?.message}
                    />
                    <div className="text-white text-[12px] flex items-center justify-between my-3">
                        <p>Não tem conta? <Link to='/register'>clique aqui</Link></p>
                        <p><Link to='/forgot-password'>Esqueceu a senha?</Link></p>
                    </div>
                    {success && <MessageSuccess message={success} />}
                    <div>
                        <Button title="Logar" />
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default Login