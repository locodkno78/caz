// Estado y carga de productos

import { getProduct } from "../firebase.js";

let productosGlobales = [];

export const cargarProductos = async () => {
  const snapshot = await getProduct();
  productosGlobales = [];

  snapshot.forEach((doc) => {
    productosGlobales.push({
      id: doc.id,
      ...doc.data(),
    });
  });
};

export const obtenerProductos = () => productosGlobales;
