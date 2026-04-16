/*------------------------------------------------------------*/
//                    home
/*------------------------------------------------------------*/

import { useAuth } from "../context/AuthContext";
import { useArbol } from "../context/ArbolContext";
import { Link } from "react-router-dom";
import Arbol from "../components/Arbol";
import FormNodo from "../components/FormNodo";

function Home() {
    const { usuario, logout } = useAuth();
    const { cargando } = useArbol();

    if (cargando) {
    return <p>cargando...</p>;
    }

    return (
    <div className="home">
        <div className="top">
        <h1>gestor de archivos</h1>
        {usuario ? (
            <div className="info">
            <span>{usuario.email}</span>
            <button onClick={logout}>salir</button>
            </div>
        ) : (
            <Link to="/login">iniciar sesión</Link>
        )}
        </div>

        <FormNodo />
        <Arbol />
    </div>
    );
}

export default Home;