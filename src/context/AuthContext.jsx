/*------------------------------------------------------------*/
//                    contexto del auth
/*------------------------------------------------------------*/

import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged 
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
        setUsuario(user);
        setCargando(false);
    });
    return unsub;
    }, []);

    const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
    };

    const registro = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
    return signOut(auth);
    };

    return (
    <AuthContext.Provider value={{ usuario, login, registro, logout }}>
        {!cargando && children}
    </AuthContext.Provider>
    );
}