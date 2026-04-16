/*------------------------------------------------------------*/
//                    contexto del árbol
/*------------------------------------------------------------*/

import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ArbolNario } from "../structures/ArbolNario";
import { useAuth } from "./AuthContext";

const ArbolContext = createContext();

export function useArbol() {
    return useContext(ArbolContext);
}

export function ArbolProvider({ children }) {
    const [arbol, setArbol] = useState(new ArbolNario());
    const [cargando, setCargando] = useState(true);
    const { usuario } = useAuth();

    useEffect(() => {
    cargarArbol();
    }, []);

    const cargarArbol = async () => {
    try {
        const docRef = doc(db, "arboles", "principal");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
        const nuevoArbol = new ArbolNario();
        nuevoArbol.cargarDesdeJSON(docSnap.data());
        setArbol(nuevoArbol);
        }
    } catch (error) {
        console.log("error cargando:", error);
    }
    setCargando(false);
    };

    const guardarArbol = async (arbolActualizado) => {
    try {
        const docRef = doc(db, "arboles", "principal");
        await setDoc(docRef, arbolActualizado.aJSON());
    } catch (error) {
        console.log("error guardando:", error);
    }
    };

    const agregarNodo = (nombre, tipo, padreId = null) => {
    if (!usuario) {
        alert("tenes que estar logueado");
        return;
    }

    const nuevoArbol = new ArbolNario();
    nuevoArbol.cargarDesdeJSON(arbol.aJSON());
    nuevoArbol.agregar(nombre, tipo, usuario.email, padreId);
    
    setArbol(nuevoArbol);
    guardarArbol(nuevoArbol);
    };

    const eliminarNodo = (id) => {
    if (!usuario) {
        alert("tenes que estar logueado");
        return;
    }

    const nuevoArbol = new ArbolNario();
    nuevoArbol.cargarDesdeJSON(arbol.aJSON());
    nuevoArbol.eliminar(id);
    
    setArbol(nuevoArbol);
    guardarArbol(nuevoArbol);
    };

    return (
    <ArbolContext.Provider value={{ arbol, agregarNodo, eliminarNodo, cargando }}>
        {children}
    </ArbolContext.Provider>
    );
}