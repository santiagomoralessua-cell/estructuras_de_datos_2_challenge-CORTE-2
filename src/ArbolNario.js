// Clase que representa un nodo del árbol N-ario
class Nodo {
  constructor(titulo, link, componente) {
    this.titulo = titulo;
    this.link = link;
    this.componente = componente;
    this.hijos = [];
  }
}

// Clase que representa el Árbol N-ario
class ArbolNario {
  constructor() {
    this.raiz = null;
  }

  // Agrega un nuevo nodo como hijo del nodo padre
  agregarHijo(nodoPadre, nuevoNodo) {
    nodoPadre.hijos.push(nuevoNodo);
  }

  // Recorre todo el árbol en profundidad e imprime cada nodo en consola
  recorrer() {
    if (this.raiz === null) {
      console.log('El árbol está vacío');
      return;
    }

    const recorrerRecursivo = (nodo, nivel) => {
      const indentacion = '  '.repeat(nivel);
      console.log(`${indentacion}📄 ${nodo.titulo} → ${nodo.link}`);

      // Recorrer cada hijo del nodo actual
      for (const hijo of nodo.hijos) {
        recorrerRecursivo(hijo, nivel + 1);
      }
    };

    recorrerRecursivo(this.raiz, 0);
  }

  // Busca un nodo por su título y retorna el nodo o null si no existe
  buscar(titulo) {
    if (this.raiz === null) return null;

    const buscarRecursivo = (nodo) => {
      // Comparación insensible a mayúsculas
      if (nodo.titulo.toLowerCase() === titulo.toLowerCase()) {
        return nodo;
      }

      // Buscar en cada hijo
      for (const hijo of nodo.hijos) {
        const encontrado = buscarRecursivo(hijo);
        if (encontrado !== null) return encontrado;
      }

      return null;
    };

    return buscarRecursivo(this.raiz);
  }
}

export { Nodo, ArbolNario };
