/*------------------------------------------------------------*/
//                    árbol
/*------------------------------------------------------------*/

import { useArbol } from "../context/ArbolContext";
import Nodo from "./Nodo";

function Arbol() {
    const { arbol } = useArbol();

    return (
    <div className="arbol">
        <h3>mis archivos</h3>
        <div className="contenido">
        {arbol.raiz.hijos.length === 0 ? (
            <p>no hay nada todavía</p>
        ) : (
            arbol.raiz.hijos.map((nodo) => (
            <Nodo key={nodo.id} nodo={nodo} />
            ))
        )}
        </div>
    </div>
    );
}

export default Arbol;