import { useState, useEffect } from 'react'
import arbolMenu from './data'
import './App.css'

// Componente recursivo que renderiza cada item del menú
function ItemMenu({ nodo, itemSeleccionado, onSeleccionar }) {
  const tieneHijos = nodo.hijos.length > 0;

  // Estado para saber si el submenú está abierto o cerrado
  const [abierto, setAbierto] = useState(false);

  const handleClick = () => {
    if (tieneHijos) {
      // Si tiene hijos, solo abre o cierra el submenú
      setAbierto((prev) => !prev);
    } else {
      // Si no tiene hijos, selecciona el item
      onSeleccionar(nodo);
    }
  };

  const estaSeleccionado = itemSeleccionado?.titulo === nodo.titulo &&
                           itemSeleccionado?.link === nodo.link;

  return (
    <li>
      <button
        className={`item-menu ${estaSeleccionado ? 'seleccionado' : ''} ${tieneHijos ? 'tiene-hijos' : ''}`}
        onClick={handleClick}
      >
        <span>{nodo.titulo}</span>
        {tieneHijos && (
          <span className={`flecha ${abierto ? 'abierta' : ''}`}>›</span>
        )}
      </button>

      {/* Renderiza los hijos si el submenú está abierto */}
      {tieneHijos && abierto && (
        <ul className="submenu">
          {nodo.hijos.map((hijo) => (
            <ItemMenu
              key={hijo.link}
              nodo={hijo}
              itemSeleccionado={itemSeleccionado}
              onSeleccionar={onSeleccionar}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function App() {
  // Estado del item actualmente seleccionado
  const [itemSeleccionado, setItemSeleccionado] = useState(null);

  // Al cargar la app, recorre el árbol e imprime en consola
  useEffect(() => {
    console.log('=== Recorrido del Árbol N-ario ===');
    arbolMenu.recorrer();
  }, []);

  // Los menús principales son los hijos de la raíz
  const menusPrincipales = arbolMenu.raiz.hijos;

  return (
    <div className="layout">
      {/* Sidebar izquierdo */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Menu</h2>
        </div>
        <nav>
          <ul className="lista-menu">
            {menusPrincipales.map((nodo) => (
              <ItemMenu
                key={nodo.link}
                nodo={nodo}
                itemSeleccionado={itemSeleccionado}
                onSeleccionar={setItemSeleccionado}
              />
            ))}
          </ul>
        </nav>
      </aside>

      {/* Área de contenido a la derecha */}
      <main className="contenido">
        {itemSeleccionado ? (
          <div className="tarjeta-contenido">
            <h1 className="contenido-titulo">{itemSeleccionado.titulo}</h1>
            <p className="contenido-link">
              <span className="etiqueta-link">Link:</span>
              <code>{itemSeleccionado.link}</code>
            </p>
          </div>
        ) : (
          <div className="contenido-vacio">
            <p>Selecciona un item del menú para ver su contenido</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App
