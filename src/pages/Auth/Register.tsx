import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
//hooks
import { useAutoClearMessage } from "../../hooks/useAutoClearMessage"
//components
import MessageSuccess from "../../components/MessageSuccess"
import Container from "../../components/Container"
import Input from "../../components/Input"
import Button from "../../components/Button"

const schema = z.object({
    name: z.string().min(1, 'Preencha o campo nome'),
    email: z.string().email('E-mail invalido'),
    password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres')
})

type FormData = z.infer<typeof schema>

const Register = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema)})
    const { message: success, setMessage: setSuccess } = useAutoClearMessage()

    const onSubmit = (data: FormData) => {
        console.log(data);
        reset()
        setSuccess("Cadastro realizado com sucesso!");
    };

    return (
        <Container>
            <div className="mt-6 max-w-[400px] mx-auto mb-10">
                <header>
                    <h1 className="text-white text-lg">Preencha o formulário de cadastro</h1>
                </header>
                <form onSubmit={handleSubmit(onSubmit)} className="bg-neutral-950/30 border border-neutral-950/60 mt-6 p-4">
                    <Input
                        label="Nome"
                        type="text"
                        placeholder="Insira o seu nome"
                        register={register("name")}
                        error={errors.name?.message}
                    />
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
                        <p>Já tem conta? <Link to='/login'>clique aqui</Link></p>
                        <p><Link to='/forgot-password'>Esqueceu a senha?</Link></p>
                    </div>
                    {success && <MessageSuccess message={success} />}
                    <div>
                        <Button title="Registrar" />
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default Register