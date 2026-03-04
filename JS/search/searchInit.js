// ===============================
// Buscador global — lógica FINAL
// ===============================

import { buscarProductos } from "./productSearch.js";
import { obtenerPaginaCategoria, normalizar } from "./categoryMapper.js";

// Detectar base path (GitHub Pages / local)
const getBasePath = () =>
  window.location.pathname.includes("/caz/") ? "/caz" : "";

export const inicializarBusquedaGlobal = () => {
  const form = document.getElementById("searchForm");
  const input = document.getElementById("searchInput");

  if (!form || !input) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    ejecutarBusqueda(input.value);
  });
};

function ejecutarBusqueda(valor) {
  const termino = valor.trim();
  if (!termino) return;

  const basePath = getBasePath();

  // ===============================
  // 1️⃣ BUSCAR PRODUCTO
  // ===============================
  const resultados = buscarProductos(termino);

  if (resultados.length) {
    const producto = resultados[0];

    const paginaCategoria = obtenerPaginaCategoria(producto.category);

    if (paginaCategoria) {
      // 👉 guardar ID para marcarlo
      localStorage.setItem("buscarProductoId", producto.id);

      window.location.href = `${basePath}/PRODUCTS/${paginaCategoria}`;
      return;
    }

    // ⚠️ Producto existe pero la categoría NO tiene HTML
    window.location.href = `${basePath}/productos.html`;
    return;
  }

  // ===============================
  // 2️⃣ NO EXISTE PRODUCTO → ¿ES CATEGORÍA?
  // ===============================
  const paginaCategoria = obtenerPaginaCategoria(termino);

  if (paginaCategoria) {
    window.location.href = `${basePath}/PRODUCTS/${paginaCategoria}`;
    return;
  }

  // ===============================
  // 3️⃣ NI PRODUCTO NI CATEGORÍA
  // ===============================
  const encoded = encodeURIComponent(termino);
  window.location.href = `${basePath}/productos.html?fromSearch=1&q=${encoded}`;
}