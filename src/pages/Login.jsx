/*------------------------------------------------------------*/
//                    login
/*------------------------------------------------------------*/

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [esRegistro, setEsRegistro] = useState(false);
    const [error, setError] = useState("");
    
    const { login, registro } = useAuth();
    const navigate = useNavigate();

    const enviar = async (e) => {
    e.preventDefault();
    setError("");

    try {
        if (esRegistro) {
        await registro(email, password);
        } else {
        await login(email, password);
        }
        navigate("/");
    } catch (e) {
        setError("algo salió mal, revisá los datos");
    }
    };

    return (
    <div className="login">
        <h2>{esRegistro ? "Registro" : "Login"}</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={enviar}>
        <input
            type="email"
            placeholder="correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
            {esRegistro ? "registrarme" : "entrar"}
        </button>
        </form>

        <p onClick={() => setEsRegistro(!esRegistro)} className="cambiar">
        {esRegistro ? "ya tengo cuenta" : "crear cuenta"}
        </p>
    </div>
    );
}

export default Login;