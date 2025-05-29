import { Link } from "react-router-dom";
//icons
import { BsChevronRight, BsHouseFill } from "react-icons/bs";

interface BreadcrumbItem {
    label: string;
    to?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
    return (
        <div className="flex gap-1 items-center mt-6 text-white text-sm">
            <BsHouseFill />
            <Link to='/' className="hover:underline">Home</Link>
            {items.map((item, index) => (
                <span key={index} className="flex items-center gap-1">
                    <BsChevronRight />
                    {item.to ? (
                        <Link to={item.to} className="hover:underline">{item.label}</Link>
                    ) : (
                        <span>{item.label}</span>
                    )}
                </span>
            ))}
        </div>
    );
};

export default Breadcrumbs;
