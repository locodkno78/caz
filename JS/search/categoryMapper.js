// categoryMapper.js

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
  sopleteriayreguladores: "sopleteria.html",
  torchesyrepuestos: "torchas.html",
  varillas: "varillas.html",
  viales: "viales.html",
};

// 🔥 normalización REAL
export const normalizar = (str = "") =>
  str
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\w\s]/g, "")
    .trim()
    .toLowerCase();

export const mapearCategoriaAPagina = (categoria = "") => {
  const key = normalizar(categoria);
  return MAP_CATEGORIA_PAGINA[key] || null;
};
