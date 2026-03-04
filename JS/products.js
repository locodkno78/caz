import { getProduct } from "./firebase.js";

// Productos en memoria
const productos = [];

const obtenerProductoDesdeURL = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("productId");
};

// Normalizar texto para comparar categorías (quita tildes, minusculas y espacios extras)
const normalize = (str = "") =>
  str
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\w\s&-]/g, "")
    .trim()
    .toLowerCase();

// Detectar si la página es de productos: SOLO si está en la carpeta /products/
const esPaginaProductos = () => {
  const path = window.location.pathname || "";
  // Solo ejecutar si la ruta incluye /products/ (excluye index, productos.html, etc)
  return path.toLowerCase().includes("/products/");
};

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
  document.getElementById("modalDescription").textContent =
    btn.dataset.description;
  document.getElementById("modalCategory").textContent = btn.dataset.category;
  document.getElementById("modalStock").textContent = btn.dataset.stock;

  const carouselInner = document.getElementById("carouselInner");
  carouselInner.innerHTML = "";

  [btn.dataset.img, btn.dataset.img2].filter(Boolean).forEach((img, index) => {
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
  const normCategoriaPagina = normalize(categoriaActual);

  return todosLosProductos.filter((producto) => {
    const catProducto = producto.category || producto.categoryName || "";
    const normCatProducto = normalize(catProducto);
    // Coincidencia si una incluye a la otra (maneja abreviaturas y pequeñas diferencias)
    return (
      normCatProducto.includes(normCategoriaPagina) ||
      normCategoriaPagina.includes(normCatProducto)
    );
  });
};

// Si falta el contenedor o el modal en el HTML, crearlos dinámicamente
const asegurarContenedorYModal = () => {
  let container = document.getElementById("product-container");
  if (!container) {
    const h1 = document.querySelector("h1");
    container = document.createElement("div");
    container.id = "product-container";
    container.className = "container products-container";
    if (h1 && h1.parentNode) {
      h1.insertAdjacentElement("afterend", container);
    } else {
      document.body.insertBefore(container, document.body.firstChild);
    }
  }

  if (!document.getElementById("productModal")) {
    const modalHtml = `
      <div class="modal fade" id="productModal" tabindex="-1">
        <div class="modal-dialog modal-producto">
          <div class="modal-content bg-dark text-white">
            <div class="modal-header">
              <h5 class="modal-title" id="modalTitle"></h5>
              <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div id="productCarousel" class="carousel slide">
                <div class="carousel-inner" id="carouselInner"></div>
                <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon"></span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                  <span class="carousel-control-next-icon"></span>
                </button>
              </div>
              <p class="mt-3" id="modalDescription"></p>
              <p><strong>Categoría:</strong> <span id="modalCategory"></span></p>
              <p><strong>Stock:</strong> <span id="modalStock"></span></p>
            </div>
          </div>
        </div>
      </div>
    `;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = modalHtml;
    document.body.appendChild(wrapper.firstElementChild);
  }
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

  array.forEach((producto) => {
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
  const params = new URLSearchParams(window.location.search);
  const productoId =
    params.get("productId") || localStorage.getItem("buscarProductoId");
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
    const snapshot = await getProduct();

    productos.length = 0; // limpiar array

    snapshot.forEach((doc) => {
      productos.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Asegurar que el contenedor/modal existan en la página
    asegurarContenedorYModal();

    const productId = obtenerProductoDesdeURL();

    if (productId) {
      // 🔥 Caso: venimos del buscador a un producto puntual
      const producto = productos.find((p) => p.id === productId);

      if (producto) {
        cargarProductos([producto]);
      } else {
        cargarProductos(productos);
      }
    } else {
      // 📦 Caso normal: filtrar por categoría
      const productosFiltrados = filtrarProductosPorCategoria(productos);
      cargarProductos(productosFiltrados);
    }

    // ===============================
    // MENSAJE SOLO SI VIENE DEL BUSCADOR
    // ===============================
    const params = new URLSearchParams(window.location.search);
    const fromSearch = params.get("fromSearch");
    const query = params.get("q");

    if (fromSearch === "1" && query) {
      const h1 = document.querySelector("h1");

      if (h1) {
        const aviso = document.createElement("div");
        aviso.className = "alert alert-warning mt-3";
        aviso.innerHTML = `
      <strong>No encontramos resultados exactos para:</strong>
      "<em>${decodeURIComponent(query)}</em>"<br>
      Te mostramos productos similares 👇
    `;

        h1.insertAdjacentElement("afterend", aviso);
      }

      // 🔥 limpiar la URL (opcional pero PRO)
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    scrollAlProducto();

    setTimeout(() => {
      inicializarBusqueda();
    }, 1000);
  } catch (error) {
    console.error("❌ Error cargando productos:", error);
  }
};

// Solo ejecutar en páginas de productos
if (esPaginaProductos()) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializarApp);
  } else {
    setTimeout(inicializarApp, 500);
  }
}
