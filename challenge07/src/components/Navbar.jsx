// Barra de navegacion con bootstrap
import { Link } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"
import useAuth from "../hooks/useAuth"

const Navbar = () => {
  const { user } = useAuthContext()
  const { logout } = useAuth()

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Mis Tareas
        </Link>

        <div>
          {user ? (
            // Si hay usuario mostramos su email y boton de salir
            <div className="d-flex align-items-center gap-3">
              <span className="text-white">{user.email}</span>
              <button
                className="btn btn-outline-light btn-sm"
                onClick={logout}
              >
                Cerrar sesion
              </button>
            </div>
          ) : (
            // Si no hay usuario mostramos links de login y registro
            <div className="d-flex gap-2">
              <Link className="btn btn-outline-light btn-sm" to="/login">
                Iniciar sesion
              </Link>
              <Link className="btn btn-light btn-sm" to="/register">
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
