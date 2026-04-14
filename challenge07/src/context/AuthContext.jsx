// Contexto para manejar el usuario logueado en toda la app
import { createContext, useContext, useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/config"

// Creamos el contexto
export const AuthContext = createContext()

// Hook para usar el contexto mas facil
export const useAuthContext = () => {
  return useContext(AuthContext)
}

// Provider que envuelve la app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    // Firebase nos avisa cuando cambia el usuario
    const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setAuthReady(true)
    })

    // Limpiamos el listener cuando el componente se desmonta
    return () => unsuscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, authReady }}>
      {authReady && children}
    </AuthContext.Provider>
  )
}
