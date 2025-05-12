import type { UseFormRegisterReturn } from "react-hook-form";

interface inputProps{
    label: string
    type: string
    placeholder: string
    className?: string
    register: UseFormRegisterReturn;
    error?: string;
}

const Input = ({ label, type, placeholder, className, register, error }: inputProps) => {
    return (
        <div className="text-white flex flex-col mb-2">
            <label className="mb-1 flex items-center gap-1">{label}</label>
            <input
                type={type} 
                placeholder={placeholder}
                className={`border ${
                error ? "border-pink-500" : "border-white/10"
                } p-2.5 rounded text-sm placeholder:text-white/30 text-white focus:outline-none ${className ?? ""}`}
                {...register}
            />
            {error && <span className="text-pink-500 text-xs mt-1">{error}</span>}
        </div>
    )
}

export default Input