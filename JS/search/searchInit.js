// ===============================
// Buscador global — versión ROBUSTA
// ===============================

import { buscarProductos } from "./productSearch.js";

const BASE_PATH = "/caz";

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

  // 👉 Si existe producto → mandamos su ID
  if (resultados.length) {
    const producto = resultados[0];

    window.location.href = `${BASE_PATH}/productos.html?productId=${producto.id}`;
    return;
  }

  // 👉 Si NO existe → mandamos búsqueda general
  const encoded = encodeURIComponent(termino);
  window.location.href = `${BASE_PATH}/productos.html?q=${encoded}`;
}
