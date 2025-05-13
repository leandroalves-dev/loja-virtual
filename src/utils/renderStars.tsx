import { BsStar, BsStarFill } from "react-icons/bs";

export const renderStars = (rating: number) => {
    const totalStars = 5;
    return (
        <>
            {[...Array(totalStars)].map((_, index) => (
                <span key={index} className="text-yellow-500 text-sm my-1">
                    {index < rating ? <BsStarFill /> : <BsStar />}
                </span>
            ))}
        </>
    );
};
