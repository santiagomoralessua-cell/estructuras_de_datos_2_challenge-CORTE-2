/*------------------------------------------------------------*/
//                    nodo
/*------------------------------------------------------------*/

import { useState } from "react";
import { useArbol } from "../context/ArbolContext";

function Nodo({ nodo }) {
    const [abierto, setAbierto] = useState(false);
    const { eliminarNodo } = useArbol();

    const esCarpeta = nodo.tipo === "carpeta";

    return (
    <div className="nodo">
        <div className="info">
        <span 
            className={esCarpeta ? "carpeta" : "archivo"}
            onClick={() => esCarpeta && setAbierto(!abierto)}
        >
            {esCarpeta ? "📁" : "📄"} {nodo.nombre}
        </span>
        <small>({nodo.creadoPor})</small>
        <button onClick={() => eliminarNodo(nodo.id)}>x</button>
        </div>

        {esCarpeta && abierto && nodo.hijos.length > 0 && (
        <div className="hijos">
            {nodo.hijos.map((hijo) => (
            <Nodo key={hijo.id} nodo={hijo} />
            ))}
        </div>
        )}
    </div>
    );
}

export default Nodo;