import { getProduct } from "./firebase.js";
// Verificar si estamos en una página de productos (no es index)
const esPagenaProductos = () => {
  return (
    !document.title.includes("Home") &&
    document.querySelector("h1") &&
    (document.title.includes("Alambres") ||
      document.title.includes("Electrodos") ||
      document.title.includes("Herramientas de Mano") ||
      document.title.includes("Soldadoras") ||
      document.title.includes("Sopleteria & Reguladores") ||
      document.title.includes("Torchas & Respuestos") ||
      document.querySelector("h1").textContent.includes("Alambres") ||
      document.querySelector("h1").textContent.includes("Electrodos") ||
      document
        .querySelector("h1")
        .textContent.includes("Herramientas de Mano") ||
      document.querySelector("h1").textContent.includes("Soldadoras") ||
      document
        .querySelector("h1")
        .textContent.includes("Sopleteria & Reguladores") ||
      document.querySelector("h1").textContent.includes("Torchas & Respuestos"))
  );
};

//const URL = '../products.json'
const productos = [];

// Obtener la categoría del título de la página
const obtenerCategoriaActual = () => {
  const h1 = document.querySelector("h1");
  if (h1 && h1.textContent.trim()) {
    const text = h1.textContent.trim();
    return text;
  }
  const titulo = document.title.trim();
  return titulo;
};

// Generar HTML de la card con ID
const retornarCardHtml = (producto) => {
  return `
    <div class="card bg-dark text-white" id="producto-${producto.id}">
      <img src="${producto.img}" class="img-thumbnail w-100">
      <div class="card-name">${producto.name}</div>
      <div class="card-description">${producto.characteristics}</div>
      <div class="card-category">Categoría: ${producto.category}</div>
      <div class="card-button">
        <button 
          class="btn btn-danger btn-ver-producto"
          data-id='${producto.id}'
          data-name='${producto.name}'
          data-img='${producto.img}'
          data-img2='${producto.img2}'
          data-category='${producto.category}'
          data-description='${producto.characteristics}'
          data-stock='${producto.quantity}'
          data-bs-toggle="modal"
          data-bs-target="#productModal"
        >
          VER
        </button>
      </div>
    </div>
  `;
};
const modalExiste = () => {
  return (
    document.getElementById("productModal") &&
    document.getElementById("modalTitle") &&
    document.getElementById("carouselInner")
  );
};

document.addEventListener("click", (e) => {
  if (!modalExiste()) return;

  const btn = e.target.closest(".btn-ver-producto");
  if (!btn) return;

  document.getElementById("modalTitle").textContent = btn.dataset.name;
  document.getElementById("modalDescription").textContent = btn.dataset.description;
  document.getElementById("modalCategory").textContent = btn.dataset.category;
  document.getElementById("modalStock").textContent = btn.dataset.stock;

  const carouselInner = document.getElementById("carouselInner");
  carouselInner.innerHTML = "";

  [btn.dataset.img, btn.dataset.img2]
    .filter(Boolean)
    .forEach((img, index) => {
      carouselInner.innerHTML += `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
          <img src="${img}" class="d-block w-100">
        </div>
      `;
    });
});



// Filtrar productos por categoría
const filtrarProductosPorCategoria = (todosLosProductos) => {
  const categoriaActual = obtenerCategoriaActual();
  return todosLosProductos.filter(
    (producto) => producto.category === categoriaActual,
  );
};

const cargarProductos = (array) => {
  if (!Array.isArray(array)) return;

  const container = document.getElementById("product-container");

  if (!container) {
    console.warn("⏭ No hay contenedor de productos en esta página");
    return;
  }

  container.innerHTML = "";

  if (array.length === 0) {
    container.innerHTML = `
      <p style="grid-column: 1 / -1; text-align: center; color: #999;">
        No se encontraron productos
      </p>
    `;
    return;
  }

  array.forEach(producto => {
    const html = retornarCardHtml(producto);
    if (html) container.insertAdjacentHTML("beforeend", html);
  }); 
};

// Inicializar búsqueda - AQUÍ SOLO RECARGAMOS LA VISTA ACTUAL
const inicializarBusqueda = () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  if (!searchForm || !searchInput) {
    return;
  }

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const termino = searchInput.value.trim();

    if (termino === "") {
      const productosFiltrados = filtrarProductosPorCategoria(productos);
      cargarProductos(productosFiltrados);
    }
  });
};

// Función para hacer scroll al producto encontrado
const scrollAlProducto = () => {
  const productoId = localStorage.getItem("buscarProductoId");
  if (productoId) {
    // Esperar a que se carguen las imágenes
    setTimeout(() => {
      const elemento = document.getElementById(`producto-${productoId}`);
      if (elemento) {
        console.log("📍 Haciendo scroll al producto:", productoId);
        elemento.scrollIntoView({ behavior: "smooth", block: "center" });
        elemento.style.boxShadow = "0 0 50px 10px rgba(255, 0, 0, 0.9)";

        // Remover el highlight después de 3 segundos
        setTimeout(() => {
          elemento.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
          localStorage.removeItem("buscarProductoId");
        }, 3000);
      }
    }, 500);
  }
};

// Inicializar la app
const inicializarApp = async () => {
  try {
    const snapshot = await getProduct()

    productos.length = 0 // limpiar array

    snapshot.forEach(doc => {
      productos.push({
        id: doc.id,
        ...doc.data()
      })
    })    

    const productosFiltrados = filtrarProductosPorCategoria(productos)
    cargarProductos(productosFiltrados)

    scrollAlProducto()

    setTimeout(() => {
      inicializarBusqueda()
    }, 1000)

  } catch (error) {
    console.error('❌ Error cargando productos:', error)
  }
}

// Solo ejecutar en páginas de productos
if (esPagenaProductos()) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializarApp);
  } else {
    setTimeout(inicializarApp, 500);
  }
}
