// ===============================
// Inicialización del buscador GLOBAL (PRO)
// ===============================

import { buscarProductos } from "./productSearch.js";
import { mapearCategoriaAPagina } from "./categoryMapper.js";
import { detectarCategoriaDesdeTexto } from "./categoryDetector.js";

// 🔧 BASE del proyecto (GitHub Pages / local)
const BASE_PATH = "/caz";

export const inicializarBusquedaGlobal = () => {
  const form = document.getElementById("searchForm");
  const input = document.getElementById("searchInput");

  if (!form || !input) return;

  // 🔒 Bloquea cualquier submit / Enter
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    ejecutarBusqueda(input.value);
  });

  // 🔒 Bloquea Enter directo en el input
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      ejecutarBusqueda(input.value);
    }
  });
};

// ===============================
// Lógica central de búsqueda
// ===============================
function ejecutarBusqueda(valor) {
  const termino = valor.trim();
  if (!termino) return;

  // 1️⃣ Buscar producto directo
  const resultados = buscarProductos(termino);

  if (resultados.length) {
    const producto = resultados[0];

    localStorage.setItem("buscarProductoId", producto.id);

    const pagina = mapearCategoriaAPagina(producto.category);
    window.location.href = `${BASE_PATH}/PRODUCTS/${pagina}`;
    return;
  }

  // 2️⃣ Detectar categoría desde texto
  const categoria = detectarCategoriaDesdeTexto(termino);
  const encoded = encodeURIComponent(termino);

  if (categoria) {
    window.location.href = `${BASE_PATH}/PRODUCTS/${mapearCategoriaAPagina(
      categoria,
    )}`;
    return;
  }

  // 3️⃣ Fallback: página de resultados
  window.location.href = `${BASE_PATH}/productos.html?fromSearch=1&q=${encoded}`;
}
