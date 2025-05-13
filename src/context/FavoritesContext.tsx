// src/context/FavoritesContext.tsx
import { createContext, useContext, useState } from "react";

type Favorite = {
    description: React.ReactNode;
    id: number;
    title: string;
    imagem: string;
};

type FavoritesContextType = {
    favorites: Favorite[];
    toggleFavorite: (product: Favorite) => void;
    isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);

    const toggleFavorite = (product: Favorite) => {
        setFavorites(prev => {
        const exists = prev.some(item => item.id === product.id);
        return exists
            ? prev.filter(item => item.id !== product.id)
            : [...prev, product];
        });
    };

    const isFavorite = (id: number) => {
        return favorites.some(item => item.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
        {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites precisa estar dentro de <FavoritesProvider>");
    }
    return context;
};
