// categoryDetector.js
// Texto → categoría NORMALIZADA (clave del mapper)

export const detectarCategoriaDesdeTexto = (texto = "") => {
  const t = texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

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
  if (t.includes("ferreteria") || t.includes("ferretero"))
    return "ferreteria";
  if (t.includes("filtro")) return "filtros";
  if (t.includes("gas")) return "gases";
  if (t.includes("gomeri")) return "gomeria";
  if (t.includes("herramienta")) return "herramientas";
  if (t.includes("horno")) return "hornos";
  if (t.includes("izaje")) return "izajes";
  if (t.includes("panel")) return "paneles";
  if (t.includes("proteccion")) return "proteccion";
  if (t.includes("regulador")) return "reguladores";
  if (t.includes("resorte")) return "resortes";
  if (t.includes("sold")) return "soldadoras";
  if (t.includes("sople"))
    return "sopleteria y reguladores";
  if (t.includes("torcha") || t.includes("repuesto"))
    return "torchas y repuestos";
  if (t.includes("varilla")) return "varillas";
  if (t.includes("vial")) return "viales";

  return null;
};
