type QuantityProps = {
    quantity: number
    onIncrease: () => void
    onDecrease: () => void
}

const Quantity = ({ quantity, onIncrease, onDecrease}: QuantityProps) => {
    return (
        <div className=" mt-2 flex justify-between items-center w-20">
            <button className="bg-pink-950 text-white px-2 cursor-pointer" onClick={onDecrease}>-</button> 
            <span className="text-sm text-white">{quantity}</span>
            <button className="bg-pink-950 text-white px-2 cursor-pointer" onClick={onIncrease}>+</button>
        </div>
    )
}

export default Quantity