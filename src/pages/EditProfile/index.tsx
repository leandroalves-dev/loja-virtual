//firebase

//components
import { useEffect, useState } from "react"
import Container from "../../components/Container"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../config/firebaseConfig"
import { useAuth } from "../../context/AuthContext"

import type { Cep } from "../../interface"
import { useForm } from "react-hook-form"
import Input from "../../components/Input"
import Button from "../../components/Button"
import Loading from "../../components/Loading"
import MessageSuccess from "../../components/MessageSuccess"
import { useAutoClearMessage } from "../../hooks/useAutoClearMessage"
import { useNavigate } from "react-router-dom"

const EditProfile = () => {

    const { user, setUserData } = useAuth()
    const { register, handleSubmit, setError, reset, watch, formState: { errors } } = useForm<Cep>();
    const [imagemUrl, setImagemUrl] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const { message: success, setMessage: setSuccess } = useAutoClearMessage()
    const navigate = useNavigate();

    const imagemWatch = watch("imagem");
    const defaultImage = "https://i.pinimg.com/236x/a8/da/22/a8da222be70a71e7858bf752065d5cc3.jpg"; 

    useEffect(() => {
        if (imagemWatch && imagemWatch.trim() !== "") {
            setImagemUrl(imagemWatch);
        } else {
            setImagemUrl(defaultImage);
        }
    }, [imagemWatch]);

    useEffect( () => {

        const fetchUser = async() => {

            if (!user) {
                setLoading(false); 
                return;
            }

            setLoading(true);

            const response = doc(db, "users", user.uid);
            const getUser = await getDoc(response)

            if(getUser.exists()){
                const data = getUser.data();

                reset({
                    imagem: data.imagem,
                    address: data.address || '',
                    cep: data.cep || '',
                    logradouro: data.logradouro || '',
                    complement: data.complemento || '',
                    cpf: data.cpf || '',
                    neighborhood: data.neighborhood || '',
                    localidade: data.localidade || '',
                    dateBirth: data.dateBirth || '',
                    email: data.email || '',
                    name: data.name || '',
                    lastname: data.lastname || '',
                    estado: data.estado || '',
                    n: data.n || '',
                    uf: data.uf || '',
                    phone: data.phone || '',
                    ref: data.ref || '',
                });

                setImagemUrl(data.imagem || defaultImage);
                setLoading(false);
            }
        }

        fetchUser();

    },[user, reset])

    useEffect(() => {
        if (user === null) {
            navigate("/");
        }
    }, [user, navigate]);


    const handleUpdate = async(data: Cep) => {

        if(!user) return

        setLoading(true)

        try {
            const userRef = doc(db, "users", user.uid);

            await updateDoc(userRef, {
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                dateBirth: data.dateBirth,
                cpf: data.cpf,
                phone: data.phone,
                cep: data.cep,
                address: data.address,
                neighborhood: data.neighborhood,
                estado: data.estado,
                localidade: data.localidade,
                n: data.n,
                complemento: data.complement,
                ref: data.ref,
                imagem: data.imagem
            });

            setUserData({
                displayName: user?.displayName || "", 
                name: data.name,
                lastname: data.lastname,
                imagem: data.imagem || ""
            });
            setSuccess("Perfil atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar:", error);
            setError('email', {message: 'Erro ao atualizar o perfil.'});
        } finally{
            setLoading(false)
        }
    }


    return (
        <Container>
            <div className="mt-6 max-w-[600px] mx-auto mb-10">
                {loading && <Loading />}
                <header>
                    <h1 className="text-white text-lg">Editar Perfil</h1>
                    <p className="text-neutral-600 text-sm">Gerencie seus dados de perfil</p>
                </header>
                
                <form className="mt-4 space-y-4" onSubmit={handleSubmit(handleUpdate)}>
                    <div className="flex justify-center mb-6">
                        <img
                            src={imagemUrl || defaultImage}
                            alt="Imagem de perfil"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                    </div>
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
                    <div className="grid grid-cols-1">
                        <Input
                            label=""
                            type="text"
                            placeholder="* E-mail"
                            register={register("email")}
                            error={errors.email?.message}
                        />
                    </div>
                    <div>
                        <Input
                            label=""
                            type="text"
                            register={register("imagem")}
                            placeholder="https://exemplo.com/imagem.jpg"
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
                    <div>
                        <Button title="Editar Perfil" />
                    </div>
                    {success && <MessageSuccess type="success" message={success} />}
                </form>
            </div>
        </Container>
    )
}

export default EditProfile