//icons
import { BsTrash, BsX } from "react-icons/bs";
//components
import Button from "../Button";

interface MiniCartProps{
    setIsCartOpen: (open: boolean) => void
}

const Minicart = ({ setIsCartOpen }: MiniCartProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="flex items-center justify-between p-4">
                <h2 className="text-lg text-white">Seu Carrinho (3)</h2>
                <button className="cursor-pointer" onClick={() => setIsCartOpen(false)}><BsX size={30} color="#FFF" /></button>               
            </header>

            <div className="flex flex-col justify-between flex-1 text-sm">                
                <div className='overflow-y-auto max-h-[300px]'>
                    <div className="p-4 flex justify-between border-b-1 border-b-neutral-800/60">
                        <div className="flex gap-2">
                            <div className="bg-neutral-800 p-2 text-white w-20 flex justify-center items-center">
                                IMG
                            </div>
                            <div className="text-white">
                                <h2 className="mb-1 text-sm">Titulo do produto</h2>
                                <p className="text-[10px]">R$ 100,00</p>
                                <div className=" mt-2 flex justify-between items-center w-20">
                                    <button className="bg-pink-950 px-2 cursor-pointer">-</button> 
                                    <span className="text-sm">0</span>
                                    <button className="bg-pink-950 px-2 cursor-pointer">+</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className="cursor-pointer text-white hover:text-pink-600"><BsTrash size={14} /></button>
                        </div>
                    </div>
                    
                    <div className="p-4 flex justify-between border-b-1 border-b-neutral-800/60">
                        <div className="flex gap-2">
                            <div className="bg-neutral-800 p-2 text-white w-20 flex justify-center items-center">
                                IMG
                            </div>
                            <div className="text-white">
                                <h2 className="mb-1 text-sm">Titulo do produto</h2>
                                <p className="text-[10px]">R$ 100,00</p>
                                <div className=" mt-2 flex justify-between items-center w-20">
                                    <button className="bg-pink-950 px-2 cursor-pointer">-</button> 
                                    <span className="text-sm">0</span>
                                    <button className="bg-pink-950 px-2 cursor-pointer">+</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className="cursor-pointer text-white hover:text-pink-600"><BsTrash size={14} /></button>
                        </div>
                    </div>

                    <div className="p-4 flex justify-between">
                        <div className="flex gap-2">
                            <div className="bg-neutral-800 p-2 text-white w-20 flex justify-center items-center">
                                IMG
                            </div>
                            <div className="text-white">
                                <h2 className="mb-1 text-sm">Titulo do produto</h2>
                                <p className="text-[10px]">R$ 100,00</p>
                                <div className=" mt-2 flex justify-between items-center w-20">
                                    <button className="bg-pink-950 px-2 cursor-pointer">-</button> 
                                    <span className="text-sm">0</span>
                                    <button className="bg-pink-950 px-2 cursor-pointer">+</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className="cursor-pointer text-white hover:text-pink-600"><BsTrash size={14} /></button>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex flex-col">
                    <label className="text-white mb-1">Calcular frete:</label>
                    <div className="flex gap-2">
                        <input type="text" className="bg-neutral-950/30 border w-full border-neutral-950/60 focus:outline-none py-1 placeholder:text-white/30 px-2 text-sm text-white/30" placeholder="Digite o cep..." />
                        <button className="bg-neutral-950/30 border w-full border-neutral-950/60 py-1 px-2 text-white text-sm cursor-pointer">Calcular</button>
                    </div>
                </div>
                <div className="p-4 text-white">
                    <div className="flex justify-between items-center">
                        <span>Subtotal:</span>
                        <span className="text-sm">R$ 100,00</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Total:</span>
                        <span className="text-sm">R$ 100,00</span>
                    </div>
                </div>
            </div>
            
            <div className="flex justify-between items-center m-3 gap-2 text-white">
                <Button title="Finalizar compra" className="w-full text-sm" />
                <button className="py-2 bg-gray-800 px-2 w-full text-sm cursor-pointer rounded hover:opacity-80 transition ease-in-out delay-100">Cancelar compra</button>
            </div>
        </div>
    )
}

export default Minicart