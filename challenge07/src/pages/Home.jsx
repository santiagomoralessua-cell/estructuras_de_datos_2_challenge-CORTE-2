// Pagina principal con el listado de tareas
import { useState } from "react"
import { useTaskContext } from "../context/TaskContext"

const Home = () => {
  const { tasks, agregarTarea, editarTarea, eliminarTarea, toggleCompletada } =
    useTaskContext()

  const [nuevaTarea, setNuevaTarea] = useState("")
  const [editandoId, setEditandoId] = useState(null)
  const [textoEditado, setTextoEditado] = useState("")

  // Agregar tarea con el formulario
  const handleAgregar = (e) => {
    e.preventDefault()
    if (nuevaTarea.trim() === "") return
    agregarTarea(nuevaTarea)
    setNuevaTarea("")
  }

  // Empezar a editar una tarea
  const handleEditarClick = (tarea) => {
    setEditandoId(tarea.id)
    setTextoEditado(tarea.titulo)
  }

  // Guardar la edicion
  const handleGuardarEdicion = (id) => {
    if (textoEditado.trim() === "") return
    editarTarea(id, textoEditado)
    setEditandoId(null)
    setTextoEditado("")
  }

  // Cancelar edicion sin guardar
  const handleCancelarEdicion = () => {
    setEditandoId(null)
    setTextoEditado("")
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Mis tareas</h2>

      {/* Formulario para agregar tarea */}
      <form onSubmit={handleAgregar} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Escribi una nueva tarea..."
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Agregar
          </button>
        </div>
      </form>

      {/* Si no hay tareas mostramos un mensaje */}
      {tasks.length === 0 && (
        <p className="text-muted text-center">No hay tareas todavia</p>
      )}

      {/* Lista de tareas */}
      <ul className="list-group">
        {tasks.map((tarea) => (
          <li
            key={tarea.id}
            className={`list-group-item d-flex align-items-center gap-2 ${
              tarea.completada ? "tarea-completada" : ""
            }`}
          >
            {/* Checkbox para marcar completada */}
            <input
              type="checkbox"
              className="form-check-input"
              checked={tarea.completada}
              onChange={() => toggleCompletada(tarea.id, tarea.completada)}
            />

            {/* Si estamos editando esta tarea mostramos el input */}
            {editandoId === tarea.id ? (
              <div className="d-flex flex-grow-1 gap-2">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={textoEditado}
                  onChange={(e) => setTextoEditado(e.target.value)}
                />
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleGuardarEdicion(tarea.id)}
                >
                  Guardar
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={handleCancelarEdicion}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              // Si no estamos editando mostramos el titulo normal
              <div className="d-flex flex-grow-1 justify-content-between align-items-center">
                <span className={tarea.completada ? "text-decoration-line-through text-muted" : ""}>
                  {tarea.titulo}
                </span>
                <div className="d-flex gap-2">
                  <small className="text-muted me-2">{tarea.fecha}</small>
                  <button
                    className="btn btn-outline-warning btn-sm"
                    onClick={() => handleEditarClick(tarea)}
                    disabled={tarea.completada}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => eliminarTarea(tarea.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Resumen de cuantas tareas hay */}
      {tasks.length > 0 && (
        <p className="text-muted mt-3">
          {tasks.filter((t) => t.completada).length} de {tasks.length} tareas completadas
        </p>
      )}
    </div>
  )
}

export default Home
