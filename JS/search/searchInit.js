// ===============================
// Buscador global — versión FINAL PRO
// ===============================

import { buscarProductos } from "./productSearch.js";

// 🔥 Detectar base path (GitHub Pages / local)
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

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      ejecutarBusqueda(input.value);
    }
  });
};

function ejecutarBusqueda(valor) {
  const termino = valor.trim();
  if (!termino) return;

  const resultados = buscarProductos(termino);
  const basePath = getBasePath();

  // 👉 SI EXISTE PRODUCTO
  if (resultados.length) {
    const producto = resultados[0];

    // 🔥 mapear categoría a HTML (simple y seguro)
    const categoriaSlug = producto.category
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/\s+/g, "")
      .replace(/[^\w-]/g, "");

    // 👉 guardamos ID para que products.js lo marque
    localStorage.setItem("buscarProductoId", producto.id);

    // 👉 ir a la página de la categoría
    window.location.href = `${basePath}/PRODUCTS/${categoriaSlug}.html`;
    return;
  }

  // 👉 SI NO EXISTE → productos generales
  const encoded = encodeURIComponent(termino);
  window.location.href = `${basePath}/productos.html?fromSearch=1&q=${encoded}`;
}