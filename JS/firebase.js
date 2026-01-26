import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA9c3gBAo_ENpxC-reRiebauJXivjhP8D8",
  authDomain: "base-de-datos-4c1cd.firebaseapp.com",
  projectId: "base-de-datos-4c1cd",
  storageBucket: "base-de-datos-4c1cd.appspot.com",
  messagingSenderId: "452851254594",
  appId: "1:452851254594:web:fda7e2f51a253e651134db"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const getPedidos = async () => {  
  const querySnapshot = await getDocs(collection(db, 'order'));  
  return querySnapshot;
};

export const getCompra = async ( nombre, precio, talle, cantidad, total) => {  
  const querySnapshot = await getDocs(collection(db, 'pedidos'), {nombre, precio, talle, cantidad, total});  
  return querySnapshot;
};

export const deleteProducto = async (productoId) => {
  try {
    const productoRef = doc(db, 'order', productoId);
    await deleteDoc(productoRef);
    console.log("Producto eliminado correctamente desde Firestore");
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
  }
};

export const eliminarProductos = async () => {
  try {
      // Obtener todos los documentos de la colección "productos"
      const querySnapshot = await getDocs(collection(db, 'order'));

      // Iterar sobre los documentos y eliminar cada uno
      querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
      });

      console.log('Colección "productos" eliminada correctamente');
  } catch (error) {
      console.error('Error al eliminar la colección "productos":', error);
  }
};

export const agregarProducto = async (producto) => {
  try {
    await addDoc(collection(db, 'order'), producto);
    console.log('Producto almacenado correctamente en la colección "order"');
  } catch (error) {
    console.error('Error al almacenar el producto:', error);
  }
};

export const agregarPedido = async (pedido) => {
  try {
    await addDoc(collection(db, 'pedidos'), pedido);
    console.log('Pedido almacenado correctamente en la colección "pedidos"');
  } catch (error) {
    console.error('Error al almacenar el pedido:', error);
  }
};

export const getProduct = async () => {
  const querySnapshot = await getDocs(collection(db, 'productos'));
  return querySnapshot;
};

export { db, auth }
