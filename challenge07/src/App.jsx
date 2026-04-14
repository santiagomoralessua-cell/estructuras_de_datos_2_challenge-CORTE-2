// Componente principal con las rutas
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { TaskProvider } from "./context/TaskContext"
import { useAuthContext } from "./context/AuthContext"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"

// Componente para proteger rutas privadas
const RutaPrivada = ({ children }) => {
  const { user } = useAuthContext()
  // Si no hay usuario lo mandamos al login
  return user ? children : <Navigate to="/login" />
}

// Componente para rutas publicas (si ya esta logueado lo mandamos al home)
const RutaPublica = ({ children }) => {
  const { user } = useAuthContext()
  return !user ? children : <Navigate to="/" />
}

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <Navbar />
          <Routes>
            {/* Ruta privada - solo si esta logueado */}
            <Route
              path="/"
              element={
                <RutaPrivada>
                  <Home />
                </RutaPrivada>
              }
            />
            {/* Rutas publicas - solo si NO esta logueado */}
            <Route
              path="/login"
              element={
                <RutaPublica>
                  <Login />
                </RutaPublica>
              }
            />
            <Route
              path="/register"
              element={
                <RutaPublica>
                  <Register />
                </RutaPublica>
              }
            />
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
