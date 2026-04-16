/*------------------------------------------------------------*/
//                    árbol n-ario
/*------------------------------------------------------------*/

export class Nodo {
  constructor(nombre, tipo, creadoPor) {
    this.id = Date.now().toString();
    this.nombre = nombre;
    this.tipo = tipo;
    this.creadoPor = creadoPor;
    this.hijos = [];
  }

  agregarHijo(nodo) {
    if (this.tipo === 'archivo') {
      return false;
    }
    this.hijos.push(nodo);
    return true;
  }

  eliminarHijo(id) {
    this.hijos = this.hijos.filter(hijo => hijo.id !== id);
  }
}

/*------------------------------------------------------------*/
//                    el árbol completo
/*------------------------------------------------------------*/

export class ArbolNario {
    constructor() {
    this.raiz = new Nodo("root", "carpeta", "sistema");
    }

    buscarNodo(id, nodoActual = this.raiz) {
    if (nodoActual.id === id) {
        return nodoActual;
    }

    for (let hijo of nodoActual.hijos) {
        let encontrado = this.buscarNodo(id, hijo);
        if (encontrado) return encontrado;
    }

    return null;
    }

    agregar(nombre, tipo, creadoPor, padreId = null) {
    const nuevoNodo = new Nodo(nombre, tipo, creadoPor);

    if (!padreId) {
        this.raiz.agregarHijo(nuevoNodo);
        return nuevoNodo;
    }

    const padre = this.buscarNodo(padreId);
    if (padre && padre.tipo === 'carpeta') {
        padre.agregarHijo(nuevoNodo);
        return nuevoNodo;
    }

    return null;
    }

    eliminar(id, nodoActual = this.raiz) {
    for (let i = 0; i < nodoActual.hijos.length; i++) {
        if (nodoActual.hijos[i].id === id) {
        nodoActual.hijos.splice(i, 1);
        return true;
        }
        if (this.eliminar(id, nodoActual.hijos[i])) {
        return true;
        }
    }
    return false;
    }

    aJSON(nodo = this.raiz) {
    return {
        id: nodo.id,
        nombre: nodo.nombre,
        tipo: nodo.tipo,
        creadoPor: nodo.creadoPor,
        hijos: nodo.hijos.map(hijo => this.aJSON(hijo))
    };
    }

    cargarDesdeJSON(datos, padre = null) {
    const nodo = new Nodo(datos.nombre, datos.tipo, datos.creadoPor);
    nodo.id = datos.id;
    nodo.hijos = datos.hijos ? datos.hijos.map(hijo => this.cargarDesdeJSON(hijo, nodo)) : [];
    
    if (!padre) {
        this.raiz = nodo;
    }
    
    return nodo;
    }
}