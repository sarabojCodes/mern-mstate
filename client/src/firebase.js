// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "task-project-d71c2.firebaseapp.com",
  projectId: "task-project-d71c2",
  storageBucket: "task-project-d71c2.appspot.com",
  messagingSenderId: "231474975901",
  appId: "1:231474975901:web:4f29c6b2cad21f07d13074",
  measurementId: "G-J4C4Q7NSSW"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
 