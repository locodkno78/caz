import "./products.js";
import { getProduct } from "../JS/firebase.js";

// ===============================
// PRODUCTOS PARA BÚSQUEDA GLOBAL
// ===============================
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
};

cargarProductosDesdeFirestore();

// ===============================
// BUSCAR PRODUCTOS
// ===============================
const buscarProductos = (termino) => {
  const terminoLower = termino.toLowerCase();

  return productosGlobales.filter(
    (producto) =>
      producto.name?.toLowerCase().includes(terminoLower) ||
      producto.category?.toLowerCase().includes(terminoLower),
  );
};

// ===============================
// MAPEO CATEGORÍA → PÁGINA
// 🔴 AGREGÁ MÁS CATEGORÍAS ACÁ
// ===============================
const mapearCategoriaAPagina = (categoria = "") => {
  const map = {
    accesorios: "accesorios.html",
    alambres: "alambres.html",
    auxiliares: "auxiliares.html",
    calefactores: "calefactores.html",
    cintas: "cintas.html",
    compresores: "compresores.html",
    consumibles: "consumibles.html",
    discos: "discos.html",
    electrodos: "electrodos.html",
    embalajes: "embalajes.html",
    equipos: "equipos.html",
    ferreteria: "ferreteria.html",
    filtros: "filtros.html",
    gases: "gases.html",
    gomeria: "gomeria.html",
    herramientas: "herramientas.html",
    hornos: "hornos.html",
    izajes: "izajes.html",
    paneles: "paneles.html",
    proteccion: "proteccion.html",
    reguladores: "reguladores.html",
    resortes: "resortes.html",
    soldadoras: "soldadoras.html",
    sopleteriaYReguladores: "sopleteria.html",
    torchasYRespuestos: "torchas.html",
    varillas: "varillas.html",
    viales: "viales.html",
  };

  return map[categoria.toLowerCase()] || "index.html";
};

// ===============================
// DETECTAR CATEGORÍA DESDE TEXTO
// ===============================
const detectarCategoriaDesdeTexto = (texto = "") => {
  const t = texto.toLowerCase();

  if (t.includes("accesorio")) return "accesorios";
  if (t.includes("alambre")) return "alambres";
  if (t.includes("auxiliar")) return "auxiliares";
  if (t.includes("calefactor")) return "calefactores";
  if (t.includes("cinta")) return "cintas";
  if (t.includes("compresor")) return "compresores";
  if (t.includes("consumible")) return "consumibles";
  if (t.includes("disco")) return "discos";
  if (t.includes("electro")) return "electrodos";
  if (t.includes("embalaje")) return "embalajes";
  if (t.includes("equipo")) return "equipos";
  if (t.includes("ferreteria") || t.includes("ferretero")) return "ferreteria";
  if (t.includes("filtro")) return "filtros";
  if (t.includes("gas")) return "gases";
  if (t.includes("gomeri")) return "gomeria";
  if (t.includes("herramienta") || t.includes("herramientas"))
    return "herramientas";
  if (t.includes("herramienta")) return "herramientas de mano";
  if (t.includes("sold")) return "soldadoras";
  if (t.includes("sople")) return "sopleteriaYReguladores";
  if (t.includes("torcha") || t.includes("respuesto"))
    return "torchasYRespuestos";
  if (t.includes("varillas")) return "varillas";
  if (t.includes("vial")) return "viales";

  return null;
};

// ===============================
// INICIALIZAR BÚSQUEDA GLOBAL
// ===============================
const inicializarBusquedaGlobal = () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  if (!searchForm || !searchInput) return;

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const termino = searchInput.value.trim();
    if (termino === "") return;

    const resultados = buscarProductos(termino);

    // ✅ PRODUCTO ENCONTRADO
    if (resultados.length > 0) {
      const producto = resultados[0];

      localStorage.setItem("buscarProductoId", producto.id);

      const pagina = mapearCategoriaAPagina(producto.category);
      window.location.href = `../PRODUCTS/${pagina}`;
    }
    // NO HAY PRODUCTO → IR A CATEGORÍA O VISTA GENERAL
    else {
      // Guardamos lo que buscó el usuario
      const encoded = encodeURIComponent(termino);

      // Intentar detectar categoría
      const categoriaDetectada = detectarCategoriaDesdeTexto(termino);

      if (categoriaDetectada) {
        // 👉 Llevar a la categoría detectada
        const pagina = mapearCategoriaAPagina(categoriaDetectada);
        window.location.href = `../PRODUCTS/${pagina}`;
      } else {
        // 👉 No coincide con nada: vista general de productos
        window.location.href = `../productos.html?fromSearch=1&q=${encoded}`;
      }
    }
  });
};

// ===============================
// ESPERAR NAVBAR
// ===============================
setTimeout(() => {
  if (document.getElementById("searchForm")) {
    inicializarBusquedaGlobal();
  }
}, 1500);

// ===============================
// COMPONENTES COMUNES
// ===============================
fetch("../navBar.html")
  .then((r) => r.text())
  .then((html) => (document.getElementById("navBar").innerHTML = html));

fetch("../whatsApp.html")
  .then((r) => r.text())
  .then((html) => (document.getElementById("whatsApp").innerHTML = html));

fetch("../footer.html")
  .then((r) => r.text())
  .then((html) => (document.getElementById("footer").innerHTML = html));
