import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
/**
 * Para la aplicación, se utilizó una BD creada con Firebase, debido a que se decidió
 * usar los servicios de google para lograr realizar procesos como el registro de
 * correo de los usuarios, contraseñas, recuperación de contraseña, al igual que tener
 * la posibilidad de iniciar sesión por medio de una cuenta google.
 * 
 * En la parte inferior, se muestra como se realiza el proceso de conexión con la
 * BD levantada en Firebase
 */
const firebaseConfig = {
  apiKey: "AIzaSyBZq76UZIrjhA1z6OGZuwxqyTOxW3jbk1Y",
  authDomain: "dpica-app.firebaseapp.com",
  projectId: "dpica-app",
  storageBucket: "dpica-app.appspot.com",
  messagingSenderId: "441096894984",
  appId: "1:441096894984:web:bbff5320090380cb8f6fbd",
  measurementId: "G-PL32BPCTG9"
};

/**
 * 
 * Aquí se definen los respectivod métodos utilizando firebase, con el fin de iniciar
 * la app en el modo local, al igual que establecer una conexión con la firestore
 */

const gettingApp = () => {
  return initializeApp(firebaseConfig);
}

const instanceOfAuth = (app:any) => {
  return getAuth(app);
}

const instanceOfFireStore = (app:any) => {
  return getFirestore(app);
}

export const app = gettingApp();
export const auth = instanceOfAuth(app);
export const db = instanceOfFireStore(app);
