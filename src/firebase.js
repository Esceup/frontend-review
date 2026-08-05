import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiKoYLM9_VOiS45UqpOXjm2_HUIgQ-qNs",
  authDomain: "frontend-review-eecf3.firebaseapp.com",
  projectId: "frontend-review-eecf3",
  storageBucket: "frontend-review-eecf3.firebasestorage.app",
  messagingSenderId: "142885299058",
  appId: "1:142885299058:web:fb528e5996b40a88abf3eb",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


// Экспортируем функции для использования в компонентах
export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const logOut = () => signOut(auth);
