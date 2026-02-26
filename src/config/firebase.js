import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCI932UuBLXGfimu2f1IBpEhRT5eR3kM8s",
  authDomain: "siddhant-it-services.firebaseapp.com",
  projectId: "siddhant-it-services",
  storageBucket: "siddhant-it-services.firebasestorage.app",
  messagingSenderId: "625298048884",
  appId: "1:625298048884:web:abcff7ce94d4e18bb9ce21",
  measurementId: "G-VKVC3PVDK9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
