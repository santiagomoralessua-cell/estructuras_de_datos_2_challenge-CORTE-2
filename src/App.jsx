import { useState, useRef } from 'react'
import Tree from 'react-d3-tree'
import { ArbolBinario } from './ArbolBinario'
import './App.css'

// Valores de ejemplo para el árbol
const VALORES_EJEMPLO = [25, 15, 50, 10, 22, 35, 70, 4, 12, 18, 24, 31, 44, 66, 90]

function App() {
  // La instancia del árbol se mantiene entre renders con useRef
  const arbol = useRef(new ArbolBinario())

  const [valorInput, setValorInput] = useState('')
  const [valorBusqueda, setValorBusqueda] = useState('')
  const [resultadoBusqueda, setResultadoBusqueda] = useState(null)

  // Estado de los recorridos para mostrar en pantalla
  const [recorridos, setRecorridos] = useState({
    inOrder: [],
    preOrder: [],
    postOrder: [],
  })

  // Estado del árbol en formato D3 para renderizar
  const [arbolD3, setArbolD3] = useState(null)

  // Actualiza los recorridos e imprime en consola
  const actualizarRecorridos = () => {
    const io = arbol.current.inOrder()
    const pre = arbol.current.preOrder()
    const post = arbol.current.postOrder()

    console.log('In-Order:', io)
    console.log('Pre-Order:', pre)
    console.log('Post-Order:', post)

    setRecorridos({ inOrder: io, preOrder: pre, postOrder: post })
    setArbolD3(arbol.current.toD3())
  }

  // Inserta el valor del input
  const handleInsertar = () => {
    const numero = parseInt(valorInput, 10)
    if (isNaN(numero)) return

    arbol.current.insertar(numero)
    actualizarRecorridos()
    setValorInput('')
    setResultadoBusqueda(null)
  }

  // Carga los valores de ejemplo en el árbol
  const handleCargarEjemplo = () => {
    arbol.current = new ArbolBinario()
    VALORES_EJEMPLO.forEach((v) => arbol.current.insertar(v))
    actualizarRecorridos()
    setResultadoBusqueda(null)
  }

  // Busca si el valor existe en el árbol
  const handleBuscar = () => {
    const numero = parseInt(valorBusqueda, 10)
    if (isNaN(numero)) return

    const encontrado = arbol.current.contiene(numero)
    setResultadoBusqueda({ valor: numero, encontrado })
  }

  return (
    <div className="contenedor">
      <h1 className="titulo">Árbol Binario de Búsqueda</h1>

      {/* Sección de inserción */}
      <div className="tarjeta">
        <h2>Insertar nodo</h2>
        <div className="fila">
          <input
            type="number"
            className="input"
            placeholder="Ingresa un número"
            value={valorInput}
            onChange={(e) => setValorInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleInsertar()}
          />
          <button className="boton" onClick={handleInsertar}>
            Insertar
          </button>
          <button className="boton boton-secundario" onClick={handleCargarEjemplo}>
            Cargar ejemplo
          </button>
        </div>
      </div>

      {/* Sección de búsqueda */}
      <div className="tarjeta">
        <h2>Buscar valor</h2>
        <div className="fila">
          <input
            type="number"
            className="input"
            placeholder="Ingresa un número"
            value={valorBusqueda}
            onChange={(e) => setValorBusqueda(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
          />
          <button className="boton" onClick={handleBuscar}>
            Buscar
          </button>
        </div>
        {resultadoBusqueda !== null && (
          <p className={`resultado ${resultadoBusqueda.encontrado ? 'encontrado' : 'no-encontrado'}`}>
            {resultadoBusqueda.encontrado
              ? `✔ El valor ${resultadoBusqueda.valor} fue encontrado en el árbol`
              : `✘ El valor ${resultadoBusqueda.valor} no está en el árbol`}
          </p>
        )}
      </div>

      {/* Sección de recorridos */}
      {recorridos.inOrder.length > 0 && (
        <div className="tarjeta">
          <h2>Recorridos</h2>
          <div className="recorridos">
            <div className="recorrido-item">
              <span className="etiqueta">In-Order</span>
              <p className="valores">{recorridos.inOrder.join(' → ')}</p>
            </div>
            <div className="recorrido-item">
              <span className="etiqueta">Pre-Order</span>
              <p className="valores">{recorridos.preOrder.join(' → ')}</p>
            </div>
            <div className="recorrido-item">
              <span className="etiqueta">Post-Order</span>
              <p className="valores">{recorridos.postOrder.join(' → ')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Visualización del árbol con react-d3-tree */}
      {arbolD3 !== null && (
        <div className="tarjeta">
          <h2>Visualización del árbol</h2>
          <div className="arbol-contenedor">
            <Tree
              data={arbolD3}
              orientation="vertical"
              translate={{ x: 300, y: 50 }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
