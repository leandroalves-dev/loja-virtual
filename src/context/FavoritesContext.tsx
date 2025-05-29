import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useAuth } from "./AuthContext"; 

type Favorite = {
  id: number;
  title: string;
  imagem: string;
  description: string;
};

type FavoritesContextType = {
  favorites: Favorite[];
  toggleFavorite: (product: Favorite) => void;
  isFavorite: (id: number) => boolean;
  loading: boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const { user, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if (authLoading) return; // ainda carregando auth

        if (!user) {
            setFavorites([]); // limpa favoritos ao deslogar
            setLoading(false);
            return;
        }
        
        const fetchFavorites = async () => {
           
            if (!user) return;

            const docRef = doc(db, "favorites", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setFavorites(data.products || []);
            }
            setLoading(false);
        };

        fetchFavorites();
    }, [user, authLoading]);


    const toggleFavorite = async (product: Favorite) => {
    if (!user) return;

    const docRef = doc(db, "favorites", user.uid);
    const exists = favorites.some(item => item.id === product.id);

    let updatedFavorites;

    if (exists) {
        updatedFavorites = favorites.filter(item => item.id !== product.id);
    } else {
        updatedFavorites = [...favorites, product];
    }

    // Salva no estado local
    setFavorites(updatedFavorites);

    // Salva no Firestore
    await setDoc(docRef, { products: updatedFavorites }, { merge: true });
    };

    const isFavorite = (id: number) => favorites.some(item => item.id === id);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, loading }}>
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
