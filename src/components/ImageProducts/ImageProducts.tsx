interface ImageProductsProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageProducts = ({ src, alt, className }: ImageProductsProps) => {
    return (
        <>
            <img
                src={src}
                alt={alt}
                className={`border-2 border-pink-800 p-0.5 w-full h-[273px] object-cover ${className || ''}`}
            />
        </>
    );
};

export default ImageProducts;