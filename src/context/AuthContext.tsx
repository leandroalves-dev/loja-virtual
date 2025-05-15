import { createContext, useContext, useState, useEffect } from "react";
//firebase
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
//config
import { auth } from "../config/firebaseConfig";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => void;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider  = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const dadosUser = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => dadosUser();
    }, []);


    const logout = () => {
        signOut(auth)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('UseAuth deve ser usando dentro no AuthProvider')
    }

    return context;
}