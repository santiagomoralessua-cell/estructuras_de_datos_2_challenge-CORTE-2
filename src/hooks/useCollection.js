// Hook para hacer el CRUD en Firestore
import { useState } from "react"
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore"
import { db } from "../firebase/config"

const useCollection = (collectionName) => {
  const [error, setError] = useState(null)

  // Traer todos los documentos de un usuario
  const getAll = async (uid) => {
    setError(null)
    try {
      const q = query(
        collection(db, collectionName),
        where("uid", "==", uid)
      )
      const snapshot = await getDocs(q)
      // Mapeamos para incluir el id de firestore
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      return docs
    } catch (err) {
      setError(err.message)
      return []
    }
  }

  // Agregar un documento nuevo
  const add = async (data) => {
    setError(null)
    try {
      const ref = await addDoc(collection(db, collectionName), data)
      return ref.id
    } catch (err) {
      setError(err.message)
    }
  }

  // Actualizar un documento existente
  const update = async (id, data) => {
    setError(null)
    try {
      const ref = doc(db, collectionName, id)
      await updateDoc(ref, data)
    } catch (err) {
      setError(err.message)
    }
  }

  // Eliminar un documento
  const remove = async (id) => {
    setError(null)
    try {
      const ref = doc(db, collectionName, id)
      await deleteDoc(ref)
    } catch (err) {
      setError(err.message)
    }
  }

  return { getAll, add, update, remove, error }
}

export default useCollection
