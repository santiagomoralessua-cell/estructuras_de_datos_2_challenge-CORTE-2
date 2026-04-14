// Configuracion de Firebase - hay que poner los datos del proyecto propio
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAUY4tpCd9jyeTEQaA_vBPW_wS2dm-4vj4",
  authDomain: "challenge07-835ae.firebaseapp.com",
  projectId: "challenge07-835ae",
  storageBucket: "challenge07-835ae.firebasestorage.app",
  messagingSenderId: "205035745181",
  appId: "1:205035745181:web:71007fd3d88d82845ac974"
}

// Iniciamos firebase
const app = initializeApp(firebaseConfig)

// Exportamos auth y db para usarlos en otros archivos
export const auth = getAuth(app)
export const db = getFirestore(app)
