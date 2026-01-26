import "./products.js";
import { getProduct } from "../JS/firebase.js";
// Cargar productos para la búsqueda global
let productosGlobales = [];

const cargarProductosDesdeFirestore = async () => {
  const snapshot = await getProduct();
  productosGlobales = [];

  snapshot.forEach((doc) => {
    productosGlobales.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  console.log(
    "🔥 Productos cargados desde Firestore:",
    productosGlobales.length,
  );
};

cargarProductosDesdeFirestore();

// Mapeo de categorías
const mapaCategorias = {
  Alambres: "../PRODUCTS/alambres.html",
  Electrodos: "../PRODUCTS/electrodos.html",
  "Herramientas de Mano": "../PRODUCTS/herramientas.html",
  Soldadoras: "../PRODUCTS/soldadoras.html",
  "Sopleteria & Reguladores": "../PRODUCTS/sopleteria.html",
  "Torchas & Respuestos": "../PRODUCTS/torchas.html",
};

const obtenerUrlCategoria = (categoria) => {
  return mapaCategorias[categoria] || "../index.html";
};

// Buscar productos
const buscarProductos = (termino) => {
  const terminoLower = termino.toLowerCase();
  return productosGlobales.filter(
    (producto) =>
      producto.name.toLowerCase().includes(terminoLower) ||
      producto.category.toLowerCase().includes(terminoLower),
  );
};

// Inicializar búsqueda
const inicializarBusquedaGlobal = () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  if (!searchForm || !searchInput) {
    return;
  }

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const termino = searchInput.value.trim();

    if (termino !== "") {
      const resultados = buscarProductos(termino);

      if (resultados.length > 0) {
        const productoEncontrado = resultados[0];
        const categoria = productoEncontrado.category;
        const productoId = productoEncontrado.id;
        const url = obtenerUrlCategoria(categoria);

        // Guardar el ID del producto a encontrar
        localStorage.setItem("buscarProductoId", productoId);

        // Navegar a la URL
        window.location.href = url;
      } else {
        alert("No se encontraron productos");
      }
    }
  });
};

// Esperar a que el navBar cargue
setTimeout(() => {
  const searchForm = document.getElementById("searchForm");
  if (searchForm) {
    inicializarBusquedaGlobal();
  }
}, 1500);

fetch("../navBar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navBar").innerHTML = data;
  })
  .catch((error) => console.error("Error cargando el nav:", error));

fetch("../whatsApp.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("whatsApp").innerHTML = data;
  })
  .catch((error) => console.error("Error cargando el botón:", error));

fetch("../footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  })
  .catch((error) => console.error("Error cargando el footer:", error));

// Solo ejecutar el efecto de escritura si el h1 contiene "CAZ" (página principal)
let title = document.querySelector(".h1");
if (
  title &&
  !title.textContent.includes("Alambres") &&
  !title.textContent.includes("Electrodos") &&
  !title.textContent.includes("Herramientas de mano") &&
  !title.textContent.includes("Soldadoras") &&
  !title.textContent.includes("Sopleteria & Reguladores") &&
  !title.textContent.includes("Torchas & Respuestos")
) {
  let text = "CAZ Insumos Industriales";
  let letterStart = 0;
  let letterEnd = 1;
  let write = setInterval(() => {
    if (title) {
      title.innerHTML = text.slice(letterStart, letterEnd);
      letterEnd++;
      if (letterEnd > text.length) {
        letterEnd = 1;
      }
    }
  }, 200);
}
