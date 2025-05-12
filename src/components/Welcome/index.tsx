import { Link } from "react-router-dom"
//icons
import { BsPersonFill, BsPersonFillLock } from "react-icons/bs"
//components
import Container from "../Container"

const index = () => {

    const user = ''
    //const user = 'Administrador'

    return (
        <Container>
            <div className="flex items-center justify-end max-md:justify-start max-md:mt-1"> 
                {user ? (
                    <ul className="flex gap-3 max-md:flex-col max-md:gap-1">
                        <li className="max-md:pr-15">Olá {user}, sejá bem vindo!</li>
                        <li className="text-white/30 max-md:hidden">|</li>
                        <li className="cursor-pointer">Sair</li>
                    </ul>
                ):(
                    <ul className="flex gap-3 max-md:flex-col max-md:gap-1">
                        <li>Olá Visitante</li>
                        <li className="text-white/30 max-md:hidden">|</li>
                        <li className="flex items-center gap-1 hover:underline cursor-pointer"><BsPersonFill /> <Link to="/login">Logar</Link></li>
                        <li className="text-white/30 max-md:hidden">|</li>
                        <li className="flex items-center gap-1 hover:underline cursor-pointer"><BsPersonFillLock /><Link to="/register">Registrar</Link></li>
                    </ul>
                )}
            </div>           
        </Container>
    )
}

export default index