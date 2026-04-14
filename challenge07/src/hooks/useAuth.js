// Hook para manejar la autenticacion con Firebase
import { useState } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth"
import { auth } from "../firebase/config"

const useAuth = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Funcion para registrar un usuario nuevo
  const register = async (email, password) => {
    setError(null)
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  // Funcion para iniciar sesion
  const login = async (email, password) => {
    setError(null)
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  // Funcion para cerrar sesion
  const logout = async () => {
    await signOut(auth)
  }

  return { register, login, logout, error, loading }
}

export default useAuth
