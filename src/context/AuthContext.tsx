import { createContext, useContext, useState, useEffect } from "react";
//firebase
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
//config
import { auth, db } from "../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
interface UserData {
    displayName?: string;
    name: string;
    lastname: string;
    imagem?: string;
}
interface AuthContextType {
    user: User | null;
    userData: UserData | null;
    setUserData: (data: UserData | null) => void;
    loading: boolean;
    logout: () => void; 
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider  = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null)
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const dadosUser = onAuthStateChanged(auth, async (currentUser) => {
            
            setUser(currentUser);

            if (currentUser) {
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                if (userDoc.exists()) {
                    setUserData(userDoc.data() as UserData);
                }
            } else {
                setUserData(null);
            }
        
            setLoading(false);
        });

        return () => dadosUser();
    }, []);


    const logout = () => {
        signOut(auth)
        setUser(null)
        setUserData(null);
    }

    return (
        <AuthContext.Provider value={{ user, userData, setUserData, loading, logout, setUser  }}>
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