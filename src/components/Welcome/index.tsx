import { Link } from "react-router-dom"
//icons
import { BsPersonFill, BsPersonFillLock } from "react-icons/bs"
//components
import Container from "../Container"
import { useAuth } from "../../context/AuthContext"
import { FiLogOut } from "react-icons/fi"

const Welcome = () => {

    const { user, loading, logout  } = useAuth();

    if (loading) return null;

    return (
        <Container>
            <div className="flex items-center justify-end max-md:justify-start max-md:mt-1"> 
                {user ? (
                    <ul className="flex items-center gap-3 max-md:flex-col max-md:gap-1">
                        <li className="max-md:pr-15">Olá {user?.displayName ?? 'usuário'}, seja bem-vindo!</li>
                        <li className="text-white/30 max-md:hidden">|</li>
                        <li className="cursor-pointer" onClick={logout}><FiLogOut /></li>
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

export default Welcome