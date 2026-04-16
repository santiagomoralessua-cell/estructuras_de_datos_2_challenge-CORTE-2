/*------------------------------------------------------------*/
//                    config de firebase
/*------------------------------------------------------------*/

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// los datos firebase
const firebaseConfig = {
    apiKey: "AIzaSyBQ006jG1GYFpt9mLgjP1t9YY9xsY_rGuU",
    authDomain: "parcial-2-5bf62.firebaseapp.com",
    projectId: "parcial-2-5bf62",
    storageBucket: "parcial-2-5bf62.firebasestorage.app",
    messagingSenderId: "617267164002",
    appId: "1:617267164002:web:1c7c0a1e97d3f22e5b723b"
};

// arranco firebase
const app = initializeApp(firebaseConfig);

// esto para el login
export const auth = getAuth(app);

// esto para guardar el árbol en la bd
export const db = getFirestore(app);