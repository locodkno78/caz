// Categoría → página

const MAP_CATEGORIA_PAGINA = {
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

export const mapearCategoriaAPagina = (categoria = "") =>
  MAP_CATEGORIA_PAGINA[categoria.toLowerCase()] || "index.html";
