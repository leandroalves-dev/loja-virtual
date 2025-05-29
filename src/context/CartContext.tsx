import { createContext, useContext, useState, useEffect } from "react";

import type { CartItem } from "../interface";

interface CartContextType {
    cart: CartItem[]
    addToCart: (product: Omit<CartItem, 'quantity'>, quantity: number) => void
    removeFromCart: (id: number) => void
    clearCart: () => void;
    totalQuantity: number;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    totalPrice: number;
    subTotalPrice: number;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);


export const CartProvider = ({children}:{children: React.ReactNode}) => {

    const [cart, setCart] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {

        const storedCart = localStorage.getItem('cart');
        if(storedCart){
            try {
            const parsedCart: CartItem[] = JSON.parse(storedCart);
                setCart(parsedCart);
            } catch (error) {
                console.error("Erro ao ler o carrinho do localStorage:", error);
                localStorage.removeItem('cart'); 
            }
        }

    },[])

    useEffect(() => {
        console.log('Cart atualizado:', cart);
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            localStorage.removeItem('cart');
        }

    },[cart])

    const addToCart  = (product: Omit<CartItem, 'quantity'>, quantity: number) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id)
            if(existing){
                return prev.map(item => item.id === product.id ? {...item, quantity: item.quantity + quantity} : item)
            }
            return [...prev, { ...product, quantity}]
        })

        setIsCartOpen(true);
    }

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id))
    }

    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)    
    const subTotalPrice = cart.reduce((acc, item) => acc + item.price, 0);

    const increaseQuantity = (id: number) => {
        setCart(prevCart => 
            prevCart.map(item => 
                item.id === id 
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
        );
    };

    const decreaseQuantity = (id: number) => {
        setCart(prevCart => 
            prevCart.map(item => 
                item.id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
        );
    };

    const clearCart = () => setCart([]);

    return(
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalQuantity, increaseQuantity, decreaseQuantity, subTotalPrice, totalPrice, isCartOpen, setIsCartOpen }}>
            {children}
        </CartContext.Provider>
    )
}


export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};