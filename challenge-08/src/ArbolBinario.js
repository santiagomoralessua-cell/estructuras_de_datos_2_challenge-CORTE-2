// Clase que representa un nodo del árbol
class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.izquierda = null;
    this.derecha = null;
  }
}

// Clase que representa el Árbol Binario de Búsqueda
class ArbolBinario {
  constructor() {
    this.raiz = null;
  }

  // Inserta un valor siguiendo las reglas BST (sin duplicados)
  insertar(valor) {
    const nuevoNodo = new Nodo(valor);

    // Si el árbol está vacío, el nuevo nodo es la raíz
    if (this.raiz === null) {
      this.raiz = nuevoNodo;
      return;
    }

    // Función auxiliar recursiva para encontrar la posición correcta
    const insertarRecursivo = (nodoActual, nodo) => {
      // Ignorar duplicados
      if (nodo.valor === nodoActual.valor) return;

      if (nodo.valor < nodoActual.valor) {
        // El valor es menor, va al subárbol izquierdo
        if (nodoActual.izquierda === null) {
          nodoActual.izquierda = nodo;
        } else {
          insertarRecursivo(nodoActual.izquierda, nodo);
        }
      } else {
        // El valor es mayor, va al subárbol derecho
        if (nodoActual.derecha === null) {
          nodoActual.derecha = nodo;
        } else {
          insertarRecursivo(nodoActual.derecha, nodo);
        }
      }
    };

    insertarRecursivo(this.raiz, nuevoNodo);
  }

  // Recorrido In-Order: izquierda → raíz → derecha (resultado ordenado)
  inOrder() {
    const resultado = [];

    const recorrer = (nodo) => {
      if (nodo === null) return;
      recorrer(nodo.izquierda);
      resultado.push(nodo.valor);
      recorrer(nodo.derecha);
    };

    recorrer(this.raiz);
    return resultado;
  }

  // Recorrido Pre-Order: raíz → izquierda → derecha
  preOrder() {
    const resultado = [];

    const recorrer = (nodo) => {
      if (nodo === null) return;
      resultado.push(nodo.valor);
      recorrer(nodo.izquierda);
      recorrer(nodo.derecha);
    };

    recorrer(this.raiz);
    return resultado;
  }

  // Recorrido Post-Order: izquierda → derecha → raíz
  postOrder() {
    const resultado = [];

    const recorrer = (nodo) => {
      if (nodo === null) return;
      recorrer(nodo.izquierda);
      recorrer(nodo.derecha);
      resultado.push(nodo.valor);
    };

    recorrer(this.raiz);
    return resultado;
  }

  // Busca si un valor existe en el árbol
  contiene(valor) {
    const buscar = (nodo) => {
      if (nodo === null) return false;
      if (valor === nodo.valor) return true;

      // Si es menor buscamos en la izquierda, si es mayor en la derecha
      if (valor < nodo.valor) {
        return buscar(nodo.izquierda);
      } else {
        return buscar(nodo.derecha);
      }
    };

    return buscar(this.raiz);
  }

  // Convierte el árbol al formato que necesita react-d3-tree
  toD3() {
    if (this.raiz === null) return null;

    const convertir = (nodo) => {
      if (nodo === null) return null;

      const nodoD3 = { name: String(nodo.valor) };
      const hijos = [];

      if (nodo.izquierda !== null) {
        hijos.push(convertir(nodo.izquierda));
      }
      if (nodo.derecha !== null) {
        hijos.push(convertir(nodo.derecha));
      }

      // Solo agregar children si hay hijos
      if (hijos.length > 0) {
        nodoD3.children = hijos;
      }

      return nodoD3;
    };

    return convertir(this.raiz);
  }
}

export { Nodo, ArbolBinario };
