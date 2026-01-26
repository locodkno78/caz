import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA9c3gBAo_ENpxC-reRiebauJXivjhP8D8",
  authDomain: "base-de-datos-4c1cd.firebaseapp.com",
  projectId: "base-de-datos-4c1cd",
  storageBucket: "base-de-datos-4c1cd.appspot.com",
  messagingSenderId: "452851254594",
  appId: "1:452851254594:web:fda7e2f51a253e651134db",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const getProduct = async () => {
  const querySnapshot = await getDocs(collection(db, "productos"));
  return querySnapshot;
};

export { db, auth };
