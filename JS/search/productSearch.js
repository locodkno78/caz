// Lógica de búsqueda

import { obtenerProductos } from "./productStore.js";

export const buscarProductos = (termino = "") => {
  const t = termino.toLowerCase();

  return obtenerProductos().filter(
    (p) =>
      p.name?.toLowerCase().includes(t) ||
      p.category?.toLowerCase().includes(t)
  );
};
