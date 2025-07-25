import { Link } from "react-router-dom"
import { useEffect } from "react"
//icons
import { BsPersonFill, BsPersonFillLock } from "react-icons/bs"
import { FiLogOut } from "react-icons/fi"
//components
import Container from "../Container"
//context
import { useAuth } from "../../context/AuthContext"

const Welcome = () => {

    const { user, userData, logout } = useAuth();
    const defaultImage = "https://i.pinimg.com/236x/a8/da/22/a8da222be70a71e7858bf752065d5cc3.jpg"; 
     
    useEffect(() => {
        console.log("Welcome: userData mudou:", userData);
    }, [userData]);
   

    return (
        <Container>
            <div className="flex items-center justify-end max-md:justify-start max-md:mt-1"> 
                {user && userData ? (
                    <ul className="flex items-center gap-3 max-md:flex-col max-md:gap-2 max-md:items-start">
                        <li className="flex gap-3 items-center">
                            <img src={userData.imagem || defaultImage} className="w-10 h-10 rounded-full object-cover" />
                            {userData.name ?? 'usuário'}, seja bem-vindo!
                        </li>
                        <li className="text-white/30 max-md:hidden">|</li>
                        <li><Link to='/edit-profile'>Perfil</Link></li>
                        <li className="text-white/30 max-md:hidden">|</li>
                        <li><Link to="/my-orders">Meus pedidos</Link></li>
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