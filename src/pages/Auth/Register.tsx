/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
//hooks
import { useAutoClearMessage } from "../../hooks/useAutoClearMessage"
//components
import MessageSuccess from "../../components/MessageSuccess"
import Container from "../../components/Container"
import Input from "../../components/Input"
import Button from "../../components/Button";
//firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, db } from "../../config/firebaseConfig"
import { doc, setDoc } from "firebase/firestore"
import { useState } from "react"
import Loading from "../../components/Loading"
import { useAuth } from "../../context/AuthContext"

const schema = z.object({
    name: z.string().min(1, 'Preencha o nome'),
    lastname: z.string().min(1, 'Preencha o sobrenome'),
    dateBirth: z.string().min(1, 'Preencha a data de nascimento'),
    cpf: z.string().min(1, 'Preencha o CPF'),
    email: z.string().email('E-mail inválido'),
    cep: z.string().min(9, 'CEP inválido'),
    phone: z.string().min(14, 'Telefone inválido'),
    address: z.string().min(1, 'Endereço obrigatório'),
    neighborhood: z.string().min(1, 'Bairro obrigatório'),
    localidade: z.string().min(1, 'Cidade obrigatório'),
    estado: z.string().min(1, 'Estado obrigatório'),
    n: z.string().min(1, 'Número obrigatório'),
    complement: z.string().optional(),
    ref: z.string().optional(),
    password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres')
})

type FormData = z.infer<typeof schema>

const Register = () => {
    
    const navigate = useNavigate();
    const { register, handleSubmit, setError, setValue, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema)})
    const { message: success, setMessage: setSuccess } = useAutoClearMessage()
    const [ loading, setLoading ] = useState(false);

    const { setUser } = useAuth(); 
    
    const onSubmit = async (data: FormData) => {
        
        try {
            
            setLoading(true);
            
            // 1. Criar o usuário no Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            
            await updateProfile(user, {
                displayName: data.name,
            });
            
            await user.reload(); // atualiza o usuário com o novo nome
            
            // Isso força nova referência para que o React atualize
            setUser({ ...auth.currentUser! });
            
            console.log('Nome atualizado:', auth.currentUser?.displayName);
            
            // 3. Salvar dados adicionais no Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: data.name,
                lastname: data.lastname,
                dateBirth: data.dateBirth,
                cpf: data.cpf,
                email: data.email,
                phone: data.phone,
                cep: data.cep,
                address: data.address,
                neighborhood: data.neighborhood,
                estado: data.estado,
                localidade: data.localidade,
                n: data.n,
                complement: data.complement || '',
                ref: data.ref || '',
                createdAt: new Date(),
                role: 'user', 
            });
            
            
            reset();
            setLoading(false);
            setSuccess("Usuário registrado com sucesso!");
            
            await new Promise(resolve => setTimeout(resolve, 1500));
            navigate("/");

        } catch (error: any) {
            console.error("Erro ao registrar:", error);
            if (error.code === "auth/email-already-in-use") {
                setError("email", { message: "E-mail já está em uso" });
            } else {
                alert("Erro ao registrar. Tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    };


    const getAddress = async (cep: string) => {
        const cepLimpo = cep.replace(/\D/g, "");
        if (cepLimpo.length !== 8) return;

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            const data = await response.json();

            if (data.erro) {
                setError("cep", {message: "CEP inválido" });
                return;
            }
            console.log('dados do enredeço', data)
            
            setValue("address", `${data.logradouro}`);
            setValue("neighborhood", `${data.bairro}`);
            setValue("estado", data.estado);
            setValue("localidade", `${data.localidade}`);
            
        } catch (error) {
            console.log("Erro ao buscar o endereço:", error);
        }
    };

    return (
        <Container>
            <div className="mt-6 mx-auto mb-10">
                {loading && <Loading />}
                <header>
                    <h1 className="text-white text-lg">Complete seu cadastro para continuar</h1>
                    <p className="text-neutral-600 text-sm">Preencha as informações abaixo com atenção. Elas são essenciais para processarmos seu pedido com segurança.</p>
                </header>
                
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
                                    error={errors.name?.message}
                                />
                                <Input
                                    label=""
                                    type="text"
                                    placeholder="* Sobrenome"
                                    register={register("lastname")}
                                    error={errors.lastname?.message}
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <Input
                                    label=""
                                    type="text"
                                    placeholder="* xx/xx/xxxx - data nascimento"
                                    register={register("dateBirth")}
                                    error={errors.dateBirth?.message}
                                />
                                <Input
                                    label=""
                                    type="text"
                                    placeholder="* CPF"
                                    register={register("cpf")}
                                    error={errors.cpf?.message}
                                />
                                <Input
                                    label=""
                                    type="text"
                                    placeholder="* (xx) xxxxxxxxx - telefone"
                                    register={register("phone")}
                                    error={errors.phone?.message}
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <Input
                                    label=""
                                    type="text"
                                    placeholder="* xxxxx-xxx - cep"
                                    register={register("cep")}
                                    error={errors.cep?.message}
                                    onBlur={(e) => getAddress(e.target.value)}
                                />
                                <Input
                                    label=""
                                    type="text"
                                    placeholder="* Endereço"
                                    register={register("address")}
                                    error={errors.address?.message}
                                /> 
                                <Input
                                    label=""
                                    type="text"
                                    placeholder="* Bairro"
                                    register={register("neighborhood")}
                                    error={errors.neighborhood?.message}
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2">
                                <Input
                                    label=""
                                    type="text"
                                    placeholder="* Estado"
                                    register={register("estado")}
                                    error={errors.estado?.message}
                                />
                                <Input
                                    label=""
                                    type="text"
                                    placeholder="* Cidade"
                                    register={register("localidade")}
                                    error={errors.localidade?.message}
                                />
                                <Input
                                    label=""
                                    type="text"
                                    placeholder="* Numero"
                                    register={register("n")}
                                    error={errors.n?.message}
                                />
                                <Input
                                    label=""
                                    type="text"
                                    placeholder="Complemento"
                                    register={register("complement")}
                                    error={errors.complement?.message}
                                />
                            </div>
                            <div className="grid grid-cols-1">
                                <Input
                                    label=""
                                    type="text"
                                    placeholder="Ponto de referência (opcional)"
                                    register={register("ref")}
                                    error={errors.ref?.message}
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
                                    error={errors.email?.message}
                                />
                            </div>
                            <div className="grid grid-cols-1">
                                <Input
                                    label=""
                                    type="password"
                                    placeholder="* Senha"
                                    register={register("password")}
                                    error={errors.password?.message}
                                />
                            </div>

                            <div className="text-white text-[12px] flex items-center justify-between my-3">
                                <p>Já tem conta? <Link to='/login'>clique aqui</Link></p>
                                <p><Link to='/forgot-password'>Esqueceu a senha?</Link></p>
                            </div>
                            {success && <MessageSuccess message={success} />}
                            <div>
                                <Button title="Registrar" />
                            </div>
                        </div>
                    </div>
                </form>
                
            </div>
        </Container>
    )
}

export default Register

