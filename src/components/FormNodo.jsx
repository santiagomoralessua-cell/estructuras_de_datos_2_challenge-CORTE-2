/*------------------------------------------------------------*/
//                    formulario
/*------------------------------------------------------------*/

import { useState } from "react";
import { useArbol } from "../context/ArbolContext";
import { useAuth } from "../context/AuthContext";

function FormNodo() {
    const [nombre, setNombre] = useState("");
    const [tipo, setTipo] = useState("carpeta");
    const [padreId, setPadreId] = useState("");
    const { arbol, agregarNodo } = useArbol();
    const { usuario } = useAuth();

    const obtenerCarpetas = (nodo, nivel = 0) => {
    let carpetas = [];
    if (nodo.tipo === "carpeta") {
        carpetas.push({ id: nodo.id, nombre: "-".repeat(nivel) + " " + nodo.nombre });
        for (let hijo of nodo.hijos) {
        carpetas = carpetas.concat(obtenerCarpetas(hijo, nivel + 1));
        }
    }
    return carpetas;
    };

    const carpetas = obtenerCarpetas(arbol.raiz);

    const crear = (e) => {
    e.preventDefault();
    
    if (!nombre) {
        alert("ponele un nombre");
        return;
    }

    agregarNodo(nombre, tipo, padreId || null);
    setNombre("");
    };

    if (!usuario) {
    return <p className="aviso">logueate para crear carpetas</p>;
    }

    return (
    <form className="form" onSubmit={crear}>
        <input
        type="text"
        placeholder="nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="carpeta">carpeta</option>
        <option value="archivo">archivo</option>
        </select>
        <select value={padreId} onChange={(e) => setPadreId(e.target.value)}>
        <option value="">en la raíz</option>
        {carpetas.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
        ))}
        </select>
        <button type="submit">crear</button>
    </form>
    );
}

export default FormNodo;