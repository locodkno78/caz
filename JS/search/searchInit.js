// ===============================
// Buscador global — versión PRO REAL
// ===============================

import { buscarProductos } from "./productSearch.js";

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

  // 🔥 Detectar base path automáticamente (GitHub Pages safe)
  const basePath = window.location.pathname.includes("/caz/")
    ? "/caz"
    : "";

  // 👉 Si existe producto → ir directo al producto
  if (resultados.length) {
    const producto = resultados[0];
    window.location.href = `${basePath}/productos.html?productId=${producto.id}`;
    return;
  }

  // 👉 Si NO existe → búsqueda general
  const encoded = encodeURIComponent(termino);
  window.location.href = `${basePath}/productos.html?fromSearch=1&q=${encoded}`;
}
