import { useState } from "react";
//components
import MessageSuccess from "../MessageSuccess";
import Button from "../Button";

const Cep = () => {
    const [cep, setCep] = useState("");
    const [prazo, setPrazo] = useState<number | null>(null);
    const [valorFrete, setValorFrete] = useState<number | null>(null);
    const [error, setError] = useState("");

    const calcularPrazoEFrete = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setPrazo(null);
        setValorFrete(null);

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                setError("CEP inválido.");
                return;
            }

            const estado = data.uf;

            const prazosPorEstado: Record<string, number> = {
                "SP": 3,
                "RJ": 4,
                "MG": 4,
                "ES": 5,
                "PR": 5,
                "SC": 5,
                "RS": 5,
                "BA": 6,
                "PE": 7,
                "CE": 7,
                "AM": 10,
                "PA": 10,
                "MA": 8,
                "default": 12,
            };

            const valoresPorEstado: Record<string, number> = {
                "SP": 14.90,
                "RJ": 16.90,
                "MG": 16.90,
                "ES": 17.90,
                "PR": 17.90,
                "SC": 17.90,
                "RS": 17.90,
                "BA": 19.90,
                "PE": 21.90,
                "CE": 21.90,
                "AM": 25.90,
                "PA": 25.90,
                "MA": 22.90,
                "default": 27.90,
            };

            setPrazo(prazosPorEstado[estado] || prazosPorEstado["default"]);
            setValorFrete(valoresPorEstado[estado] || valoresPorEstado["default"]);

        } catch (error) {
            setError("Erro ao buscar o CEP.");
            console.log('Erro ao buscar o cep', error)
        }
    };

    return (
        <div className="flex flex-col bg-neutral-950/20 p-4 mb-6">
            <form onSubmit={calcularPrazoEFrete}>
                <label className="text-white mb-1">Calcular frete:</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        className="bg-neutral-950/30 border w-full border-neutral-950/60 focus:outline-none py-1 placeholder:text-white/30 px-2 text-sm text-white/30"
                        placeholder="Digite o cep..."
                    />
                    <Button title="Calcular" />
                </div>
            </form>

            {prazo !== null && valorFrete !== null && (
                <p className="text-green-300 mt-2 text-sm">Entrega estimada: {prazo} dias úteis — Frete: R$ {valorFrete.toFixed(2)}</p>
            )}

            {error && <MessageSuccess type="error" message={error} /> }
        </div>
    );
};

export default Cep;
