// Contexto para manejar las tareas en toda la app
import { createContext, useContext, useState, useEffect } from "react"
import { useAuthContext } from "./AuthContext"
import useCollection from "../hooks/useCollection"

export const TaskContext = createContext()

export const useTaskContext = () => {
  return useContext(TaskContext)
}

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const { user } = useAuthContext()

  // Usamos el hook de coleccion para la coleccion "tareas"
  const { getAll, add, update, remove } = useCollection("tareas")

  // Cargamos las tareas cuando hay un usuario logueado
  useEffect(() => {
    if (user) {
      cargarTareas()
    } else {
      setTasks([])
    }
  }, [user])

  const cargarTareas = async () => {
    const data = await getAll(user.uid)
    setTasks(data)
  }

  // Agregar tarea nueva
  const agregarTarea = async (titulo) => {
    const nuevaTarea = {
      titulo,
      completada: false,
      uid: user.uid,
      fecha: new Date().toLocaleDateString()
    }
    const id = await add(nuevaTarea)
    setTasks([...tasks, { id, ...nuevaTarea }])
  }

  // Editar el titulo de una tarea
  const editarTarea = async (id, nuevoTitulo) => {
    await update(id, { titulo: nuevoTitulo })
    setTasks(tasks.map((t) => (t.id === id ? { ...t, titulo: nuevoTitulo } : t)))
  }

  // Eliminar tarea
  const eliminarTarea = async (id) => {
    await remove(id)
    setTasks(tasks.filter((t) => t.id !== id))
  }

  // Marcar como completada o no
  const toggleCompletada = async (id, completada) => {
    await update(id, { completada: !completada })
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completada: !completada } : t))
    )
  }

  return (
    <TaskContext.Provider
      value={{ tasks, agregarTarea, editarTarea, eliminarTarea, toggleCompletada }}
    >
      {children}
    </TaskContext.Provider>
  )
}
