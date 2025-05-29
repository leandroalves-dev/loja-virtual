import { useState } from "react"
import { useNavigate } from "react-router-dom"
//icons
import { BsSearch } from "react-icons/bs"

const FormSearch = () => {
    const [term, setTerm] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (term.trim()) {
            navigate(`/search?q=${encodeURIComponent(term.trim())}`)
            setTerm("")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="relative">
        <div className="absolute right-3 top-3 cursor-pointer text-white/30"><BsSearch /></div>
        <input
            className="bg-neutral-950/30 border border-neutral-950/60 p-2.5 text-sm w-96 pr-10 placeholder:text-white/30 text-white/30 focus:outline-none"
            type="text"
            placeholder="pesquisar..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
        />
        </form>
    )
}

export default FormSearch
