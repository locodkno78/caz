// Inicialización del buscador

import { buscarProductos } from "./productSearch.js";
import { mapearCategoriaAPagina } from "./categoryMapper.js";
import { detectarCategoriaDesdeTexto } from "./categoryDetector.js";

export const inicializarBusquedaGlobal = () => {
  const form = document.getElementById("searchForm");
  const input = document.getElementById("searchInput");
  if (!form || !input) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const termino = input.value.trim();
    if (!termino) return;

    const resultados = buscarProductos(termino);

    if (resultados.length) {
      const producto = resultados[0];
      localStorage.setItem("buscarProductoId", producto.id);

      const pagina = mapearCategoriaAPagina(producto.category);
      location.href = `PRODUCTS/${pagina}`;
      return;
    }

    const categoria = detectarCategoriaDesdeTexto(termino);
    const encoded = encodeURIComponent(termino);

    if (categoria) {
      location.href = `PRODUCTS/${mapearCategoriaAPagina(categoria)}`;
    } else {
      location.href = `productos.html?fromSearch=1&q=${encoded}`;
    }
  });
};
