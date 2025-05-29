//icons
import { BsCreditCard2Back } from "react-icons/bs"
import { FaTruck } from "react-icons/fa"
import { FaUserGroup } from "react-icons/fa6"

const Benefits = () => {
    return (
        <div className="mt-14">
            <ul className="grid grid-cols-3 gap-3 text-white max-md:grid-cols-1">
                <li className="flex items-center gap-3 bg-pink-800 p-3 py-6 rounded max-md:justify-center">
                    <div>
                        <FaTruck size={36} />
                    </div>
                    <div className="leading-5">
                        <h2>Frete Grátis para SP e Grande SP</h2>
                        <p>Entrega em até 7 dias úteis</p>
                    </div>
                </li>

                <li className="flex items-center gap-3 bg-pink-800 p-3 py-6 rounded max-md:justify-center">
                    <div>
                        <BsCreditCard2Back size={36} />
                    </div>
                    <div className="leading-5">
                        <h2>Facilidade no pagamento</h2>
                        <p>3x sem juros no cartão de crédito</p>
                    </div>
                </li>

                <li className="flex items-center gap-3 bg-pink-800 p-3 py-6 rounded max-md:justify-center">
                    <div>
                        <FaUserGroup size={36} />
                    </div>
                    <div className="leading-5">
                        <h2>Seja um Afiliado</h2>
                        <p>Garanta uma renda extra todo mês!</p>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Benefits