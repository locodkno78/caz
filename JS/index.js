import "./products.js";
import { cargarProductos } from "./search/productStore.js";
import { inicializarBusquedaGlobal } from "./search/searchInit.js";
import { cargarComponentesComunes } from "./ui/loadCommonComponents.js";

await cargarComponentesComunes();
await cargarProductos();
inicializarBusquedaGlobal();


