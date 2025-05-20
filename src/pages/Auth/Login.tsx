/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
//firebase
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../config/firebaseConfig"
//context
import { useAuth } from "../../context/AuthContext"
//hoooks
import { useAutoClearMessage } from "../../hooks/useAutoClearMessage"
//components
import Container from "../../components/Container"
import Input from "../../components/Input"
import MessageSuccess from "../../components/MessageSuccess"
import Button from "../../components/Button"
import Loading from "../../components/Loading"

const schema = z.object({
    email: z.string().email('E-mail invalido'),
    password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres')
})

type FormData = z.infer<typeof schema>

const Login = () => {

    const navigate = useNavigate();

    const { register, handleSubmit, setError, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema)})
    const { feedback, setFeedback } = useAutoClearMessage();
    const { setUser } = useAuth()
    const [ loading, setLoading ] = useState(false);

    const onSubmit = async(data: FormData) => {
        try {
            setLoading(true);
            
            const dadosLogin = await signInWithEmailAndPassword(auth, data.email, data.password);
            setUser(dadosLogin.user)
            reset();

            setLoading(false);
            setFeedback({ message: 'Login realizado com sucesso!', type: 'success' })
                      
            await new Promise(resolve => setTimeout(resolve, 1500));
            navigate('/')
      
        } catch (error : any) {
            console.error("Erro ao registrar:", error);
            const firebaseError = error?.code || error?.message;
            if (firebaseError === "auth/user-not-found" || firebaseError === "auth/wrong-password" || firebaseError === "auth/invalid-credential" || firebaseError === "INVALID_LOGIN_CREDENTIALS"){
                setError("password", { message: "E-mail ou senha incorretos." });
            } else {
                setError("password", { message: "Erro ao tentar logar. Tente novamente." });
            }
        }
    };
    
    return (
        <Container>
            {loading && <Loading /> }
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
                    {feedback && <MessageSuccess type={feedback.type} message={feedback.message} />}
                    <div>
                        <Button title="Logar" className="px-6" />
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default Login