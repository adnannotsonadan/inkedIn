// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Storage removed for now — requires Blaze billing plan
// Re-add when ready: import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi0bSMRwxesrv-scY_wESB0wKqeZuZ8QA",
  authDomain: "inkedin-9bf43.firebaseapp.com",
  projectId: "inkedin-9bf43",
  storageBucket: "inkedin-9bf43.firebasestorage.app",
  messagingSenderId: "1029428869741",
  appId: "1:1029428869741:web:1119ebfd0cf12a14b5dd64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
export const auth = getAuth(app);
export const db   = getFirestore(app);
// export const storage = getStorage(app); // uncomment when on Blaze plan