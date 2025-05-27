import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
//icons
import { BsFacebook, BsInstagram, BsX, BsYoutube } from "react-icons/bs"
//components
import Container from "../Container"
import MessageSuccess from "../MessageSuccess"
import Button from "../Button"
//hooks
import { useAutoClearMessage } from "../../hooks/useAutoClearMessage"

const schema = z.object({
    email: z.string().email('E-mail inválido')
})

type FormData = z.infer<typeof schema>

const Footer = () => {

    const { register, handleSubmit, reset } = useForm<FormData>({ resolver: zodResolver(schema)})
    const { feedback, setFeedback } = useAutoClearMessage();

    const onSubmit = (data: FormData) => {
        console.log(data);
        try {
            reset();
            setFeedback({ message: 'Cadastro da newsletter realizado com sucesso!', type: 'success' })
        
        } catch (error) {
            console.error("Erro ao registrar:", error);
        }
    }

    return (
        <footer className="bg-pink-900">
            <Container>
                <div className="grid grid-cols-4 py-10 max-md:grid-cols-1 max-md:gap-5 max-md:text-center">
                    <div className="max-md:mx-auto">
                        <img src="/logo.png" alt="ShopSimples" className="w-48 opacity-50" />
                    </div>
                    <div>
                        <h2 className="text-xl text-white mb-3">Insitucional</h2>
                        <ul className="space-y-1 text-sm text-white/50">
                            <li><a href="#" className="hover:underline">Sobre Nós</a></li>
                            <li><a href="#" className="hover:underline">Nossa História</a></li>
                            <li><a href="#" className="hover:underline">Sustentabilidade</a></li>
                            <li><a href="#" className="hover:underline">Trabalhe Conosco</a></li>
                            <li><a href="#" className="hover:underline">Blog</a></li>
                            <li><a href="#" className="hover:underline">Política de Privacidade</a></li>
                            <li><a href="#" className="hover:underline">Termos de Uso</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl text-white mb-3">Central de Atendimento</h2>
                        <ul className="space-y-1 text-sm text-white/50">
                            <li><a href="#" className="hover:underline">Fale Conosco</a></li>
                            <li><a href="#" className="hover:underline">Dúvidas Frequentes (FAQ)</a></li>
                            <li><a href="#" className="hover:underline">Rastreamento de Pedido</a></li>
                            <li><a href="#" className="hover:underline">Trocas e Devoluções</a></li>
                            <li><a href="#" className="hover:underline">Política de Entrega</a></li>
                            <li><a href="#" className="hover:underline">Formas de Pagamento</a></li>
                            <li><a href="#" className="hover:underline">Atendimento via WhatsApp</a></li>
                        </ul>
                    </div>
                    <div className="flex-col justify-between">
                        <div className="mb-6">
                            <h2 className="text-xl text-white mb-3">Newsletter</h2>
                            <label className="text-white/50 mb-1 block text-sm">Fique por dentro das novidades</label>
                            <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col max-md:w-72 max-md:mx-auto">
                                <input {...register("email")} type="text" placeholder="Insira seu e-mail" className="p-2.5 border border-white/10 rounded text-sm placeholder:text-white/30 text-white focus:outline-none" />
                                <Button title="Cadastrar" className="bg-white/10 mt-2" />   
                                {feedback && <MessageSuccess type={feedback.type} message={feedback.message} />}
                            </form>
                        </div>
                        <div>
                            <h2 className="text-xl text-white mb-3">Segurança</h2>
                            <ul className="flex gap-4 max-md:justify-center">
                                <li><img src="./selo_seguranca_1.png" /></li>
                                <li><img src="./selo_seguranca_1.webp" /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
            <div className="bg-neutral-900 py-12">
                <Container>
                    <div className="flex justify-between max-md:flex-col max-md:gap-5">
                        <div>
                            <h2 className="text-xl text-white max-md:text-center">Forma de Pagamento</h2>
                            <ul className="flex flex-wrap gap-1 mt-3 max-md:justify-center">
                                <li className="bg-pink-900 text-white/50 py-1.5 px-3 text-[12px]">Visa</li>
                                <li className="bg-pink-900 text-white/50 py-1.5 px-3 text-[12px]">MasterCard</li>
                                <li className="bg-pink-900 text-white/50 py-1.5 px-3 text-[12px]">Elo</li>
                                <li className="bg-pink-900 text-white/50 py-1.5 px-3 text-[12px]">Alelo</li>
                                <li className="bg-pink-900 text-white/50 py-1.5 px-3 text-[12px]">America Express</li>
                                <li className="bg-pink-900 text-white/50 py-1.5 px-3 text-[12px]">Hipercard</li>
                                <li className="bg-pink-900 text-white/50 py-1.5 px-3 text-[12px]">Diners Club Internacional</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-xl text-white max-md:text-center">Siga-nos</h2>
                            <ul className="flex gap-4 text-white mt-3 max-md:justify-center">
                                <li className="text-2xl hover:text-pink-800 transition ease-in-out delay-100"><BsFacebook /></li>
                                <li className="text-2xl hover:text-pink-800 transition ease-in-out delay-100"><BsInstagram /></li>
                                <li className="text-2xl hover:text-pink-800 transition ease-in-out delay-100"><BsYoutube /></li>
                                <li className="text-2xl hover:text-pink-800 transition ease-in-out delay-100"><BsX /></li>
                            </ul>
                        </div>    
                    </div>    
                </Container> 
            </div>
            <address className="text-center py-8">
                <span className="text-white text-sm">&copy; Copyright 2025 - Todos os direitos reservados</span>
            </address>
        </footer>
    )
}

export default Footer
