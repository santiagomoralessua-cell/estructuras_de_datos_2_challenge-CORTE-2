import { Nodo, ArbolNario } from './ArbolNario';

// Función que construye y retorna el árbol N-ario con los menús de navegación
const crearArbol = () => {
  const arbol = new ArbolNario();

  // Nodo raíz que agrupa todos los menús
  const raiz = new Nodo('Menu', '/', null);
  arbol.raiz = raiz;

  // Nodos principales del menú
  const perfil = new Nodo('Profile', '/profile', null);
  const mensajes = new Nodo('Messages', '/messages', null);
  const configuracion = new Nodo('Settings', '/settings', null);
  const ayuda = new Nodo('Help', '/help', null);
  const cerrarSesion = new Nodo('Logout', '/logout', null);

  // Hijos de Settings
  const cuenta = new Nodo('Account', '/settings/account', null);
  const perfilConfig = new Nodo('Profile', '/settings/profile', null);
  const seguridad = new Nodo('Security & Privacy', '/settings/security', null);
  const contrasena = new Nodo('Password', '/settings/password', null);
  const notificacion = new Nodo('Notification', '/settings/notification', null);

  // Hijos de Help
  const faqs = new Nodo("FAQ's", '/help/faqs', null);
  const ticket = new Nodo('Submit a Ticket', '/help/ticket', null);
  const redEstado = new Nodo('Network Status', '/help/network', null);

  // Agregar hijos a Settings
  arbol.agregarHijo(configuracion, cuenta);
  arbol.agregarHijo(configuracion, perfilConfig);
  arbol.agregarHijo(configuracion, seguridad);
  arbol.agregarHijo(configuracion, contrasena);
  arbol.agregarHijo(configuracion, notificacion);

  // Agregar hijos a Help
  arbol.agregarHijo(ayuda, faqs);
  arbol.agregarHijo(ayuda, ticket);
  arbol.agregarHijo(ayuda, redEstado);

  // Agregar nodos principales a la raíz
  arbol.agregarHijo(raiz, perfil);
  arbol.agregarHijo(raiz, mensajes);
  arbol.agregarHijo(raiz, configuracion);
  arbol.agregarHijo(raiz, ayuda);
  arbol.agregarHijo(raiz, cerrarSesion);

  return arbol;
};

// Exportar la instancia del árbol ya construido
const arbolMenu = crearArbol();

export default arbolMenu;
