// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBxXgF_Skv7lzjZ6GP2rHy9ocDokfegX20",
  authDomain: "expense-tracker-v2-4ea08.firebaseapp.com",
  projectId: "expense-tracker-v2-4ea08",
  storageBucket: "expense-tracker-v2-4ea08.appspot.com",
  messagingSenderId: "360735084981",
  appId: "1:360735084981:web:1b8bb6f1d833ea3edfc9fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

