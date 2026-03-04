// Texto → categoría

export const detectarCategoriaDesdeTexto = (texto = "") => {
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
  if (t.includes("herramienta")) return "herramientas";
  if (t.includes("sold")) return "soldadoras";
  if (t.includes("sople")) return "sopleteriaYReguladores";
  if (t.includes("torcha") || t.includes("respuesto"))
    return "torchasYRespuestos";
  if (t.includes("varilla")) return "varillas";
  if (t.includes("vial")) return "viales";

  return null;
};
